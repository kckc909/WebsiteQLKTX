import fs from 'fs';
import path from 'path';

// Model xử lý upload
class UploadModel {
    async delete(filename) {
        const filePath = path.join(process.cwd(), 'uploads', 'avatar', filename);

        try {
            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);  
                console.log('File deleted successfully!');
                return true;
            } else {
                console.log('File does not exist!');
                return false;
            }
        } catch (err) {
            console.error('Error deleting file:', err);
            throw new Error('Failed to delete file');
        }
    }
}

export default new UploadModel();
