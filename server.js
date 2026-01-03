const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({ extended: true }));

fs.writeFileSync('flag.txt', 'ECC_CTF{COMMAND_INJECTION_MASTER_GHARIANI}');

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html><head><title>Terminal</title><style>
            body { background: #000; color: #f00; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .box { border: 2px solid #f00; padding: 40px; box-shadow: 0 0 20px #f00; text-align: center; }
            input { background: #000; border: 1px solid #f00; color: #f00; padding: 10px; width: 300px; }
            button { background: #f00; border: none; padding: 10px 20px; cursor: pointer; font-weight: bold; }
        </style></head>
        <body>
            <div class="box">
                <h1>SYSTEM TERMINAL</h1>
                <form action="/diagnose" method="POST">
                    <input type="text" name="cmd" placeholder="Enter Folder (e.g. .)" required><br><br>
                    <button type="submit">EXECUTE</button>
                </form>
            </div>
        </body></html>
    `);
});

app.post('/diagnose', (req, res) => {
    exec(`ls ${req.body.cmd}`, (err, stdout, stderr) => {
        res.send(`<body style='background:#000;color:#f00;padding:20px;'><pre>${stdout || stderr}</pre><br><a href='/' style='color:#fff;'>BACK</a></body>`);
    });
});

app.listen(3000);
