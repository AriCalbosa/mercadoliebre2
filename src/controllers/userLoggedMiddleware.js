const session = require('express-session');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = users.find(user => user.email == emailInCookie);

	if (userFromCookie) { 
		req.session.userLogged = userFromCookie; 
	}

	if (req.session.userLogged) { 
		res.locals.isLogged = true; // HAY USUARIO LOGUEADO POR LO QUE CARGA BOTÓN DE PROFILE EN VISTA
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;