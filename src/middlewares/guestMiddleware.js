function guestMiddleware(req, res, next) {
	if (req.session.userLogged) { 
		return res.redirect('/user/account'); 
	}
	next();
}

module.exports = guestMiddleware;