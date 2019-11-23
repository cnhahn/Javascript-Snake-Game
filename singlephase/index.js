//make a simple web-server 
//expressjs.com -> getting started

//require away of loading modules
const express = require('express')
//extantate express and assign to app
const app = express()
//set up a port for listening
const port = 3000

//tells express where our static files are located at
app.use(express.static(__dirname + '/public/'))

//set up roots
//app.get('/', (req, res) => res.send('Hello World!'))

//the below gets simplified because of the line 12 since express is already looking in the public folder
//app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.get('/', (req, res) => res.sendFile('index.html'))

//listen on port 3000 escentally output to say we are listening on this port and started web sever
app.listen(port, () => console.log(`Example app listening on port ${port}!`))