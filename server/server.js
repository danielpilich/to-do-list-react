const PORT = 8000;
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

// Get all tasks
app.get('/tasks/:userEmail', async (req, res) => {
    const {userEmail} = req.params
    pool.query('SELECT * FROM tasks WHERE user_email = ?', 
    [userEmail], (err, data) => {
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

//edit a task
app.put('/tasks/:id', async (req, res) =>{
    const {id} = req.params
    const { user_email, title, progress, date } = req.body

    pool.query('UPDATE tasks SET user_email = ?, title = ?, progress = ?, date = ? WHERE id = ?;', 
    [user_email, title, progress, date, id], (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        res.json(data)
    });
})

//delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params

    pool.query('DELETE FROM tasks WHERE id = ?', 
    [id], (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        res.json(data)
    });
})

//signup
app.post('/signup', async (req, res) => {
    const {email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try{
        const signUp = await pool.query('INSERT INTO users (email, hashed_password) VALUES(?, ?)', 
        [email, hashedPassword])
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        res.json({email, token})
    }catch(err){
        console.error(err)
        if(err){
            res.json({detail: err.detail})
        }
    }
})

//login
app.post('/login', (req, res) => {
    const {email, password} = req.body
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        if(data == null) return res.json({ detail: 'User does not exist!'})

        const success = await bcrypt.compare(password, data[0].hashed_password)
        const token = jwt.sign({email}, 'secret', {expiresIn:'1hr'})

        if(success){
            res.json({'email': data[0].email, token})
        }else{
            res.json({detail:"Login failed"})
        }    
})
})

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))