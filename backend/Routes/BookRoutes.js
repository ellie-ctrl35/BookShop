import express from 'express';
import { Book } from '../Models/bookModel.js';

const router = express.Router();

// creating an item on the database
router.post('/',async(request,response)=>{
    try {
        if (
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message:'Send all required fields: title,author,publishYear',
            });
        } 
        
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//getting and item from the database
router.get('/', async(request,response)=>{
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count:books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//this updates data in the database
router.put('/:id',async (request,response)=>{
    try {
        if (
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message:'Send all required fields: title,author,publishYear',
            });
        } 
        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id,request.body);

        if (!result) {
            return response.status(404).json({message:'Book not found'});
        }
        return response.status(200).send({message:'Book succesfully updated'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//This deletes data from te databse
router.delete('/:id',async (request,response)=>{
   try {
     const{id}= request.params;

     const result = await Book.findByIdAndDelete(id);

     if(!result){
        return response.status(404).json({message:'Book not found'});
     }
     return response.status(200).send({message:'Book sucessfully deleted'});

   } catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
   }
})

export default router;