const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const FILE_PATH = './messages.json';

// Fonction pour commit et push sur GitHub
function commitAndPush(message) {
    exec(`git add ${FILE_PATH} && git commit -m "Nouveau message: ${message}" && git push`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Erreur Git: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
}

// Route pour récupérer les messages
app.get('/messages', (req, res) => {
    fs.readFile(FILE_PATH, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur de lecture du fichier" });
        }
        res.json(JSON.parse(data));
    });
});

// Route pour ajouter un message
app.post('/messages', (req, res) => {
    const { sender, text } = req.body;
    if (!sender || !text) {
        return res.status(400).json({ error: "Données invalides" });
    }

    fs.readFile(FILE_PATH, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur de lecture du fichier" });
        }

        const messages = JSON.parse(data);
        messages.push({ sender, text, timestamp: new Date().toISOString() });

        fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Erreur d'écriture" });
            }

            commitAndPush(text); // Push sur GitHub
            res.json({ success: true });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
