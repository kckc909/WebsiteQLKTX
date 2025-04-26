
import controller from '../controllers/tb_sinh_vien.controller.js'
import e from 'express'

const route = e.Router();

route.get('/', (req, res) => { controller.getAll(req, res) });
route.get('/:id', (req, res) => { controller.getById(req, res) });
route.post('/', (req, res) => { controller.insert(req, res) });
route.put('/', (req, res) => { controller.update(req, res) });
route.delete('/:id', (req, res) => { controller.delete(req, res) });

route.post('/search', (req, res) => { controller.search(req, res) });
route.get('/getByIdPhong/:id_tb_phong', (req, res) => { controller.getByIdPhong(req, res) });
route.get('/checkByMSV/:msv', (req, res) => { controller.checkByMSV(req, res) });

export default route