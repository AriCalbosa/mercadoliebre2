const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('index', {products});
	},
	search: (req, res) => {
        let searchedProducts = req.query.keywords;
            let searchedProductsMin = searchedProducts.toLowerCase();
            let foundedProducts = [];
            
            for (let i = 0; i < products.length; i++) {
                let productMin = products[i].name.toLowerCase();
                if (productMin.includes(searchedProductsMin)) {
                    foundedProducts.push(products[i]);
                }
            }
            res.render('search', {products: foundedProducts});
        
	},
};

module.exports = controller;
