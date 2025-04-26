
import model from '../models/tb_trong_phong.model.js'

class Controller_tb_trong_phong
{
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
        const {id_phong, id_nguoi_dung} = req.params;
        model.delete(id_phong, id_nguoi_dung, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    }
}
export default new Controller_tb_trong_phong()