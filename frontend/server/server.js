const express = require('express')

const http = require('http');

const axios = require('axios');

const multer = require('multer')

const cors = require('cors')

const bodyparser = require('body-parser')

const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname + "/uploads")))

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(cors())
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },

    filename: function(req, file, cb) {
        console.log(file);
        cb(null, "abc" + '_' + Date.now() + '_' + file.originalname);
    },
});


var upload = multer({ storage: storage }).single('file');

var UploadImages = multer({ storage: storage }).array('files')


app.listen(3000, () => {
    console.log("Port: 3000")
})

app.post('/node-js/upload-image', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log("this is error log: " + err)
        }
        res.json({
            path: req.file.filename
        })
    })
})

app.post('/node-js/create-images', (req, res) => {
    UploadImages(req, res, (err) => {
        if (err) {
            console.log("this is error log: " + err)
        }
        let img = []

        req.files.forEach(file => {
            img.push(file.filename)
        });

        res.json({
            path: img
        })
    })
})