const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
fs.writeFileSync(path.join(logsDir, 'system.txt'), 'System status: All nodes operational.');
fs.writeFileSync(path.join(__dirname, 'secret_flag.txt'), 'ECC_CTF{LFI_TRAVERSAL_BY_GHARIANI_2026}');

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>GHARIANI | DARK-SYSTEMS</title>
            <style>
                body { background: #000; color: #0f0; font-family: 'Courier New', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .box { border: 2px solid #0f0; padding: 40px; box-shadow: 0 0 20px #0f0; text-align: center; background: rgba(0,20,0,0.8); }
                h1 { text-shadow: 0 0 10px #0f0; letter-spacing: 5px; }
                .btn { color: #000; background: #0f0; padding: 10px 20px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 20px; transition: 0.3s; }
                .btn:hover { background: #fff; box-shadow: 0 0 20px #fff; }
                .footer { margin-top: 30px; font-size: 12px; color: #050; }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>SECURE PORTAL</h1>
                <p>>_ WELCOME TO GHARIANI DARK SYSTEMS v2.0</p>
                <p>>_ STATUS: ENCRYPTED</p>
                <a href="/view?file=logs/system.txt" class="btn">VIEW SYSTEM LOGS</a>
            </div>
            <div class="footer">ADMIN: GHARIANI OUSSEMA | 2026 &copy;</div>
        </body>
        </html>
    `);
});

app.get('/view', (req, res) => {
    const fileName = req.query.file;
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send("<body style='background:#000;color:red;'><h1>[!] ERROR: ACCESS DENIED</h1></body>");
        } else {
            res.send("<body style='background:#000;color:#0f0;padding:20px;'><pre>" + data + "</pre><br><a href='/' style='color:#fff;'>BACK</a></body>");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server Active'));
              
