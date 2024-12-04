// "¡Haz que tus rutas hablen! 🔊"
// Gancho: "¿Te imaginas que tus rutas respondan con voz? ¡Mira esto!"
// Contenido: Integra un paquete como say para que las respuestas de las rutas se conviertan en audio.


import express from 'express';
import say from 'say';

const app = express();
app.get('/say', (req, res) => {
    say.speak('Welcome to teach me code', 'Daniel');
    return res.send('Say something page');
});
app.listen(3000, () => console.log('Server listening on port 3000..'));