
import model from '../models/tb_sinh_vien.model.js'

class Controller_tb_sinh_vien {
    getAll(req, res) {
        model.getAll((err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        });
    }
    getById(req, res) {
        model.getById(req.params.id, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        });
    }
    getByIdPhong(req, res) {
        model.getSVByIdPhong(req.params.id_tb_phong, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        });
    }
    insert(req, res) {
        model.insert(req.body, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    }
    update(req, res) {
        model.update(req.body, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    }
    delete(req, res) {
        model.delete(req.params.id, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    }
    search(req, res) {
        model.getSearch(req.body, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    }
    checkByMSV(req, res) {
        model.getByMSV(req.params.msv, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    }
}
export default new Controller_tb_sinh_vien()