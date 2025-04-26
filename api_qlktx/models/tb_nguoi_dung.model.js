
import db from '../common/db.js'
import _bcrypt from '../node_modules/bcrypt/bcrypt.js'

class Model_tb_nguoi_dung {
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
        if (Array.isArray(obj)) {
            let values = await Promise.all(
                obj.map(async (value) => {
                    if (value.mat_khau) {
                        await _bcrypt.hash(value.mat_khau, 10).then(pass => {
                            value.mat_khau = pass;   
                        })
                    }
                    return Object.values(value);
                })
            );
            let columns = Object.keys(obj[0]);
            let placeholders = values.map(() => `(${columns.map(() => `?`).join(', ')})`).join(', ');
            let sql = `INSERT INTO ?? (${columns.join(', ')}) VALUES ${placeholders}`;
            let params = [this.tb_name, ...values.flat()];
            db.query(sql, params, callback);
        } else {
            if (obj.mat_khau) {
                _bcrypt.hash(obj.mat_khau, 10).then(pass => {
                    obj.mat_khau = pass;
                    db.query(`INSERT INTO ?? SET ?`, [this.tb_name, obj], callback);
                })
            }
        }
    }
    update(obj, callback) {
        const { id_tb_nguoi_dung, ...updateFields } = obj;
        if (updateFields.mat_khau) {
            _bcrypt.hash(obj.mat_khau, 10).then(hashPass => {
                updateFields.mat_khau = hashPass;
                db.query(`update ?? set ? where id_tb_nguoi_dung = ? `, [this.tb_name, updateFields, id_tb_nguoi_dung], callback)
            });
        }
    }
    delete(id, callback) {
        db.query('delete from ?? where id_tb_nguoi_dung = ? ', [this.tb_name, id], callback)
    }
}
export default new Model_tb_nguoi_dung('tb_nguoi_dung')