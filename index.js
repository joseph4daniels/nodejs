const express = require('express');
const app = express();

app.use(express.json());

const fruits = [
    {id: 1, name: 'apple'},
    {id: 2, name: 'banana'},
    {id: 3, name: 'orange'}
]

app.get('/', (req, res) => {
    
    res.send('Hello World');

});

app.get('/api/fruits', (req, res) => {

    res.send(fruits);

});

app.get('/api/fruits/:id', (req, res) => {
 
    const fruit = fruits.find(f => f.id === parseInt(req.params.id));
    
    if(!fruit) 
    {
        res.status(404).send('id not found in Fruits');
        return;
    }
    else
    {
        res.send(fruit);
    }

});

app.post('/api/fruits', (req, res) => {
    
    if(!req.body.name)
    {
        res.status(400).send("Fruit name not entered")
        return;
    }
    
    const fruit = {
        id : fruits.length + 1,
        name : req.body.name
    };

    fruits.push(fruit);
    res.send(fruit);

});

app.put('/api/fruits/:id', (req, res) => {
    
    const fruit = fruits.find(f => f.id === parseInt(req.params.id));
    
    if(!fruit) 
    {
        res.status(404).send('id not found in Fruits');
        return;
    }

    if(!req.body.name)
    {
        res.status(400).send("Fruit name for update not entered")
        return;
    }

    fruit.name = req.body.name;
    res.send(fruit);

});

app.delete('/api/fruits/:id', (req, res) => {
    
    const fruit = fruits.find(f => f.id === parseInt(req.params.id));
    
    if(!fruit) 
    {
        res.status(404).send('id inputted for deletion not found in Fruits');
    }
    else
    {
        const index = fruits.indexOf(fruit);
        fruits.splice(index, 1);
        res.send(fruit);
        //res.send("fruit deleted");
    }

});

app.listen(3000, () => console.log('Listening on port 3000'));