import uploadModel from '../models/upload.js';
import path from 'path';
import fs from 'fs';

class UploadController {
    // multer lưu avatar trước khi truyền dữ liệu xuống đây
    post_avtar(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Không có file nào được tải lên!" });
        }
        else {
            console.log('post img');
            console.log(file.filename);
            res.json({ message: "Upload thành công", filename: file.filename });
        }
    }

    async put_avatar(req, res) {
        const file = req.file;
        const { oldAvatar } = req.body;
        try {
            const result = await uploadModel.delete(oldAvatar);
            if (result) {
                return res.json({ message: "Upload thành công, đã thay thế file cũ!", filename: file.filename });
            }
            else {
                return res.json({ message: "Upload thành công, không file nào được xóa!", filename: file.filename });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Có lỗi xảy ra khi xóa file cũ!", error: error.message });
        }
    }
}

export default new UploadController();
