const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	login: (req, res) => {
		res.render('login');
	},
	processLogin: (req, res) => {
		let userInDBByEmail = users.find(user => user.email === req.body.email);
		console.log('userInDBByEmail.password: ' , userInDBByEmail);
		if (userInDBByEmail) {
			if (bcryptjs.compareSync(req.body.password, userInDBByEmail.password)) {
				userInDBByEmail.password = null;
				req.session.userLogged = userInDBByEmail;
				if(req.body.remember_user) {
					res.cookie('userEmail', userInDBByEmail.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/account');
			} else {
				res.render('login', {
					errors: {
						email: {
							msg: 'Verifique su mail o contraseña'
						}
					},
					oldData: req.body
				})
			}
		} else {
			res.render('login', {
				errors: {
					email: {
						msg: 'Verifique su mail o contraseña'
					}
				},
				oldData: req.body
			});
		}



	},
	register: (req, res) => {
		res.render('register');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
			res.render('register', {
				errors: resultValidation.mapped(), 
				oldData: req.body
			});
		}

		let userInDBByEmail = users.find(user => user.email == req.body.email);
		if (userInDBByEmail) {
			res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		if (req.body.password !== req.body.password2) {
			res.render('register', {
				errors: {
					password2: {
						msg: 'Las contraseñas deben ser iguales'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			id: (users.length - 1) + 1,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			birth_date: req.body.birth_date,
			adress: req.body.adress,
			category: req.body.category,
			password: bcryptjs.hashSync(req.body.password, 10),
			image: req.file.filename ? req.file.filename : 'default-image.png'
		}

		users.push(userToCreate);
		fs.writeFileSync(path.join(__dirname, '../data/usersDataBase.json'), JSON.stringify(users, null, "\t"));

		res.redirect('/user/login');

	},
	account: (req, res) => {
		let user = req.session.userLogged
		res.render('account', {user});
	},
	logout: (req, res) => {
		res.clearCookie('userEmail'); 
		req.session.destroy();
		res.redirect('/');
	}
};

module.exports = controller;




