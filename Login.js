<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
</head>
<body>
    <h2>Connexion</h2>
    <form id="loginForm">
        <label>Nom d'utilisateur :</label>
        <input type="text" id="username" required>
        
        <label>Mot de passe :</label>
        <input type="password" id="password" required>
        
        <button type="submit">Se connecter</button>
    </form>

    <p id="message"></p>

    <script>
        document.getElementById("loginForm").addEventListener("submit", async function(event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            const messageElement = document.getElementById("message");

            if (data.success) {
                messageElement.textContent = "Connexion réussie !";
                messageElement.style.color = "green";

                // Redirection vers une autre page si besoin
                setTimeout(() => {
                    window.location.href = "index.html"; // Modifier avec la page d'accueil
                }, 1000);
            } else {
                messageElement.textContent = "Identifiants incorrects.";
                messageElement.style.color = "red";
            }
        });
    </script>
</body>
</html>
