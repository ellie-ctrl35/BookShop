import express, { request, response } from "express";
import { PORT ,mongoDBURL} from "./config.js";
import mongoose from "mongoose";

import BookRoutes from './Routes/BookRoutes.js';

const app = express();

app.use(express.json());

/*app.use(
    cors({
        origin:"localhost:3000",
        methods:['GET','POST','PUT','DELETE'],
        allowesHeaders:['Content-Type'],
    })
)*/

app.get('/', (request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN');
});

app.use('/books',BookRoutes);


//This sets up the connection between the database and backend
mongoose.connect(mongoDBURL).then(()=>{
  console.log('App connected to database');
  app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
});
})
.catch((error)=>{
  console.log(error);
});