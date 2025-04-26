
import controller from '../controllers/tb_so_dien_nuoc.controller.js'
import e from 'express'

const route = e.Router();

route.get('/', (req, res) => { controller.getAll(req, res) });
route.get('/:id', (req, res) => { controller.getById(req, res) });
route.post('/', (req, res) => { controller.insert(req, res) });
route.put('/', (req, res) => { controller.update(req, res) });
route.delete('/:id', (req, res) => { controller.delete(req, res) });

export default route