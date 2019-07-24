const http = require('http')
const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const db_trips = require('./db/db_trips');
const db_bookings =require('./db/db_bookings');
const jwt = require('jsonwebtoken');
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




// get all trips
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
app.post('/api/v1/trips', (req, res) => {
  
    if(!req.body.seating_capacity) {
      return res.status(400).send({
        success: 'false',
        message: 'Seating capacity is required'
      });
    } else if(!req.body.bus_licence_number) {
      return res.status(400).send({
        success: 'false',
        message: 'Bus licence Number is required'
      });
    }else if(!req.body.origin){
      return res.status(400).send({
        success: 'false',
        message: 'Origin is required'
      });
    }else if(!req.body.destination){
      return res.status(400).send({
        success: 'false',
        message: 'Destination is required'
      });
    }else if(!req.body.trip_date){
      return res.status(400).send({
        success: 'false',
        message: 'Trip date is required'
      });
    }else if(!req.body.fare){
      return res.status(400).send({
        success: 'false',
        message: 'fare is required'
      });
    }else if(!req.body.status){
      return res.status(400).send({
        success: 'false',
        message: 'status is required'
      });
    }
   const trip = {
      id: db_trips.length + 1,
      seating_capacity:req.body.seating_capacity,
      bus_licence_number: req.body.bus_licence_number,
      origin: req.body.origin,
      destination: req.body.destination,
      trip_date: req.body.trip_date,
      fare: req.body.fare,
      status: req.body.status
   }
   db_trips.push(trip);
   return res.status(201).send({
     success: 'true',
     message: 'trip added successfully',
     trip
   })
  });

//create a booking
//Creating new trip
app.post('/api/v1/bookings', (req, res) => {
  
  if(!req.body.trip_id) {
    return res.status(400).send({
      success: 'false',
      message: 'Trip id is required'
    });
  } else if(!req.body.user_id){
    return res.status(400).send({
      success: 'false',
      message: 'User is required'
    });
  }else if(!req.body.created_on){
    return res.status(400).send({
      success: 'false',
      message: 'Date is required'
    });
  }
  
 const booking = {
    id: db_bookings.length + 1,
    trip_id:req.body.trip_id,
    user_id: req.body.user_id,
    created_on:req.body.created_on
    
 }
 db_bookings.push(booking);
 return res.status(201).send({
   success: 'true',
   message: 'Booking is successfull',
   booking
 })
});


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

  //Delete trips by id
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


//Get a single bookings
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

//Delete bookings by id
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
