'use client';

import { Card } from "primereact/card";

export default function C_HuongDan() {
    return (
        <>
            <div className="flex gap-3">
                {/* Thông tin yêu cầu */}
                <Card className="w-1/2 m-3 mr-0">
                    <h3 className="text-center mb-4" style={{ marginTop: "0px", textAlign: "center" }}>
                        <b>
                            {"THÔNG TIN VỚI SINH VIÊN ĐĂNG KÝ"}
                        </b>
                    </h3>
                    <h4 >
                        <span>Để đảm bảo thời gian đăng ký ở Ký túc xá trực tuyến, sinh viên chuẩn bị đầy đủ file hình sau:</span></h4>
                    <div className="clearfix">
                        <ul className="list-unstyled spaced">
                            <li>
                                * Thẻ căn cước công dân/mã số định danh cá nhân;</li>
                            <li>
                                * Thẻ Bảo hiểm Y tế;</li>
                            <li>
                                * Giấy tờ minh chứng sinh viên:</li>
                            <li>
                                <p>
                                    <strong>&nbsp; 1. Đối với Tân sinh viên: </strong>Làm thủ tục nhập học ở trường trước khi đăng ký ở Ký túc xá (<a href="/">Xem thêm tại đây</a>)</p>
                                <p>
                                    &nbsp; &nbsp; &nbsp; - Sinh`` viên các trường thuộc ĐHSPKTHY: Thẻ sinh viên/Giấy biên nhận hồ sơ nhập học/Giấy xác nhận đã nhập học.</p>
                                <p>
                                    &nbsp; &nbsp; &nbsp; - Sinh viên các trường ngoài ĐHSPKTHY: Giấy xác nhận <em>có đóng dấu </em>của nhà trường.</p>
                                <p>
                                    <span style={{ color: "red" }}><strong>&nbsp; 2. Đối với sinh viên năm 2 trở lên </strong></span>(<a href="/">Xem thêm tại đây</a>)</p>
                                <p>
                                    &nbsp; &nbsp; &nbsp; - Sinh viên các trường thuộc ĐHSPKTHY: Thẻ sinh viên/Giấy xác nhận sinh viên/Thời khoá biểu học tập.</p>
                                <p>
                                    &nbsp; &nbsp; &nbsp; - Sinh viên các trường ngoài ĐHSPKTHY: Giấy xác nhận <em>có đóng dấu </em>của nhà trường.</p>
                            </li>
                            <li>
                                <p>
                                    * Hình ảnh chân dung</p>
                                <p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - <em><u>Lưu ý:</u></em></p>
                                <ul>
                                    <li>
                                        <strong>Ảnh mới chụp:</strong>&nbsp;không quá 6 tháng.</li>
                                    <li>
                                        <strong>Tỉ lệ ảnh:</strong>&nbsp;4 x 6.</li>
                                    <li>
                                        <strong>Tỉ lệ diện tích khuôn mặt:</strong>&nbsp;chiếm khoảng 75% diện tích ảnh.</li>
                                    <li>
                                        <strong>Chiều cao từ mắt lên mép trên của ảnh:</strong>&nbsp;xấp xỉ 2/3 chiều cao từ mắt xuống mép dưới của ảnh.</li>
                                    <li>
                                        <strong>Góc chụp:</strong>&nbsp;Mặt nhìn thẳng.</li>
                                    <li>
                                        <strong>Trang phục:</strong>&nbsp;Đầu để trần, không đeo kính, trang phục gọn gàng lịch sự.</li>
                                    <li>
                                        <strong>Phông nền:</strong>&nbsp;màu trắng hoặc màu xanh.</li>
                                    <li>
                                        <strong>Định dạng file:</strong>&nbsp;.jpeg, .png (File ảnh từ điện thoại hoặc từ các thiết bị chụp ảnh kĩ thuật số, <strong>Không</strong> được chụp lại ảnh thẻ 3x4 hoặc 4x6)</li>
                                    <li>
                                        <strong>Ảnh gốc:</strong>&nbsp;Ảnh được chụp từ điện thoại, không qua các ứng dụng chỉnh sửa ảnh.</li>
                                    <li>
                                        Vì ảnh sẽ được sử dụng cho <em>công tác</em> <em>in thẻ</em> và <em>hệ thống nhận diện khuôn mặt (FaceId)</em> tại ký túc xá. Sinh viên sẽ phải hoàn toàn <strong>chịu trách nhiệm</strong> về việc đăng tải hình ảnh chân dung nếu có sai sót xảy ra.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <h4 >
                        <span>Sinh viên tìm hiểu kỹ thông tin sau:</span></h4>
                    <div className="clearfix">
                        <ul className="list-unstyled spaced">
                            <li>
                                - Thời gian thực hiện đăng ký tối đa <strong>20 phút</strong>;</li>
                            <li>
                                - Thời gian trả kết quả trong vòng <strong>36 giờ</strong> tính từ khi đăng ký thành công.</li>
                        </ul>
                    </div>
                    <h4 >
                        <span>Vui lòng đọc kỹ thông tin sau:</span></h4>
                    <div className="clearfix">
                        <ul className="list-unstyled spaced">
                            <li>
                                1. Danh sách các trường đã ký thoả thuận với Ký túc xá năm học 2024 – 2025.<br />
                                <br />
                                2. Thời gian ở KTX:<br />
                                <br />
                                - Thời gian bắt đầu: 01/9/2024.<br />
                                <br />
                                - Thời gian kết thúc: Sinh viên lựa chọn một trong ba mốc thời gian sau theo kế hoạch học tập của cá nhân:<br />
                                <br />
                                + Ngày 30/6/2025;<br />
                                <br />
                                + Ngày 31/7/2025;<br />
                                <br />
                                + Ngày 31/8/2025 (không dành cho sinh viên năm thứ 4 trở lên).<br />
                                <br />
                                3. Sinh viên đăng ký ở một học kỳ (từ ngày 01/9/2024 đến 31/01/2025): Trung tâm chỉ xem xét các trường hợp sau:<br />
                                <br />
                                - Sinh viên có nhu cầu ở cả năm học 2024 - 2025 nhưng chỉ đóng tiền từng học kỳ: Sinh viên có hoàn cảnh khó khăn: Nộp đơn, sổ hộ nghèo/giấy xác nhận gia đình có hoàn cảnh khó khăn (còn thời hạn) hoặc trình bày rõ lý do; các trường hợp đặc biệt khác TTQL KTX&amp;ĐTĐH căn cứ lý do cụ thể để hỗ trợ sinh viên. Sinh viên sắp xếp ở tại phòng cũ, nhà cũ (trong trường hợp thuộc diện chuyển phòng thì tuân thủ theo sự sắp xếp của Ban Quản lý cụm nhà).<br />
                                <br />
                                - Sinh viên sắp tốt nghiệp: Nộp đơn và minh chứng (thời khoá biểu, lịch học) cho Ban Quản lý cụm nhà. Sinh viên được sắp xếp ở tại nhà E4, KTX Khu B.<br />
                                <br />
                                - Các trường hợp đặc biệt khác: TTQL KTX&amp;ĐTĐH căn cứ lý do cụ thể để xem xét, giải quyết.<br />
                                <br />
                                4. Những sinh viên thuộc diện phải làm <b>đơn đăng ký</b> có xác nhận của nhà trường hoặc bản cam kết đối với sinh viên vi phạm nội quy, quy định của Ký túc xá năm học 2023 – 2024 trở về trước, hoàn tất thủ tục theo thông báo trước khi đăng ký.<br />
                                <br />
                                5. Sau khi hoàn tất đăng ký, trong vòng 36 giờ, hệ thống sẽ gửi thông báo qua email của sinh viên. Sinh viên đăng nhập vào email đã đăng ký hoặc tài khoản cá nhân trên trang web để thực hiện thanh toán online theo hướng dẫn.<br />
                                <br />
                                5.1. Trường hợp ĐƯỢC duyệt: sinh viên thực hiện thanh toán theo hướng dẫn và trong thời gian 5 ngày kể từ khi được duyệt.<br />
                                <br />
                                5.2. Trường hợp KHÔNG được duyệt: sinh viên liên hệ Hành chính toà nhà và thực hiện theo hướng dẫn.<br />
                                <br />
                                Tổng đài hỗ trợ: 1900.055.559<br />
                                <br />
                                1. Phòng Công tác sinh viên: 105</li>
                            <li>
                                &nbsp;</li>
                            <li>
                                2. Phòng Công nghệ thông tin - Dữ liệu: 114, 115<br />
                                <br />
                                3. Phòng Kế hoạch tài chính: 112<br />
                                <br />
                                4. Ban quản lý các cụm nhà: AF: 120, AG: 121, AH: 122, BA: 123, BB: 124, BC: 125, BD: 126, BE: 127<br />
                                <br />
                                <br />
                                &nbsp;
                            </li>
                        </ul>
                    </div>
                </Card>
                {/* Khoản thu & mức thu */}
                <Card className="w-1/2 m-3 ml-0" style={{ overflowY: "auto" }}>
                    <h3 className="blue text-center mb-4" style={{ marginTop: "0px", textAlign: "center" }}>
                        <strong>CÁC KHOẢN THU VÀ MỨC THU</strong>
                    </h3>
                    <h5 className="text-center" style={{ textAlign: "center" }}>
                        (Ban hành kèm theo Thông báo số 652/TB-TTQLKTX ngày 16 tháng 8 năm 2024 của Trung tâm Quản lý Ký túc xá)
                    </h5>
                    <div className="table-responsive clearfix">
                        <p>&nbsp;</p>
                        <div style={{ marginLeft: "5px" }}>
                            <strong>1. Tiền hồ sơ</strong>: 60.000 đồng/sinh viên.
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                            <strong>2. Tiền thế chân tài sản-cơ sở vật chất (TCTS-CSVC)</strong>: 100.000 đồng/sinh viên. Sinh viên nhận lại tiền TCTS-CSVC đã đóng khi rời khỏi KTX.
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                            <strong>3. Bảo hiểm y tế</strong>: 1.105.650 đồng/sinh viên/15 tháng (dành cho tân sinh viên đóng BHYT tại KTX); 884.520 đồng/sinh viên/12 tháng (dành cho tân sinh viên Trường Đại học Công nghệ Thông tin).
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                            <strong>4. Bảo hiểm tai nạn</strong>: 30.000 đồng/sinh viên/12 tháng.
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                            <strong>5. Mức giá lệ phí phòng ở</strong>: căn cứ Công văn số 1593/ĐHSPKT của ĐHSPKTHY về “Quy định mức giá lệ phí phòng ở KTX từ năm học 2022-2023 đến năm học 2025-2026 và đơn giá dịch vụ”, Trung tâm thu lệ phí phòng ở và đơn giá dịch vụ tăng thêm như sau:
                        </div>
                        <p>(Đơn giá tính: đồng)</p>
                        <p style={{ marginLeft: "14.2pt" }}>
                            + Đơn giá từ 01/8/2024-31/8/2024 và đơn giá từ 01/9/2024-31/8/2025
                        </p>
                        <p>&nbsp;</p>
                        <div style={{ float: "right" }}>
                            &nbsp;
                        </div>
                        <figure className="table" style={{ width: "688pt" }}>
                            <table border={0} cellPadding={0} cellSpacing={0} className="ck-table-resized" style={{ borderCollapse: "collapse" }} width={913}>
                                <colgroup>
                                    <col style={{ width: "4.65%" }} width={42} />
                                    <col style={{ width: "22.97%" }} width={211} />
                                    <col style={{ width: "12.06%" }} width={110} />
                                    <col style={{ width: "12.06%" }} />
                                    <col style={{ width: "12.06%" }} />
                                    <col style={{ width: "12.06%" }} />
                                    <col style={{ width: "12.06%" }} />
                                    <col style={{ width: "12.08%" }} />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td rowSpan={2}><b>TT</b></td>
                                        <td rowSpan={2}><b>Loại phòng</b></td>
                                        <td colSpan={3}><b>Từ 01/8/2024-31/8/2024</b></td>
                                        <td colSpan={3}><b>Từ 01/9/2024-31/8/2025</b></td>
                                    </tr>
                                    <tr>
                                        <td>Phòng ở</td>
                                        <td>Dịch vụ</td>
                                        <td>Tổng</td>
                                        <td>Phòng ở</td>
                                        <td>Dịch vụ</td>
                                        <td>Tổng</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Phòng 8 SV</td>
                                        <td>180.000</td>
                                        <td>-</td>
                                        <td>180.000</td>
                                        <td>205.000</td>
                                        <td>-</td>
                                        <td>205.000</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Phòng 6 SV</td>
                                        <td>240.000</td>
                                        <td>-</td>
                                        <td>240.000</td>
                                        <td>275.000</td>
                                        <td>-</td>
                                        <td>275.000</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>DV 4 SV</td>
                                        <td>650.000</td>
                                        <td>-</td>
                                        <td>650.000</td>
                                        <td>800.000</td>
                                        <td>-</td>
                                        <td>800.000</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>DV 4 SV (máy lạnh, rèm)</td>
                                        <td>650.000</td>
                                        <td>240.000</td>
                                        <td>890.000</td>
                                        <td>800.000</td>
                                        <td>240.000</td>
                                        <td>1.040.000</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>DV 4 SV (máy lạnh, rèm, tủ lạnh, máy giặt)</td>
                                        <td>650.000</td>
                                        <td>370.000</td>
                                        <td>1.020.000</td>
                                        <td>800.000</td>
                                        <td>370.000</td>
                                        <td>1.170.000</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>DV 4 SV (máy lạnh, rèm, tủ lạnh, máy giặt, máy nước nóng, kệ dép)</td>
                                        <td>650.000</td>
                                        <td>420.000</td>
                                        <td>1.070.000</td>
                                        <td>800.000</td>
                                        <td>420.000</td>
                                        <td>1.220.000</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>DV 2 SV (máy lạnh, rèm)</td>
                                        <td>1.250.000</td>
                                        <td>420.000</td>
                                        <td>1.670.000</td>
                                        <td>1.575.000</td>
                                        <td>420.000</td>
                                        <td>1.995.000</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>DV 2 SV (máy lạnh, rèm, tủ lạnh, máy giặt)</td>
                                        <td>1.250.000</td>
                                        <td>680.000</td>
                                        <td>1.930.000</td>
                                        <td>1.575.000</td>
                                        <td>680.000</td>
                                        <td>2.255.000</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>DV 2 SV (máy lạnh, rèm, tủ lạnh, máy giặt, máy nước nóng, kệ dép, nệm, tủ, bàn, ghế)</td>
                                        <td>1.250.000</td>
                                        <td>1.240.000</td>
                                        <td>2.490.000</td>
                                        <td>1.575.000</td>
                                        <td>1.240.000</td>
                                        <td>2.815.000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </figure>
                        <p>&nbsp;</p>
                        <div style={{ marginTop: "0px" }}>
                            <i><strong>Ghi chú:</strong></i>
                        </div>
                        <ul>
                            <li>
                                <p>
                                    Đơn giá các phòng có dịch vụ tăng thêm (trang thiết bị tăng thêm) = đơn giá lệ phí phòng ở + đơn giá dịch vụ tăng thêm (trang thiết bị tăng thêm).
                                </p>
                            </li>
                            <li>
                                <p>
                                    Mức giá cho các loại phòng trên chưa bao gồm tiền sử dụng điện, nước và các dịch vụ khác.
                                </p>
                            </li>
                            <li>
                                <p>
                                    TTQLKTX thu tiền từng trang thiết bị tăng thêm theo thời gian hoàn thành lắp đặt. Đối với các trang thiết bị có sẵn sẽ thu cùng đợt sinh viên đăng ký; các trang thiết bị chưa lắp đặt còn lại theo loại phòng sẽ tính tiền từ ngày bàn giao cho sinh viên sử dụng và thu tiền sau khi hoàn thành lắp đặt xong tất cả các thiết bị tăng thêm còn lại cho sinh viên. Trường hợp sinh viên chuyển ra KTX nhưng các trang thiết bị tăng thêm vẫn chưa lắp đặt xong thì TTQLKTX sẽ chốt công nợ theo từng trang thiết bị hiện có.
                                </p>
                            </li>
                            <li>
                                <p style={{ lineHeight: "107%", marginBottom: "8pt", marginRight: "0mm", marginTop: "0mm" }}>
                                    Sinh viên có nhu cầu đăng ký loại phòng có trang thiết bị lắp đặt thêm vui lòng liên hệ Ban Quản lý cụm nhà để được hỗ trợ.
                                </p>
                            </li>
                        </ul>
                        <p style={{ lineHeight: "107%", marginBottom: "8pt", marginRight: "0mm", marginTop: "0mm" }}>
                            <strong>6. Phòng dịch vụ chờ lắp đặt trang thiết bị tăng thêm</strong>
                        </p>
                        <ul>
                            <li>
                                Năm học 2024-2025, Trung tâm tiếp tục lắp đặt các trang thiết bị tăng thêm cho các phòng dịch vụ 2 sinh viên và phòng dịch vụ 4 sinh viên (dạng chờ) để đáp ứng nhu cầu sinh viên. Các loại phòng (chờ) này sẽ được hiển thị trên phần mềm để sinh viên lựa chọn khi đăng ký. Sinh viên tìm hiểu kỹ thông tin và loại phòng trước khi đăng ký.
                            </li>
                            <li>
                                Danh mục các trang thiết bị đang chờ lắp đặt cụ thể:
                            </li>
                        </ul>
                        <p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + Phòng dịch vụ 2 sinh viên có máy lạnh, rèm, kệ dép, nệm, tủ, bàn, ghế (tủ, bàn, ghế thiết kế riêng) <em>(chờ có tủ lạnh, máy giặt, máy nước nóng);</em>
                        </p>
                        <p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + Phòng dịch vụ 4 sinh viên có máy lạnh, rèm, kệ dép<em> (chờ có tủ lạnh, máy giặt, máy nước nóng)</em>;
                        </p>
                        <p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + Phòng dịch vụ 4 sinh viên có máy lạnh, rèm <em>(chờ có tủ lạnh, máy giặt);</em>
                        </p>
                        <p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + Phòng dịch vụ 4 sinh viên <em>(chờ có máy lạnh, rèm).</em>
                        </p>
                        <p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + Phòng dịch vụ 4 sinh viên <em>(chờ có máy lạnh, rèm, tủ lạnh, máy giặt, máy nước nóng, kệ dép). </em>Năm học 2024-2025 Trung tâm lắp đặt thiết bị tủ lạnh, máy giặt (chờ) tại tòa nhà A19. Sinh viên có nhu cầu đăng ký sẽ đóng thêm phí sau khi hoàn thành lắp đặt.
                        </p>
                        <ul>
                            <li>
                                Trung tâm sẽ lắp đặt các trang thiết bị chờ theo loại phòng sinh viên đăng ký, thời gian dự kiến hoàn thành chậm nhất trước ngày 31/12/2024 (tùy vào loại thiết bị, nếu có sự thay đổi Ban Quản lý cụm nhà sẽ thông tin đến sinh viên).
                            </li>
                            <li>
                                Trung tâm thu tiền từng trang thiết bị tăng thêm theo thời gian hoàn thành lắp đặt. Đối với các trang thiết bị có sẵn sẽ thu cùng đợt sinh viên đăng ký; các trang thiết bị chưa lắp đặt còn lại theo loại phòng sẽ tính tiền từ ngày bàn giao cho sinh viên sử dụng và thu tiền sau khi hoàn thành lắp đặt xong tất cả các thiết bị tăng thêm còn lại cho sinh viên.
                            </li>
                            <li>
                                Trường hợp sinh viên chuyển ra KTX nhưng các trang thiết bị tăng thêm vẫn chưa lắp đặt xong thì Trung tâm sẽ chốt công nợ theo từng trang thiết bị hiện có.
                            </li>
                        </ul>
                    </div>
                </Card>

            </div>
            {/* Hướng dẫn thực hiện quy trình  */}
        </>
    );
}