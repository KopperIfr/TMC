import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import passportConfig from './config/passport.js';
import authRoutes from './routes/auth.js';


dotenv.config();

const app = express();
app.use(express.json());

// Conectar con MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

















