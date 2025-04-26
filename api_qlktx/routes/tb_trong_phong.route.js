
import controller from '../controllers/tb_trong_phong.controller.js'
import e from 'express'

const route = e.Router();

route.get('/', (req, res) => { controller.getAll(req, res) });
route.get('/:id', (req, res) => { controller.getById(req, res) });
route.post('/', (req, res) => { controller.insert(req, res) });
route.put('/', (req, res) => { controller.update(req, res) });
route.delete('/:id_phong/:id_nguoi_dung', (req, res) => { controller.delete(req, res) });

export default route