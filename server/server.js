const PORT = 8000;
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db.js')

app.use(cors())

// Get all tasks
app.get('/tasks/:userEmail', async (req, res) => {
    const {userEmail} = req.params
    pool.query('SELECT * FROM tasks WHERE user_email = ?', [userEmail], (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        res.json(data)
    });
})

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))