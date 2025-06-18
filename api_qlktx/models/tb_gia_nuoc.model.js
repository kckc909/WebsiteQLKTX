import db from '../common/db.js'

class Model_tb_gia_nuoc
{
    constructor(tb_name)
    {
        this.tb_name = tb_name
    }
    getAll(callback) {
        db.query('select * from ??', [this.tb_name], callback);
    }
    getById(id, callback)
    {
        db.query(`select * from ?? where id_tb_gia_nuoc = ?`, [this.tb_name, id], callback)
    }
    insert(obj, callback)
    {
        if (Array.isArray(obj)) {
            let values = obj.map(value => Object.values(value));
            let columns = Object.keys(obj[0]);
            let placeholders = values.map(() => `(${columns.map(() => `?`).join(', ')})`).join(', ');
            let sql = `INSERT INTO ?? (${columns.join(', ')}) VALUES ${placeholders}`;
            let params = [this.tb_name, ...values.flat()];
            db.query(sql, params, callback);
        } else {
            db.query(`INSERT INTO ?? SET ?`, [this.tb_name, obj], callback);
        }
    }
    update(obj, callback)
    {
        const {id_tb_gia_nuoc, ...updateFields} = obj;
        db.query(`update ?? set ? where id_tb_gia_nuoc = ? `, [this.tb_name, updateFields, id_tb_gia_nuoc], callback)
    }
    delete(id, callback)
    {
        db.query('delete from ?? where id_tb_gia_nuoc = ? ', [this.tb_name, id], callback)
    }
}
export default new Model_tb_gia_nuoc('tb_gia_nuoc')