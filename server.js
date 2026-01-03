const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>GHARIANI | DARK-SYSTEMS</title>
            <style>
                :root { --glow-color: #00ff41; }
                body {
                    background-color: #050505;
                    color: var(--glow-color);
                    font-family: 'Courier New', monospace;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    height: 100vh; margin: 0; overflow: hidden;
                }
                .glitch {
                    font-size: 3rem; font-weight: bold;
                    text-transform: uppercase; position: relative;
                    text-shadow: 0 0 10px var(--glow-color);
                    margin-bottom: 20px;
                }
                .container {
                    border: 2px solid var(--glow-color);
                    padding: 40px; border-radius: 5px;
                    background: rgba(0, 255, 65, 0.05);
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
                    text-align: center; max-width: 600px;
                }
                .file-list { margin-top: 30px; display: flex; gap: 20px; }
                .file-btn {
                    color: #000; background: var(--glow-color);
                    padding: 10px 20px; text-decoration: none;
                    font-weight: bold; border-radius: 3px;
                    transition: 0.3s; box-shadow: 0 0 10px var(--glow-color);
                }
                .file-btn:hover {
                    background: #fff; color: #000;
                    box-shadow: 0 0 30px #fff;
                }
                .terminal-text {
                    font-size: 0.9rem; margin-top: 30px;
                    opacity: 0.7; border-top: 1px solid var(--glow-color);
                    padding-top: 10px; width: 100%;
                }
                footer { position: absolute; bottom: 10px; font-size: 12px; opacity: 0.5; }
            </style>
        </head>
        <body>
            <div class="glitch">Access Restricted</div>
            <div class="container">
                <p>>_ GHARIANI_CENTRAL_CORE: V.2.0.26</p>
                <p>>_ Unauthorized access is strictly prohibited by law.</p>
                <p style="margin-top:20px;">Available System Logs:</p>
                <div class="file-list">
                    <a href="/view?path=logs/uptime.txt" class="file-btn">UPTIME LOG</a>
                    <a href="/view?path=logs/traffic.txt" class="file-btn">TRAFFIC LOG</a>
                </div>
                <div class="terminal-text">
                    [SYSTEM]: Waiting for input...<br>
                    [HINT]: Directory traversal might reveal root secrets.
                </div>
            </div>
            <footer>ID: GHARIANI OUSSEMA | SECURED BY QUANTUM ENCRYPTION</footer>
        </body>
        </html>
    `);
});

app.get('/view', (req, res) => {
    const userPath = req.query.path;
    
    const absolutePath = path.resolve(__dirname, userPath);

    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(`
                <body style="background:#000; color:red; font-family:monospace; padding:20px;">
                <h1>[!] SYSTEM ERROR</h1>
                <p>ACCESS TO ${userPath} DENIED OR FILE DOES NOT EXIST.</p>
                <br><a href="/" style="color:white;">BACK TO PORTAL</a>
                </body>
            `);
        } else {
            res.send(`
                <body style="background:#050505; color:#00ff41; font-family:monospace; padding:30px;">
                <h2>--- FILE_CONTENT: ${userPath} ---</h2>
                <hr border-color="#00ff41">
                <pre style="font-size:1.2rem;">${data}</pre>
                <hr border-color="#00ff41">
                <a href="/" style="color:#fff; text-decoration:none;">[ RETURN TO TERMINAL ]</a>
                </body>
            `);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Matrix Server Active on ${PORT}`));
