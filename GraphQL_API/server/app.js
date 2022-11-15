const express = require('express');
const mongoose = require('mongoose')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});

mongoose.connect('mongodb+srv://LukeSkywalker:starwars123@cluster0.vmnprom.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.once('open', () =>
  console.log('connected to database')
  );