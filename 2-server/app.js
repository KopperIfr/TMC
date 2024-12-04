// "¡Tu servidor sabe cuánto tiempo has pasado en línea! ⏳"
// Gancho: "¿Y si Express pudiera medir cuánto tiempo pasas navegando? Te lo enseño."
// Contenido: Crea un middleware que registre cuándo el usuario entra y sale de tu API, devolviendo el tiempo transcurrido.

import express from 'express';
const app = express();

app.use((req, res, next) => {
    req.startTime = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - req.startTime;
        console.log(`Tiempo en la API: ${duration}ms`);
    });
    next();
});
app.get('/', (req, res) => res.send('Bienvenido a tu API!'));