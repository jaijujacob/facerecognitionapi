
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'jaiju',
        password: 'Pass',
        database: 'smart-brain'
    }
});
db.select('*').from('users').then(data => {
    // console.log(data);

})

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

    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {                    
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        console.log(user);                        
                        resp.json(user[0])
                    })
                    .catch(err => resp.status(400).json("Unable to get user"))
            }
            else{
                resp.status(400).json("Wrong credenials")
            }
        }).catch(err => resp.status(400).json("Wrong credenials"))
})


app.post('/register', (req, resp) => {

    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    }).then(user => {
                        resp.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(err => {
        console.log(err);
        resp.json("Unable to register user");
    })





})

app.get('/profile/:id', (req, resp) => {
    const { id } = req.params;
    let found = false;
    console.log(id);

    db.select('*').from('users')
        .where({ id })
        .then(user => {
            if (user.length) {
                resp.json(user[0]);
            }
            else {
                resp.status(400).json('User not found')
            }
            found = true;
        }).catch(err => {
            console.log(err);

            resp.status(400).json('Error getting user')
        })
})


app.put('/image/', (req, resp) => {
    const { id } = req.body;
    let found = false;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => resp.json(entries[0]))
        .catch(err => {
            console.log(err);

            resp.status(400).json("Error updating entires")
        })

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