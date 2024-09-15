const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const UserModel = require('./models/User');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'wrigsapornvajzdmzhduqdlqprimnadf';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


mongoose.connect(process.env.MONGO_URL);


app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;    
    
    try {
        const userDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json( userDoc );
    } catch (error) {
        res.status(422).json(error);
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userDoc = await UserModel.findOne({ email });

    if(userDoc) {
        const passwordMatch = bcrypt.compareSync(password, userDoc.password)
        if (passwordMatch) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('incorrect password');
        }
    } else {
        res.json('User not found');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const userDoc = await UserModel.findById(userData.id);
            res.json(userDoc);
        })
    } else {
        res.json(null);
    }
})

app.listen(4000);



