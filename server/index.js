const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const { connectToDatabase } = require('./db/database');

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());



// Routes
app.use('/routes', routes);

app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});


connectToDatabase()
    .then(() => {
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
        process.exit(1); // Exit the process if database connection fails
    });
