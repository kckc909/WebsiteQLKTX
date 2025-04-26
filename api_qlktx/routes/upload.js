import express from 'express';
import uploadController from '../controllers/upload.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const dir = path.join(process.cwd(), "uploads", "avatar")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(process.cwd(), "uploads", "avatar");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const tempName = Date.now() + path.extname(file.originalname);
        cb(null, tempName);
    }
});

const upload = multer({ storage: storage });

// Route để upload avatar
router.post("/avatar", upload.single("avatar"), uploadController.post_avtar);
router.put("/avatar", upload.single("newAvatar"), uploadController.put_avatar);

export default router;