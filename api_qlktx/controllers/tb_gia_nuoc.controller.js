
import model from '../models/tb_gia_nuoc.model.js'

class Controller_tb_gia_nuoc {
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
        model.delete(req.params.id, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    }
}
export default new Controller_tb_gia_nuoc()