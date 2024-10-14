import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validation from 'validator';

// Definir el esquema de usuario
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validation.isEmail,
            message: 'Provide a valid email address!'
        }
    },
    password: {
        type: String,
        validate: {
            validator: (v) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: "Password not strong enough!"
        }
    },
    googleId: {
        type: String,
        default: null
    }
});

// Middleware para hashear la contraseña antes de guardarla (para la estrategia local)
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Validación personalizada para asegurar que el password solo sea requerido cuando googleId es null
UserSchema.path('password').validate(function (value) {
    // Si el googleId no existe, la contraseña es obligatoria
    if (!this.googleId && !value) {
        return false;
    }
    return true;
}, 'Password is required if not using Google OAuth');

export default mongoose.model('User', UserSchema);
