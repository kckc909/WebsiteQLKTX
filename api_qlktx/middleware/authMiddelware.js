import jwt from 'jsonwebtoken';
import e from 'express';
import dotenv from 'dotenv'

dotenv.config()

var SECRETKEY = process.env.JWT_SECRET_KEY || "1234567890";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer ->token<-

    if (!token) return res.status(401).json({ message: "Không có token, vui lòng đăng nhập" } );

    jwt.verify(token, SECRETKEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Token không hợp lệ" });
        req.user = user;
        next();
    });
}

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.quyen)) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập" });
        }
        next();
    };
};



