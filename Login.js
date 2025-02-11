export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Méthode non autorisée" });
    }

    // Liste des utilisateurs autorisés (stockés côté serveur)
    const users = [
        { username: "Abyss", password: "Admin" },
        { username: "Adam", password: "Admin" }
    ];

    const { username, password } = req.body;

    // Vérifier si l'utilisateur est autorisé
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ success: false, message: "Identifiants incorrects" });
    }

    // Récupérer l'heure et l'adresse IP
    const date = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Remplace cette ligne par l'URL de ton propre webhook Discord
    const webhookURL = "https://discord.com/api/webhooks/1338762578469588992/tLlMBkg0RdhiLCXFOmjzB4YOyusC2WmQ9FcvUde1v5wokdUOI-FXWeZLzOqBebvihB4U";  // <-- Remplace par ton webhook Discord

    // Envoyer la notification Discord
    await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `📢 **Nouvelle connexion !**\n👤 **Utilisateur** : ${username}\n🕒 **Heure** : ${date}\n📌 **IP** : ${ip}`
        })
    });

    // Répondre au client
    res.status(200).json({ success: true, message: "Connexion réussie" });
}
