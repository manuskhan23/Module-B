import express from 'express';
import { data } from './data.js';

const app = express();

const port = 3000;

app.get('/',(req,res)=>{
    res.json("mulla")
})

app.get('/users',(req,res)=>{
    res.json(data)
})

app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const fetch=data.filter((e,i)=>{
        return e.id==id
    })
    res.json(fetch)
})

app.listen(port, () => {
    console.log('server is running')
});