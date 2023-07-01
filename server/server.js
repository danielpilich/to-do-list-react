const PORT = 8000;
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db.js')

app.use(cors())
app.use(express.json())

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

//create new task
app.post('/tasks', async (req, res) => {
    const { user_email, title, progress, date } = req.body
    console.log(user_email, title, progress, date)
    const id = uuidv4()

    pool.query(`INSERT INTO tasks(id, user_email, title, progress, date) VALUES(?, ?, ?, ?, ?)`, 
    [id, user_email, title, progress, date], (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        res.json(data)
    });
})

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))