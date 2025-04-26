import model from '../models/tb_dang_ky_phong.js';
 
const getAll = (req, res) => {
    model.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

const getById = (req, res) => {
    model.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

const getByStatus = (req, res) => {
    model.getByStatus(req.params.status, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

const insert = (req, res) => {
    model.insert(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, id: result.insertId });
    });
};

const update = (req, res) => {
    model.update(req.body, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
};

const deleteOne = (req, res) => {
    model.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
};

const deleteMany = (req, res) => {
    model.deleteMany(req.body.ids, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
};

export default {
    getAll,
    getById,
    getByStatus,
    insert,
    update,
    deleteOne,
    deleteMany
};
