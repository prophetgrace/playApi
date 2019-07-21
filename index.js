const http = require('http')
const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const db = require('./db/db');
const PORT = 3000;

//Configuring body parser to use json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Default route
app.get('/', (req,res) =>{
    res.json({
        message:"Api running now"
    })
})

// get all todos
app.get('/api/v1/trips', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Trips retrieved successfully',
      trips: db
    })
  });

app.listen(PORT, (req,res) =>{
    console.log('api running on port 3000')
})

//CReating new todo
app.post('/api/v1/trips', (req, res) => {
    if(!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    } else if(!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      });
    }
   const trip = {
     id: db.length + 1,
     title: req.body.title,
     description: req.body.description
   }
   db.push(trips);
   return res.status(201).send({
     success: 'true',
     message: 'trip added successfully',
     trip
   })
  });
//Get a single todo
  app.get('/api/v1/trips/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((trip) => {
      if (trip.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          trip,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'todo does not exist',
    });
  });

  //Delete todo bby id
  app.delete('/api/v1/trips/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    db.map((trip, index) => {
      if (trip.id === id) {
         db.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'Todo deleted successfuly',
         });
      }
    });
  
  
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
  
   
  });