const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false; // NO HAY USUARIO GUARDADO EN EL SESSION, POR LO QUE CARGA BOTONES DE REGISTRO Y LOGIN EN VISTA

	let emailInCookie = req.cookies.userEmail;
	if(emailInCookie){

		let user = users.find(user => user.email == emailInCookie)
		console.log('user userLoggermiddleware: ',user)
		if(user) {
				req.session.userLogged = user;
		}
	}
	if (req.session.userLogged) { // SI HAY UN USUARIO LOGUEADO POR SESSION
		res.locals.isLogged = true; // HAY USUARIO LOGUEADO POR LO QUE CARGA BOTÓN DE PROFILE EN VISTA
		res.locals.userLogged = req.session.userLogged; // PASA LO QUE HAY EN SESSION A UNA VARIABLE LOCAL PARA USAR EN LA VISTA
		console.log('res.locals.userLogged middleware: ',res.locals.userLogged)
	}
		next();
	}

module.exports = userLoggedMiddleware;