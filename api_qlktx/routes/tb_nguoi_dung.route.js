
import controller from '../controllers/tb_nguoi_dung.controller.js'
import e from 'express'
import { authenticateToken, authorize } from '../middleware/authMiddelware.js';

const route = e.Router();

route.get('/', authenticateToken, authorize('ad'), (req, res) => { controller.getAll(req, res) });
route.get('/:id', (req, res) => { controller.getById(req, res) });
route.post('/', (req, res) => { controller.insert(req, res) });
route.put('/', (req, res) => { controller.update(req, res) });
route.delete('/:id', (req, res) => { controller.delete(req, res) });

export default route