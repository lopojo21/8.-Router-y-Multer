// en consola npm init -y
//NPM install -g nodemon
//npm install express
import { Router } from "express";
import { uploader } from '../utili/multer.js';
import ProductManager from "../managers/productManager.js";

const pManager = new ProductManager();
const productRouter = Router();
const products = [];

productRouter.get('/', async(req,res) => {
        const productos = await pManager.getProducts()
        const limit = req.query.limit;
        const limite = productos.length;
    
    //http://localhost:8080/?limit=10
    //http://localhost:8080/?limit=3
        
        if(limit < limite && limit != 0  ){
            return res.status(200).send(productos.slice(0,limit));   
        }
        else{       
            // console.log("ELSE") testing
            return res.status(200).send(productos);   
        };
    });
productRouter.get('/:pid', async (req,res) => {
        // const pId = req.params.pid;
        // const productos = await pManager.getProducts()
        const productoID = await pManager.getProductByID(parseInt(req.params.pid));
        // console.log(parseInt(req.params.pid))
    return res.status(200).send(productoID);  
    });

productRouter.post('/', async (req,res)=>{
    const producto= req.body;

    await pManager.addProducts(producto);  //user.push(req.body) 
    return res.status(200).send({status:'success', message:'Product created'});
});

productRouter.put('/:pid', async (req,res)=>{
    const producto= req.body;
    const id= parseInt(req.params.pid);
    
    const mProduct = await pManager.updateProduct(id,producto);

    if (mProduct instanceof Error){return res
        .status(400)
        .send({status :"error" , menssage : `${mProduct.menssage}`});
    } else{
        return res
        .status(201)
        .send({status:"success", message: "Product update"});
    }
});
    // const updateProduct = productos.splice(id-1,1,{id,...producto});
    


productRouter.delete('/:pid', async (req,res)=>{
    const id= parseInt(req.params.pid);  
    await pManager.deleteProduct(id);
return res.status(200).send({status:'success', message:'Product DELETED'});
    }
    
);
export default productRouter;