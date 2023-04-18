import express from "express";
// const pManager = new ProductManager();
import productRouter from "./routes/productRouter.js";
import carRouter from "./routes/carRouter.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products/',productRouter);
app.use('/api/carts/',carRouter);


app.listen(8080, ()=>{
    console.log("Servidor Escuchanding...");
});