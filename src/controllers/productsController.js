const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products});
	},
	offers: (req, res) => {
            res.render('search', {products: products.filter(product => product.category == 'in-sale')});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		res.render('detail', {product : products.find(product => product.id == req.params.id) });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log(req.file)
		let product = {
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file == undefined ? "default-image.png": req.file.filename
		}
		products.push(product);
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(products, null, "\t"));
		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form', { productToEdit : products.find(product => product.id == req.params.id)});
	},
	// Update - Method to update
	update: (req, res) => {
		console.log(req.body)
		let modifiedProduct = products.map(product => {
			if (product.id == req.params.id) {
				return product = {
					id: req.params.id ,
					name: req.body.name == '' ? product.name : req.body.name,
					price: req.body.price == '' ? product.price : req.body.price,
					discount: req.body.discount == '' ? product.discount : req.body.discount,
					category: req.body.category == '' ? product.category : req.body.category,
					description: req.body.description == '' ? product.description : req.body.description,
					image: req.file == undefined ? product.image : req.file.filename
				}
			}
			return product;
		});
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(modifiedProduct, null, "\t"));
		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		productsFilter = products.filter(product => product.id != req.params.id)
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productsFilter, null, "\t"));
		res.redirect('/products');
	}
};

module.exports = controller;