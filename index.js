const express = require('express');
const knex = require('knex')
const morgan = require('morgan')
const cors = require('cors');
const bodyParser= require('body-parser')
const multer = require('multer');
const formidable = require('formidable')
const { NODE_ENV } = require('./config')
const { PORT, DB_URL } = require('./config')
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)
//const db = require('./db.json');

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

app.get('/rifle', (req, res) => {
    db
        .select('*')
        .from('loaddata')
        .where({type: 'rifle'})
        .then(data => {
           return (
                res.json(data),
                console.log(data)
           )
        })
    
})

app.get('/pistol', (req, res) => {
    db
        .select('*')
        .from('loaddata')
        .where({type: 'pistol'})
        .then(data => {
           return (
                res.json(data),
                console.log(data)
           )
        })
    
})

app.get('/shotgun', (req, res) => {
    db
        .select('*')
        .from('loaddata')
        .where({type: 'shotgun'})
        .then(data => {
           return (
                res.json(data),
                console.log(data)
           )
        })
    
})

app.get('/home', (req, res) => {
    db
        .select('*')
        .from('loaddata')
        .whereIn('type', ['rifle', 'pistol'])
        .then(data => {
           return (
                res.json(data),
                console.log(data)
           )
        })

})

app.get('/data', (req, res) => {
    db
    .select('*')
    .from('loaddata')
    .where({id: req.query.find})
    .then(data => {
       return (
            res.json(data),
            console.log(data)
       )
    })
})

app.get('/search', (req, res) => {
    db
    .select('*')
    .from('loaddata')
    .whereRaw(`LOWER(name) LIKE ?`,[`%${req.query.search}%`])
    .then(data => {
       return (
            res.json(data),
            console.log(data)
       )
    })
    console.log(req.query.search)
})

app.get('/saved', (req, res) => {
    db
        .select('*')
        .from('loaddata')
        .whereIn('type', ['rifle', 'pistol', 'shotgun'])
        .then(data => {
           return (
                res.json(data),
                console.log(data)
           )
        })
 })

app.post('/riflepost', (req, res) => {
    const form = new formidable.IncomingForm();


    form.on('fileBegin', function (name, file){
        file.path = `https://the-social-reloader-react.alecstein44.now.sh` + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    form.parse(req, function(err, fields, files) {
        console.log(files)
        console.log(fields)
        db('loaddata')
        .insert([
            {
                name: fields.name,
                img: files.img.name,
                caliber: fields.caliber,
                bullet: fields.bullet,
                powder: fields.powder,
                primer: fields.primer,
                brandcase: fields.case,
                price: fields.price,
                fps: fields.fps,
                min: fields.min,
                avg: fields.avg,
                max: fields.max,
                paragraph: fields.paragraph,
                type: fields.type
            }
        ])
        .then(results => {
            return (
                console.log(`The results are ${JSON.stringify(results)}`),
                res.json(results)
            )
         })
        .catch(error => {
            return res.json(error)
        })
      });
})

app.post('/pistolpost', (req, res) => {
    const form = new formidable.IncomingForm();


    form.on('fileBegin', function (name, file){
        file.path = `https://the-social-reloader-react.alecstein44.now.sh` + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    form.parse(req, function(err, fields, files) {
        console.log(files)
        console.log(fields)
        db('loaddata')
        .insert([
            {
                name: fields.name,
                img: files.img.name,
                caliber: fields.caliber,
                bullet: fields.bullet,
                powder: fields.powder,
                primer: fields.primer,
                brandcase: fields.case,
                price: fields.price,
                fps: fields.fps,
                min: fields.min,
                avg: fields.avg,
                max: fields.max,
                paragraph: fields.paragraph,
                type: fields.type
            }
        ])
        .then(results => {
            return (
                console.log(`The results are ${JSON.stringify(results)}`),
                res.json(results)
            )
         })
        .catch(error => {
            return res.json(error)
        })
      });
})

app.post('/shotgunpost', (req, res) => {
    const form = new formidable.IncomingForm();


    form.on('fileBegin', function (name, file){
        file.path = `https://the-social-reloader-react.alecstein44.now.sh` + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    form.parse(req, function(err, fields, files) {
        console.log(files)
        console.log(fields)
        db('loaddata')
        .insert([
            {
                name: fields.name,
                img: files.img.name,
                gauge: fields.caliber,
                shot: fields.bullet,
                powder: fields.powder,
                primer: fields.primer,
                shell: fields.case,
                price: fields.price,
                fps: fields.fps,
                min: fields.min,
                avg: fields.avg,
                max: fields.max,
                paragraph: fields.paragraph,
                type: fields.type
            }
        ])
        .then(results => {
            return (
                console.log(`The results are ${JSON.stringify(results)}`),
                res.json(results)
            )
         })
        .catch(error => {
            return res.json(error)
        })
      });
})
