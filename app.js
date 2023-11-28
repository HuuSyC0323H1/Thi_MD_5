const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const products = [
    {
        id: 1,
        title: 'IPhone 12',
        price: '20000000',
        description: 'Iphone 12 mới 100%'
    },
    {
        id: 2,
        title: 'IPhone 13 Pro',
        price: '25600000',
        description: 'Iphone 12 like new 99%'
    },
    {
        id: 3,
        title: 'Samsung Galaxy Ultra 22',
        price: '32000000',
        description: 'Điện thoại chất lượng nhất của Samsung'
    },
    {
        id: 4,
        title: 'IPad Mini',
        price: '12000000',
        description: 'Sản phẩm phù hợp với học sinh, sinh viên'
    },
];

app.get("/products", (req, res) => {
    res.json(products);
});
app.get("/products/:id", (req, res) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        res.json(products[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.post("/products", (req, res) => {
    const product = {
        id: products.length++,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    };
    products.push(product);
    res.json(product);
});
app.delete("/products/:id", (req, res) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        products.splice(index, 1);
        res.json({message: 'Product deleted successfully', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.put("/products/:id", (req, res) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        const product = products[index];
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        res.json(product);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findProductIndex(id) {
    for(let i = 0; i < products.length; i++) {
        if(products[i].id === id) {
            return i;
        }
    }
    return -1;
}
