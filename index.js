const http = require('http')
const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const db_trips = require('./db/db_trips');
const db_bookings =require('./db/db_bookings')
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
      status: 'success',
      data: db_trips
    })
    return res.status(404).send({
      status: 'error',
      error: 'Bookings dont exist',
     });
  });

//Creating new trip
// app.post('/api/v1/trips', (req, res) => {
//     if(!req.body.title) {
//       return res.status(400).send({
//         success: 'false',
//         message: 'title is required'
//       });
//     } else if(!req.body.description) {
//       return res.status(400).send({
//         success: 'false',
//         message: 'description is required'
//       });
//     }
//    const trip = {
//      id: db_trips.length + 1,
//      title: req.body.title,
//      description: req.body.description
//    }
//    db_trips.push(trips);
//    return res.status(201).send({
//      success: 'true',
//      message: 'trip added successfully',
//      trip
//    })
//   });

//Get a single trip
  app.get('/api/v1/trips/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db_trips.map((trip) => {
      if (trip.id === id) {
        return res.status(200).send({
          status: 'success',
          data: trip
        });
      } 
  });
   return res.status(404).send({
     status: 'error',
     error: 'Trip doesnot exist',
    });
  });

  //Delete todo bby id
  app.delete('/api/v1/trips/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    db_trips.map((trip, index) => {
      if (trip.id === id) {
         db_trips.splice(index, 1);
         return res.status(200).send({
           status: 'success',
           message: 'Trip deleted successfuly',
         });
      }
    });
  
  
      return res.status(404).send({
        status: 'error',
        error: 'Item for deletion not found',
      });
  
   
  });



// get all bookings
app.get('/api/v1/bookings', (req, res) => {
  res.status(200).send({
    status: 'success',
    data: db_bookings
  })

  return res.status(404).send({
    status: 'error',
    error: 'Bookings not found',
  });
});


//Get a single trip
app.get('/api/v1/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db_bookings.map((booking) => {
    if (booking.id === id) {
      return res.status(200).send({
        status: 'success',
        data: booking,
      });
    } 
});
 return res.status(404).send({
   status: 'error',
   error: 'Booking does not exist',
  });
});

//Delete todo bby id
app.delete('/api/v1/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db_bookings.map((booking, index) => {
    if (booking.id === id) {
       db_bookings.splice(index, 1);
       return res.status(200).send({
         status: 'success',
         message: 'Booking deleted successfuly',
       });
    }
  });


    return res.status(404).send({
      status: 'error',
      error: 'Booking to delete not found',
    });

 
});




//Running a server
app.listen(PORT, (req,res) =>{
    console.log('api running on port 3000')
})
