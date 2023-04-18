// en consola npm init -y
//NPM install -g nodemon
//npm install express
import { Router } from "express";
import { uploader } from '../utili/multer.js';
import ProductManager from "../managers/productManager.js";
import carManager from "../managers/carManager.js";

const pManager = new ProductManager();
const cManager = new carManager();
const carRouter = Router();
const products = [];

// carRouter.get('/', async(req,res) => {
//         const carrito = await cManager.getProducts()
//         const limit = req.query.limit;
//         const limite = productos.length;
    
//     //http://localhost:8080/?limit=10
//     //http://localhost:8080/?limit=3
        
//         if(limit < limite && limit != 0  ){
//             return res.status(200).send(productos.slice(0,limit));   
//         }
//         else{       
//             // console.log("ELSE") testing
//             return res.status(200).send(productos);   
//         };
//     });
// carRouter.get('/product/:pid', async (req,res) => {
//         // const pId = req.params.pid;
//         // const productos = await pManager.getProducts()
//         const productoID = await cManager.getProductByID(parseInt(req.params.pid));
//         // console.log(parseInt(req.params.pid))
//     return res.status(200).send(productoID);  
//     });

carRouter.get('/:cid', async (req,res)=>{
    const idCar =+req.params.cid
    const car= await cManager.getProductByID(idCar);
    
    if (car instanceof Error){return res
        .status(400)
        .send({status :"error" , menssage : `${car.menssage}`});
    } else{
        return res
        .status(201)
        .send(car)
        // .send({status:"success", message: `Products in car`});
    }// const updateProduct = productos.splice(id-1,1,{id,...producto});

});

carRouter.post('/products/:pid', async (req,res)=>{
    
    const idProd=+req.params.pid;
    const idCar =+req.params.cid

    const {id}= await pManager.getProductByID(idProd);
    
    const mProduct = await cManager.addCar(idCar,id);

    if (mProduct instanceof Error){return res
        .status(400)
        .send({status :"error" , menssage : `${mProduct.menssage}`});
    } else{
        return res
        .status(201)
        .send({status:"success", message: `Product added to car`});
    }// const updateProduct = productos.splice(id-1,1,{id,...producto});
});

carRouter.post('/:cid/products/:pid', async (req,res)=>{
    
    const idProd=+req.params.pid;
    const idCar =+req.params.cid

    const {id}= await pManager.getProductByID(idProd);
    console.log(idProd)
    const mProduct = await cManager.updateProduct(idCar,id);

    if (mProduct instanceof Error){return res
        .status(400)
        .send({status :"error" , menssage : `${mProduct.menssage}`});
    } else{
        return res
        .status(201)
        .send(mProduct);
        
    }// const updateProduct = productos.splice(id-1,1,{id,...producto});
});


carRouter.delete('/product/:pid', async (req,res)=>{
    const id= parseInt(req.params.pid);  
    await cManager.deleteProduct(id);
return res.status(200).send({status:'success', message:'Product DELETED'});
    }
    
);
export default carRouter;