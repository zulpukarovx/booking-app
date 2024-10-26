const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const UserModel = require('./models/User');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'wrigsapornvajzdmzhduqdlqprimnadf';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(`${__dirname}/uploads`));
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
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await UserModel.findOne({email});
        
        if(userAlreadyExists) {
            return res.status(400).json({success: false, message: "User already exists"});
        }

        const userDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
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
            const {name, email, _id} = await UserModel.findById(userData.id);
            res.json({name, email, _id});
        })
    } else {
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    try {
        const newImage = await download.image({
            url: link,
            dest: __dirname + '/uploads/' + newName,
        });
        res.json( newName );
    } catch (error) {
        res.status(422).json(error);
    }
});

const photosMiddleware = multer({dest: 'uploads'});
app.post('/upload', photosMiddleware.array('photos', 10), (req, res) => {
    res.json(req.files);
})

app.listen(4000);



