const express = require('express');

//express = ligthweigth
// router -> organizing our endpoints 
// middlewar -> allows us expand and customize

const db = require('./data/db');

const server = express();
const { hubs } = db;

//middleware
server.use(express.json());

// creating endpoints

// I want to make something availabe in case anyone needs
server.get('/', (req,res) => {

    res.send("<h2>Hello World</h2>")
})

//request handler for /now that sends back the current date in the string form
server.get('/now', (req,res) => {
      const s = Date(Date.now());
      const a = s.toString()
      res.send(a)
})

// GET is Read in CRUD - sends back all hubs

server.get('/hubs', (req,res) => {
     // get the hub from the db
     hubs.find()
     .then(allHubs =>{
        res.json(allHubs);
     })
     .catch(({code, message}) => {
         res.status(code).json(message)
     })
     // then sends them back

})

//Create -  add a new hub to the list

server.post('/hubs', (req,res) => {
    
    const newHub = req.body

    hubs.add(newHub)
    .then(addedHubs =>{
       res.status(201).json(addedHubs);
    })
    .catch(({code, message}) => {
        res.status(code).json(message)
    })


})

// Destory - remove a hub 
server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params;

    hubs.remove(id)
    .then(removeHub => {
        res.json(removeHub)
    })
    .catch(({code, message}) => {
        res.status(code).json(message)
    })

})

// Updating - U in CRUD
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    hubs.update(id, changes)
    .then(updateHub => {
        if(updateHub) {
           res.json(updateHub)
        } else {
           res.status(404).json({
               err: 'incorrect id'
           })
        }
    })
    .catch(({code, message}) => {
        res.status(code).json(message)
    })
})


//get by ID
server.get('/hubs/:id', (req, res) => {
    const { id } = req.params;

    hubs.findById(id)
    .then(findHub => {
        res.json(findHub)
    })
    .catch(({code, message}) => {
        res.status(code).json(message)
    })

})

//listening
server.listen(9090, () => {
    console.log('Server is listening');
})