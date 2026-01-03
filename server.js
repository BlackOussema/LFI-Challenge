const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

fs.writeFileSync(path.join(__dirname, 'flag.txt'), 'ECC_CTF{COMMAND_INJECTION_MASTER_GHARIANI}');

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>GHARIANI | DIAGNOSTICS</title>
            <style>
                body { background: #000; color: #f00; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .panel { border: 2px solid #f00; padding: 40px; box-shadow: 0 0 20px #f00; background: #050000; text-align: center; }
                input { background: #000; border: 1px solid #f00; color: #f00; padding: 15px; width: 300px; font-family: monospace; outline: none; margin-bottom: 20px; }
                button { background: #f00; border: none; color: #000; padding: 15px 30px; cursor: pointer; font-weight: bold; }
                button:hover { background: #fff; }
            </style>
        </head>
        <body>
            <div class="panel">
                <h1>SYSTEM TERMINAL</h1>
                <p>>_ ENTER IP FOR DIAGNOSTICS:</p>
                <form action="/diagnose" method="POST">
                    <input type="text" name="ip" placeholder="8.8.8.8" required>
                    <br>
                    <button type="submit">EXECUTE</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

app.post('/diagnose', (req, res) => {
    const ip = req.body.ip;
    exec(`ping -c 1 ${ip}`, (err, stdout, stderr) => {
        res.send(`
            <body style="background:#000; color:#f00; padding:20px; font-family:monospace;">
                <pre>${stdout || stderr}</pre>
                <br><a href="/" style="color:#fff;">BACK</a>
            </body>
        `);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server Active'));
