import Route from '../models/Ruta';
import Ip from '../models/Ip';
import axios from 'axios';
import config from '../config.json';
export const checkDoubleRoute = async (req, res, next) => {
	const route = await Route.findOne({routeName: req.params.id});
	if (route){
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(config.webhook_url);
        try {
            await axios.post(config.webhook_url, {
                content: "Nueva ip registrada: **" + ip + "** en la ruta: **" + route.routeName + "**",
            });
        } catch (e) {
            console.log("Axios error: ", e)
        }
        let newIp = new Ip({
            hostName: ip
        });
        newIp.routeFound = route;
        await newIp.save();
        await route.ips.push(newIp);
        await route.save();
		res.status(200).json(route);
        next();
	} else {
        res.status(404).json({message: "this route does not exist"});
    }
}