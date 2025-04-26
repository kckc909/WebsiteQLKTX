import db from '../common/db.js';

class Model_tb_dang_ky_phong {
    constructor() {
        this.tb_name = 'tb_dang_ky_phong';
    }

    getAll(callback) {
        db.query(`SELECT * FROM ??`, [this.tb_name], callback);
    }

    getById(id, callback) {
        db.query(`SELECT * FROM ?? WHERE id_tb_dang_ky_phong = ?`, [this.tb_name, id], callback);
    }

    getByStatus(status, callback) {
        db.query(`SELECT * FROM ?? WHERE trang_thai = ?`, [this.tb_name, status], callback);
    }

    insert(obj, callback) {
        db.query(`INSERT INTO ?? SET ?`, [this.tb_name, obj], callback);
    }

    update(obj, callback) {
        const { id_tb_dang_ky_phong, ...data } = obj;
        db.query(`UPDATE ?? SET ? WHERE id_tb_dang_ky_phong = ?`, [this.tb_name, data, id_tb_dang_ky_phong], callback);
    }

    delete(id, callback) {
        db.query(`DELETE FROM ?? WHERE id_tb_dang_ky_phong = ?`, [this.tb_name, id], callback);
    }
 
    deleteMany(ids, callback) {
        db.query(`DELETE FROM ?? WHERE id_tb_dang_ky_phong IN (?)`, [this.tb_name, ids], callback);
    }
}

export default new Model_tb_dang_ky_phong();
