//dependencies
const express = require('express');
const app = express();
const methodOverride = require("method-override");

//set variable of port to 3000
const port = process.env.PORT || 3000;

//data
const budget = require('./models/budget.js');


// body-parser
app.use(express.static('public')); //statically match with file named public
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const sum = () => {
  let bank = 0
  for (let i = 0; i < budget.length; i++) {
    bank += parseFloat(budget[i].amount);
  }
  bank = parseFloat(bank); 

  return bank;
}

// INDEX route
app.get('/', (req, res) => {
  res.render('index.ejs', { 
    budget: budget,
    bank: sum()
  });

});

// new route Note: new route must be above show route
app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/' , (req,res) => {
  req.body.amount = parseFloat(req.body.amount); 
  budget.push(req.body)
  res.redirect('/')
})


// SHOW route
app.get('/:arr', (req, res) => {
  res.render('show.ejs', {
      budget: budget[req.params.arr],
  });
});

app.listen(port, () => {
    console.log("app is running on port: ", port);
  });
  