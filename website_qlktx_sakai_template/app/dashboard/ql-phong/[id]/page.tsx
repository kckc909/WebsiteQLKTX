"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { tb_phong, tb_sinh_vien } from "@custom";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { api_tb_phong_getById } from "app/api/dashboard/api_tb_phong";
import { InputText } from "primereact/inputtext";
import { api_tb_trong_phong_adds, api_tb_trong_phong_delete } from "app/api/dashboard/api_tb_trong_phong";
import { api_tb_sinh_vien_getByIdPhong, api_tb_sinh_vien_search } from "app/api/dashboard/api_tb_sinh_vien";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

export default function _phongDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    let searchTimeout: NodeJS.Timeout;

    const [phong, set_phong] = useState<tb_phong | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<tb_sinh_vien | null>(null);
    const [students, setStudents] = useState<tb_sinh_vien[]>([]);
    const [notFound, setNotFound] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]); // để tìm kiếm sinh viên
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<tb_sinh_vien[]>([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => { // -> lấy thông tin phòng + danh sách sinh viên
        const fetchInfo = async () => {
            if (!id) {
                setNotFound(true);
                return;
            }
            const id_tb_phong = Number(id);
            if (isNaN(id_tb_phong)) {
                setNotFound(true);
                return;
            }

            const _phongFound = await api_tb_phong_getById(id_tb_phong);
            const phong = _phongFound[0];

            if (!phong) {
                setNotFound(true);
                return;
            }

            set_phong(phong);

            const _students = await api_tb_sinh_vien_getByIdPhong(phong.id_tb_phong);
            setStudents(_students);
        }

        fetchInfo();
    }, [id]);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSearchResults([]);
            return;
        }

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            try {
                const results: tb_sinh_vien[] = await api_tb_sinh_vien_search(searchTerm);
                const studentFounds = results.filter((s: tb_sinh_vien) => !students.some((st) => st.id_tb_nguoi_dung === s.id_tb_nguoi_dung));
                setSearchResults(studentFounds);
            } catch (err) {
                console.error("Lỗi tìm kiếm sinh viên:", err);
            }
        }, 15);

        return () => clearTimeout(searchTimeout);
    }, [searchTerm]);

    // func 
    const toggleSelectStudent = (event: CheckboxChangeEvent, studentId: number) => {
        setSelectedStudentIds((prev) =>
            event.target.checked ? [...prev, studentId] : prev.filter((id) => id !== studentId)
        );
    };

    const handleAddSelectedStudents = async () => {
        if (!phong || selectedStudentIds.length === 0) return;

        // Lọc ra những sinh viên chưa có trong danh sách students
        const newStudentIds = selectedStudentIds.filter(
            (id) => !students.some((s) => s.id_tb_nguoi_dung === id)
        );

        if (newStudentIds.length > phong.kich_thuoc_toi_da - phong.so_luong) {
            alert(`Chỉ có thể thêm tối đa ${phong.kich_thuoc_toi_da - phong.so_luong} sinh viên.`);
            return;
        }

        if (newStudentIds.length === 0) {
            alert("Tất cả sinh viên vừa chọn đã có trong phòng.");
            return;
        }

        try {
            await api_tb_trong_phong_adds(
                newStudentIds.map((id) => ({
                    id_tb_phong: phong.id_tb_phong,
                    id_tb_nguoi_dung: id,
                    ghi_chu: "",
                }))
            );

            const phongUpdated = { ...phong, so_luong: phong.so_luong + newStudentIds.length };
            set_phong(phongUpdated);

            const addedStudents = searchResults.filter((s) => newStudentIds.includes(s.id_tb_nguoi_dung));
            setStudents([...students, ...addedStudents]);

            if (addedStudents.length > 1) {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Thêm thành công',
                    detail: (
                        <>
                            `Đã thêm <b>{addedStudents.length}</b> sinh viên vào phòng <b>{phong.ten_phong}</b>`
                        </>
                    ),
                    life: 3000
                });
            }
            else {
                toast.current?.show({
                    severity: "success",
                    summary: 'Thêm thành công',
                    detail: (<>
                        Đã thêm <b>{addedStudents[0].ho_ten}</b> vào phòng <b>{phong.ten_phong}!</b>
                    </>),
                    life: 3000
                });
            }

            setSelectedStudentIds([]);
        } catch (err) {
            console.error("Lỗi thêm sinh viên:", err);
            toast.current?.show({
                severity: "error",
                summary: 'Lỗi',
                detail: 'Không thể thêm sinh viên vào phòng. Vui lòng thử lại!',
                life: 3000
            });
        }
    };

    const routeGoToStudentDetail = (studentId: number) => {
        router.push(`/dashboard/ql-sinh-vien/${studentId}`);
    }

    const openDialogDeleteStudent = (student: tb_sinh_vien) => {
        setDialogVisible(true);
        setSelectedStudent(student);
    }

    const closeDialogDeleteStudent = () => {
        setDialogVisible(false);
        setSelectedStudent(null);
    }

    const handleDeleteTrongPhong = async () => {
        if (!phong || !selectedStudent) return;

        try {
            await api_tb_trong_phong_delete(phong.id_tb_phong, selectedStudent.id_tb_nguoi_dung);

            const updatedStudents = students.filter(sv => sv.id_tb_nguoi_dung !== selectedStudent.id_tb_nguoi_dung);
            setStudents(updatedStudents);

            const updatedPhong = { ...phong, so_luong: phong.so_luong - 1 };
            set_phong(updatedPhong);

            toast.current?.show({
                severity: 'success',
                summary: 'Xóa thành công',
                detail: (
                    <>
                        Đã xóa <b>{selectedStudent.ho_ten}</b> khỏi phòng <b>{phong.ten_phong}</b>
                    </>
                ),
                life: 30000
            });

        } catch (error) {
            console.error("Lỗi khi xóa sinh viên khỏi phòng:", error);
            toast.current?.show({
                severity: "error",
                summary: 'Lỗi',
                detail: 'Không thể xóa sinh viên khỏi phòng. Vui lòng thử lại!',
                life: 3000
            });
        }

        closeDialogDeleteStudent();
    };

    // component 
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="text-xl">Danh sách sinh viên</h2>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    if (notFound) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Không tìm thấy phòng</h1>
                <p>Phòng có ID <strong>{id}</strong> không tồn tại trong hệ thống.</p>
                <Button label="Quay lại trang quản lý phòng!" icon="pi pi-arrow-left" onClick={() => router.push("/dashboard/ql-phong")} />
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast} />
            <div className="flex gap-6">
                <Card className="w-1/2" title={`Thông tin phòng ${phong?.ten_phong}`}>
                    <p><strong>Mã phòng:</strong> {phong?.id_tb_phong}</p>
                    <p><strong>Số lượng:</strong> {phong?.so_luong} / {phong?.kich_thuoc_toi_da}</p>
                    <p><strong>Trạng thái:</strong> {phong?.trang_thai == '0' ? "Còn trống" : "Hết chỗ"}</p>
                </Card>

                <div className="w-1/2">
                    <h2 className="text-lg font-bold mb-2">Thêm sinh viên vào phòng</h2>

                    <InputText
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Nhập tên hoặc mã sinh viên..."
                        className="w-full mb-2"
                    />

                    {searchResults.length > 0 && (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2"></th>
                                    <th className="border p-2">Mã SV</th>
                                    <th className="border p-2">Họ tên</th>
                                    <th className="border p-2">Số điện thoại</th>
                                    <th className="border p-2">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((student) => (
                                    <tr key={student.id_tb_nguoi_dung} className="hover:bg-gray-50">
                                        <td className="border p-2 text-center">
                                            <Checkbox
                                                checked={selectedStudentIds.includes(student.id_tb_nguoi_dung)}
                                                onChange={(e) => toggleSelectStudent(e, student.id_tb_nguoi_dung)}
                                            />
                                        </td>
                                        <td className="border p-2">{student.ma_sinh_vien}</td>
                                        <td className="border p-2">{student.ho_ten}</td>
                                        <td className="border p-2">{student.sdt}</td>
                                        <td className="border p-2">
                                            <Button
                                                label="Info"
                                                icon="pi pi-info-circle"
                                                className="p-button-info p-button-sm"
                                                onClick={() => routeGoToStudentDetail(student.id_tb_nguoi_dung)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="mt-4">
                        <Button
                            label="Thêm sinh viên vào phòng"
                            icon="pi pi-plus"
                            className="p-button-success w-full"
                            onClick={handleAddSelectedStudents}
                            disabled={selectedStudentIds.length === 0}
                        />
                    </div>
                </div>
            </div>

            <DataTable value={students} emptyMessage="Không có sinh viên nào trong phòng này." header={header}
                className="mt-3 border-1 border-black-200"
                globalFilter={globalFilter}
            >
                <Column field="ma_sinh_vien" header="Mã SV" />
                <Column field="ho_ten" header="Họ tên" />
                <Column field="ngay_sinh" header="Ngày sinh"
                    body={(rowData) => new Date(rowData.ngay_sinh).toLocaleDateString()}
                />
                <Column field="email" header="Email" />
                <Column field="sdt" header="Số điện thoại" />
                <Column
                    header="Hành động"
                    body={(rowData) => (
                        <>
                            <Button icon="pi pi-info" className="p-button-rounded p-button-primary mr-2"
                                onClick={() => routeGoToStudentDetail(rowData.id_tb_nguoi_dung)} />
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                                onClick={() => openDialogDeleteStudent(rowData)} />
                        </>
                    )}
                />
            </DataTable>

            <Dialog visible={dialogVisible} header="Xác nhận" modal footer={<Button label="Xóa" icon="pi pi-check" onClick={handleDeleteTrongPhong} />} onHide={() => closeDialogDeleteStudent()}>
                <span>Bạn có chắc chắn muốn xóa  sinh viên <strong>{selectedStudent?.ho_ten} khỏi phòng không ?</strong></span>
                <div>
                    <p><strong>Mã SV:</strong> {selectedStudent?.ma_sinh_vien}</p>
                    <p><strong>Email:</strong> {selectedStudent?.email}</p>
                    <p><strong>Số điện thoại:</strong> {selectedStudent?.sdt}</p>
                </div>
            </Dialog>

            <Button label="Quay lại" icon="pi pi-arrow-left" onClick={() => router.push("/dashboard/ql-phong")} className="mt-3" />
        </div>
    );
}
