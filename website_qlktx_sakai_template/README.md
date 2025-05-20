Giai đoạn 1 (ưu tiên cao):
    Đăng ký phòng ở
    Quản lý điện nước
    Quản lý hóa đơn
    Điều chỉnh quản lý phòng & sinh viên    
Giai đoạn 2 (ưu tiên trung bình):
    Quản lý nhân viên
    Quản lý giá phòng
    Quản lý giá điện nước

# ghi chú
    - tb_dang_ky_phong cần nối tham chiếu đến tb_phong  (tạm thời chưa -> test thêm đăng ký phòng)\
    - GỢI Ý MỞ RỘNG -> chọn vào 1 hàng sẽ đánh tích cho hàng đó thay vì phải chọn vào checkbox
    - làm thêm 1 phần lịch mở rộng bên phải màn hình cho phép hiển thị các ngày thông báo phát động thu tự động (phòng, điện nước) và ngày hiện tại -> các ngày sẽ được hiện thị với các màu khác nhau. Lịch này cho phép đổi các ngày thông báo phát động trong tương lai (các ngày đã phát động không đổi được) tại các trang tương ứng (VD : tại trang ghi nhận số điện số nước và trang hóa đơn điện nước sẽ có phép người dùng sửa lịch phát động ghi nhận số điện số nước + sinh hóa đơn điện nước). lịch phát động thu tiền phòng sẽ được hiện thị khi ngày đó nằm trong tháng đang chỉ định (VD : ngày 10/10 thì khi chọn tháng 10 sẽ thấy ngày này hiện lên).

# bug 
    ql-phong : chi tiết phòng hiện tại chỉ thêm được sinh viên -> không thêm được nhân viên vào phòng
    ql-dang-ky-phong : xóa xong chưa reload

# góp ý 
    footer khóa với màn hình ?