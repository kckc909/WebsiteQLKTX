
import db from '../common/db.js'
import tb_nguoi_dung from './tb_nguoi_dung.model.js'

class Model_tb_sinh_vien {
    constructor(tb_name) {
        this.tb_name = tb_name
    }
    getAll(callback) {
        db.query('select * from ??', [this.tb_name], callback);
    }
    getById(id, callback) {
        db.query(`select * from ?? where id_tb_nguoi_dung = ?`, [this.tb_name, id], callback)
    }
    async insert(obj, callback) {
        const connection = await db.promise().getConnection();
        try {
            await connection.beginTransaction();
            if (Array.isArray(obj)) {
                let userInsertPromises = obj.map(value => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const [userResult] = await connection.execute(
                                `INSERT INTO tb_nguoi_dung (ten_tai_khoan, mat_khau, quyen) VALUES (?, ?, ?)`,
                                [value.ma_sinh_vien, value.ma_sinh_vien, "sv"]
                            );
                            resolve(userResult.insertId);
                        } catch (err) {
                            console.error("Error inserting user:", err);
                            reject(err);
                        }
                    });
                });
                const userIds = await Promise.all(userInsertPromises);
                obj.forEach((value, index) => {
                    value.id_tb_nguoi_dung = userIds[index];
                });
                const columns = Object.keys(obj[0]);
                const values = obj.flatMap(value => Object.values(value));
                const sql = `INSERT INTO tb_sinh_vien (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`;
                await connection.execute(sql, values);
            } else {
                const [userResult] = await connection.execute(
                    `INSERT INTO tb_nguoi_dung (ten_tai_khoan, mat_khau, quyen) VALUES (?, ?, ?)`,
                    [obj.ma_sinh_vien, obj.ma_sinh_vien, "sv"]
                );
                obj.id_tb_nguoi_dung = userResult.insertId;
                const columns = Object.keys(obj);
                const values = Object.values(obj);
                const sql = `INSERT INTO tb_sinh_vien (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`;
                await connection.execute(sql, values);
            }
            await connection.commit();
            callback(null, { message: "Thêm thành công", id_tb_nguoi_dung: obj.id_tb_nguoi_dung });
        } catch (error) {
            console.error("Error:", error);
            await connection.rollback();
            callback(error);
        } finally {
            connection.release();
        }
    }
    
    update(obj, callback) {
        const { id_tb_nguoi_dung, ...updateFields } = obj;
        db.query(`update ?? set ? where id_tb_nguoi_dung = ? `, [this.tb_name, updateFields, id_tb_nguoi_dung], callback)
    }

    delete(id, callback) {
        db.query('delete from ?? where id_tb_nguoi_dung = ? ', [this.tb_name, id], callback);
    }

    // custom 
    getSVByIdPhong(id, callback) {
        db.query('select sv.id_tb_nguoi_dung, sv.ho_ten, sv.ma_sinh_vien, sv.email, sv.ngay_sinh, sv.sdt, sv.ghi_chu, sv.gioi_tinh from tb_sinh_vien sv join tb_trong_phong tp on sv.id_tb_nguoi_dung = tp.id_tb_nguoi_dung where tp.id_tb_phong = ?;', [id], callback);
    }

    getSearch(str, callback) {
        str = `%${str.str}%`;
        db.query('select sv.id_tb_nguoi_dung, sv.ho_ten, sv.ma_sinh_vien, sv.sdt, sv.email, sv.gioi_tinh, sv.ngay_sinh, tp.id_tb_phong' +
            ' from tb_sinh_vien sv left join tb_trong_phong tp on sv.id_tb_nguoi_dung = tp.id_tb_nguoi_dung' +
            ' where ho_ten like ? or ma_sinh_vien like ? or email like ? or sdt like ?;', [str, str, str, str], callback);
    }

    checkByMSV(str, callback) {
        db.query('select id_tb_nguoi_dung, ho_ten, ma_sinh_vien, gioi_tinh, sdt, email' +
            ' from tb_sinh_vien' +
            ' where ma_sinh_vien = ?;', [str], callback);
    }
}

export default new Model_tb_sinh_vien('tb_sinh_vien')
