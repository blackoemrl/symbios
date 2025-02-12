document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Détection du système d'exploitation
    function detectOS() {
        let userAgent = navigator.userAgent;
        if (/Windows NT/.test(userAgent)) return "Windows";
        if (/Macintosh|Mac OS X/.test(userAgent)) return "MacOS";
        if (/Android/.test(userAgent)) return "Android";
        if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
        if (/Linux/.test(userAgent)) return "Linux";
        return "Inconnu";
    }

    const os = detectOS();
    const date = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

    // Récupérer l'IP via une API externe
    let ip = "IP_INCONNUE";
    try {
        let response = await fetch("https://api64.ipify.org?format=json");
        let data = await response.json();
        ip = data.ip;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'IP :", error);
    }

    // Liste des utilisateurs autorisés
    const users = {
        "abyssluxe": "admin",
        "adam": "admin2"
    };

    const webhookURL = "https://discord.com/api/webhooks/1338762578469588992/tLlMBkg0RdhiLCXFOmjzB4YOyusC2WmQ9FcvUde1v5wokdUOI-FXWeZLzOqBebvihB4U"; // Remplace par ton webhook

    if (users[username] && users[username] === password) {
        sessionStorage.setItem('user', username);

        // Envoi du log sur Discord
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `✅ **Nouvelle connexion réussie !**\n👤 **Utilisateur** : ${username}\n🕒 **Heure** : ${date}\n💻 **Appareil** : ${os}\n📌 **IP** : ${ip}`
            })
        }).catch(error => console.error("Erreur envoi Discord:", error));

        window.location.href = 'dashboard.html';
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect");

        // Log de tentative échouée
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `❌ **Tentative de connexion échouée !**\n👤 **Utilisateur** : ${username}\n🕒 **Heure** : ${date}\n💻 **Appareil** : ${os}\n📌 **IP** : ${ip}`
            })
        }).catch(error => console.error("Erreur envoi Discord:", error));
    }
});
