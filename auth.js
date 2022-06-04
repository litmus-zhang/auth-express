const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
// const {users} = require("./db")
// import { users } from './db'

app.use(bodyParser.json())
const accessTokenSecret = 'youraccesstokensecret';

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];
app.post('/login', (req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;
    console.log(username, password);

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});


app.listen(4000, () =>
{
    console.log("Authentication Server is running on port 4000");
})



