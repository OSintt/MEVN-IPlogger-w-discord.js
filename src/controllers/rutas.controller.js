const routeCtrl = {};
const Route = require('../models/Ruta');
const Ip = require('../models/Ip');

routeCtrl.getRoutes = async (req, res) => {
	let findUs = await Route.find().populate('ips');
	res.status(200).json(findUs);
}

routeCtrl.getRoute = async (req, res) => {
	let findRoute = await Route.findOne({routeName: req.params.id});
	res.status(200).json(findRoute);
}

module.exports = routeCtrl;