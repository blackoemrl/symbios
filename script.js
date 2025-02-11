document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Vérification des utilisateurs autorisés
    if ((username === 'abyssluxe' && password === 'admin') || (username === 'adam' && password === 'admin2')) {
        sessionStorage.setItem('user', username);  // Enregistrer l'utilisateur dans sessionStorage

        // Préparer l'heure et l'adresse IP
        const date = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
        const ip = "IP_INCONNUE";  // L'IP ne peut pas être récupérée en JavaScript côté client, mais tu peux afficher "IP_inconnue" ou utiliser d'autres méthodes côté serveur.

        // URL du webhook Discord (remplace par ton propre webhook)
        const webhookURL = "https://discord.com/api/webhooks/1338762578469588992/tLlMBkg0RdhiLCXFOmjzB4YOyusC2WmQ9FcvUde1v5wokdUOI-FXWeZLzOqBebvihB4U";  // <-- Remplace par ton webhook Discord

        // Envoi de la notification sur Discord
        fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `📢 **Nouvelle connexion !**\n👤 **Utilisateur** : ${username}\n🕒 **Heure** : ${date}\n📌 **IP** : ${ip}`
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Message envoyé à Discord:", data);
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi du message à Discord:", error);
        });

        // Rediriger vers la page du dashboard
        window.location.href = 'dashboard.html';  
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
});
