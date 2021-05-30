const { Router } = require('express');
const router = Router();
const { getRoute, getRoutes } = require('../controllers/rutas.controller');

import { checkDoubleRoute } from '../middleware/checkRoute';

router.route('/')
	.get(getRoutes)
router.route('/:id')
	.get([checkDoubleRoute], getRoute)

module.exports = router; 