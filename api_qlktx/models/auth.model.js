import db from '../common/db.js';

class Model_Auth {
    constructor(tb_name) {
        this.tb_name = tb_name
    }
    login(user, callback) {
        db.query('select * from ?? where ten_tai_khoan = ?', [this.tb_name, user.username], callback);
    }
}

export default new Model_Auth('tb_nguoi_dung')
