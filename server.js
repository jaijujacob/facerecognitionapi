
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionstring : process.env.DATABASE_URL,
        ssl:true
        // host: '127.0.0.1',
        // user: 'jaiju',
        // password: 'Pass',
        // database: 'smart-brain'
    }
});
db.select('*').from('users').then(data => {
    // console.log(data);

})

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, resp) => {
    resp.json("Its working!");
    // resp.send(database.users);
})

//Controllers

app.post('/signin', (req, resp) => {signin.handleSignin(req, resp, db, bcrypt)})
app.post('/register', (req, resp) => {register.handleRegister (req, resp, db, bcrypt)})
app.get('/profile/:id', (req, resp) => {profile.handleProfile(req, resp, db)})
app.put('/image/', (req, resp) => { image.handleImage(req, resp, db)})
app.post('/imageurl/', (req, resp) => { image.handleAPICall(req, resp)})

console.log(PORT);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})