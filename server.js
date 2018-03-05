const { createServer } = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

var bodyParser = require('body-parser');


const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express()
const dev = app.get('env') !== 'production'

if (!dev){

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    app.disable('x-powered-by')
    app.use(compression())
    app.use(morgan('common'))

    app.use(express.static(path.resolve(__dirname, 'build')))

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/', (req, res, next) => {
        console.log('Main page is called')
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })

    // app.get('/students', (req, res) => {
    //     console.log('students is called');
    //     res.send('hello world');
    // });

    app.post('/creates', (req, res, next) => {
        console.log('server students is created');
        //res.send('hello world creates');
        //NODE_ENV=production node app.js
        // console.log('req')
        // console.log(req)
        console.log('req.body')
        console.log(req.body)
        

        // axios.post('http://localhost:8080/SpringRestHibernate/create', req.body)
        axios.post('http://springcrudapp-springcrudapp.a3c1.starter-us-west-1.openshiftapps.com/SpringRestHibernate/create', req.body)
        .then((response) => {
            console.log('Server response -> this is being sent stringified')
            console.log("response.data");
            console.log(response.data);
            res.send(JSON.stringify(response.data))
        })
        .catch((error) => {
            console.log(error);
        });

    });

    app.post('/updates', (req, res, next) => {
        console.log('server update students is created');
        //res.send('hello world creates');
        //NODE_ENV=production node app.js
        // console.log('req')
        // console.log(req)
        console.log('req.body')
        console.log(req.body)
        

        // axios.post('http://localhost:8080/SpringRestHibernate/create', req.body)
        axios.put('http://springcrudapp-springcrudapp.a3c1.starter-us-west-1.openshiftapps.com/SpringRestHibernate/update', req.body)
        .then((response) => {
            console.log('Server response -> this is being sent stringified for update')
            console.log("response.data");
            console.log(response.data);
            res.send(JSON.stringify(response.data))
        })
        .catch((error) => {
            console.log(error);
        });

    });

    app.post('/deletes', (req, res, next) => {
        console.log('server update students is deleted');
        //res.send('hello world creates');
        //NODE_ENV=production node app.js
        // console.log('req')
        // console.log(req)
        console.log('req.body')
        console.log(req.body)
        

        // axios.post('http://localhost:8080/SpringRestHibernate/create', req.body)
        //axios.delete('http://localhost:8080/SpringRestHibernate/students/delete/' + this.state.id)
        axios.delete('http://springcrudapp-springcrudapp.a3c1.starter-us-west-1.openshiftapps.com/SpringRestHibernate/delete/' + req.body.id)
        .then((response) => {
            console.log('Server response -> this is being sent stringified for delete')
            console.log("response.data");
            console.log(response.data);
            res.send(JSON.stringify(response.data))
        })
        .catch((error) => {
            console.log(error);
        });

    });

    app.get('/students', (req, res, next) => {
        console.log('students is called');
        //res.send('hello world');

        axios.get('http://springcrudapp-springcrudapp.a3c1.starter-us-west-1.openshiftapps.com/SpringRestHibernate/students')
        .then( (response) => {
            console.log("Server Response")
            console.log("Response")
            console.log(response)
            console.log("Response.data")
            console.log(response.data)
            let stringify = JSON.stringify(response.data)

            res.send(stringify);
        })
        .catch( (error) => {
            console.log(error);
        });

    });
    
}

if (dev){
    app.use(morgan('dev'))
    console.log(" Is this dev")
}

const server = createServer(app)

server.listen(PORT, err => {
    if (err) throw err
    console.log('Server Started');
})