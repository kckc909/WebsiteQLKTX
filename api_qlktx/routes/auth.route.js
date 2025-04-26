
import controller from '../controllers/auth.controller.js'
import e from 'express'

const route = e.Router();

route.post('/', (req, res) => { controller.login(req, res) });

export default route;