import express from 'express';
import axios from 'axios';
import fs from 'fs'

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    // Lee el contenido del archivo HTML
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
        } else {
            // Envía el contenido del archivo HTML como respuesta
            res.send(data);
        }
    });
});

app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        res.status(200).json({ success: true, message: 'Users retrieved successfully', data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving users', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
