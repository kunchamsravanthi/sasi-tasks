// const next = require('next');
// const express = require('express');
// const dev = process.env.NODE_ENV !== "production";
// const PORT = process.env.PORT || 3000;
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();
// nextApp.prepare().then(() => {
//     const app = express()
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use('/api/login', require('./routes/index'))
    
//     app.post('/api/login', (req, res) => {
//         const { email, password } = req.body;
//         res.json({
//             email,
//             password,
//             success: true
//         })
//     });
//     app.get('*', (req, res) => {
//         return handle(req, res) // for all the react stuff
//     })
//     app.listen(PORT, err => {
//         if (err) throw err;
//         console.log(`ready at http://localhost:${PORT}`)

//     })

// });
const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieparser = require('cookie-parser')
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const AUTH_USE_TYPE = "authenticated";
const COOKIE_SECRET = 'asldkfjals321kj';
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !dev,
    signed: true
}
const authenticate = async (email, password) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data.find(user => {
        if (user.email === email && user.website === password) {
            return user;
        }
    })
}
app.prepare().then(() => {
    const server = express();
    server.use(express.json());
    server.use(cookieparser(COOKIE_SECRET))
    server.post('/api/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await authenticate(email, password)
        if (!user) {
            return res.status(403).send("Invalid email or password");
        }
        const userData = {
            name: user.name,
            email: user.email,
            type: AUTH_USE_TYPE
        }
        res.cookie('token', userData, COOKIE_OPTIONS);
        res.json(userData);
    });

    server.post("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(port, err => {
        if (err) throw err;
        console.log('Listening on PORT ${port}')
    });
});
// app.prepare().then(() => {
//     const server = express();
//     server.listen(port, err => {
//         if (err) throw err;
//         console.log('Listening on PORT ${port}');
//     });
// });
