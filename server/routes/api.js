const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://prem:java22031@ds137862.mlab.com:37862/crud', (err, db) => {
    var db =  db.db("crud")   
    if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/getProduct', (req, res) => {
    connection((db) => {
        db.collection('products')
            .find()
            .toArray()
            .then((data) => {
                response.data = data[0];
                res.setHeader('Access-Control-Allow-Origin','*')
		        res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


router.post('/addProduct', (req, res) => {
    connection((db) => {
        db.collection('products')
        .save(req.body, (err, result) => {
        if(err){
            res.send('cannot add the product at the moment')
        }else{
            res.send('product '+req.body.name+' added successfully');
        }
  })

    });
});


router.get('/getProducts', (req,res) => {
    var query = {};
    if(req.query.productId){
        query.productId = req.query.productId
        query = {"productId":parseInt(query.productId)}
    }else{
        query = req.query;
    }
    connection((db) => {
        db.collection('products')
            .find(query)
            .toArray()
            .then((data) => {
                // response.data = data;
                // res.json(response);
                res.setHeader('Access-Control-Allow-Origin','*')
                res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
                res.json(data);
            })
            .catch((err) => {
                // sendError(err, res);
                res.status(500).send(err);
            });
        });
    });

router.put('/edit', (req, res) => {
    connection((db) => {
    db.collection('products')
      .findOneAndUpdate({"_id":req.body._id}, {
        $set: {
          name: req.body.name,
          release_date: req.body.release_date,
          ram: req.body.ram,
          battery: req.body.battery,
          screen_size : req.body.screen_size,
          description : req.body.description,
          cover : req.body.cover
        }
       }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })
})

router.delete('/delete', (req, res) => {
    connection((db) => {
    db.collection('products')
    .findOneAndDelete({name: req.body.name},
    (err, result) => {
        if (err) return res.send(500, err)
        res.send({message: 'success'})
    })
})
})


module.exports = router;


/*
mongodb://prem:java22031@ds137862.mlab.com:37862/crud
<a href="https://ibb.co/g8a1kK"><img src="https://preview.ibb.co/fazSQK/galaxys9.jpg" alt="galaxys9" border="0"></a>
*/