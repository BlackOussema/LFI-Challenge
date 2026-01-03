const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <head><title>SQLi Portal</title><style>
            body { background: #000; color: #0ff; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .box { border: 2px solid #0ff; padding: 40px; box-shadow: 0 0 20px #0ff; text-align: center; }
            input { background: #000; border: 1px solid #0ff; color: #0ff; padding: 10px; margin: 10px; width: 250px; }
            button { background: #0ff; border: none; padding: 10px 20px; cursor: pointer; font-weight: bold; }
        </style></head>
        <body>
            <div class="box">
                <h1>ADMIN LOGIN</h1>
                <form action="/login" method="POST">
                    <input type="text" name="username" placeholder="Username" required><br>
                    <input type="password" name="password" placeholder="Password"><br>
                    <button type="submit">ACCESS SYSTEM</button>
                </form>
            </div>
        </body></html>
    `);
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    if (username.includes("' OR 1=1 --") || username.includes("' or 1=1 --")) {
        res.send("<h1 style='color:#0ff; background:#000; padding:50px;'>FLAG: ECC_CTF{SQLi_Login_Bypass_Successful}</h1>");
    } else {
        res.send("<h1 style='color:red; background:#000; padding:50px;'>INVALID CREDENTIALS</h1>");
    }
});

app.listen(3000);
