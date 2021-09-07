import express, { request, response } from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import dotenv from 'dotenv';
import { ObjectID } from "bson";
const app=express();
dotenv.config();
const PORT=process.env.PORT;
//const MONGO_URL="mongodb+srv://node_mongo:abcd123@cluster0.bf49q.mongodb.net"
const MONGO_URL=process.env.url;
async function createconnection(){
    const Client = new MongoClient(MONGO_URL);
     await Client.connect();
     return Client;
   }
app.use(cors())
app.use(express.json());
app.get("/",(request,response)=>{
    response.send("hello")
})
app.get("/cart",async(request,response)=>{
    const Client= await createconnection();
    const result = await Client.db("flipkart").collection("cart").find({}).toArray();
    response.send(result);
})
app.post("/cart",async(request,response)=>{
    const cartdata = request.body;
    console.log(cartdata)
    const Client= await createconnection();
    const result = await Client.db("flipkart").collection("cart").insertMany(cartdata);
    response.send(result);
})
app.delete("/cart/:id",async(request,response)=>{
    const {id} = request.params;
    const Client= await createconnection();
    const result =  await Client.db("flipkart").collection("cart").deleteOne({_id : ObjectID(id)})
    response.send(result)
})
app.listen(PORT,()=>{console.log("executed",PORT)})