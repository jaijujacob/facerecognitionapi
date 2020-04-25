
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const database = {
    users:
        [
            {
                id: '123',
                name: 'john',
                email: 'john@gmail.com',
                password: 'test',
                entries: 0,
                joined: new Date()

            },
            {
                id: '124',
                name: 'jaiju',
                email: 'jaiju@mail.com',
                password: 'test',
                entries: 0,
                joined: new Date()

            },
            {
                id: '125',
                name: 'james',
                email: 'james@mail.com',
                password: 'test',
                entries: 0,
                joined: new Date()

            }
        ]
}

app.get('/', (req, resp) => {
    resp.send(database.users);
})


app.post('/signin', (req, resp) => {
    bcrypt.compare("teszt", '$2a$10$xu0GmZa9BN4xcFMK.CnfgehcJikTr1N20u1x8s8XrCNLakqBH1bRW', function (err, res) {
        console.log(res);

    });
    console.log(req.body.password);
    
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        resp.json(database.users[0]);
    }
    else {
        resp.status(400).json('error logging in');
    }
})


app.post('/register', (req, resp) => {

    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '126',
        name: name,
        email: email,        
        entries: 0,
        joined: new Date()
    })
    resp.json(database.users[database.users.length - 1]);

})

app.get('/profile/:id', (req, resp) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return resp.json(user);
        }
    })
    if (!found) {
        resp.status(400).json('No such user');
    }

})


app.put('/image/', (req, resp) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return resp.json(user.entries++);
        }
    })
    if (!found) {
        resp.status(400).json('No such user');
    }

})



// // Load hash from your password DB.
// bcrypt.compare("$2a$10$xu0GmZa9BN4xcFMK.CnfgehcJikTr1N20u1x8s8XrCNLakqBH1bRW", hash, function (err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('App is listening on port 3000');
})