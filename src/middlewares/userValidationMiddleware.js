const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('first_name').notEmpty().withMessage('Tenes que ingresar un nombre'),
    body('last_name').notEmpty().withMessage('Tenes que ingresar un apellido'),
	body('email').notEmpty().withMessage('Tenes que ingresar un correo electrónico').bail()
		         .isEmail().withMessage('Tenes que ingresar un formato de correo válido'),
	body('birth_date').notEmpty().withMessage('Tenes que ingresar la fecha de nacimiento').bail(),
    body('adress').notEmpty().withMessage('Tenes que ingresar un domicilio'),
	body('category').notEmpty().withMessage('Tenes que seleccionar una categoría').bail(),
	body('password').notEmpty().withMessage('Tenes que ingresar una contraseña')
	                .isLength({min: 7}).withMessage('La contraseña debe tener al menos 7 caracteres'),
    body('password2').notEmpty().withMessage('Tenes que confirmar la contraseña'),
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tenes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]