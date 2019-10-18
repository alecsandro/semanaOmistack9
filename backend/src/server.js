const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express(); // cria a aplicacao

mongoose.connect('mongodb+srv://lekao2009:32684737@omnistack-9glnz.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors()); // qq aplicacao possa acessar a api
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);

app.listen(3333); // ouvi a porta 3333 http://localhost:3333/
