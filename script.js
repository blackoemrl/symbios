document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if ((username === 'abyssluxe' && password === 'admin') || (username === 'adam' && password === 'admin2')) {
        sessionStorage.setItem('user', username);  // Enregistrer l'utilisateur dans sessionStorage
        window.location.href = 'dashboard.html';  // Rediriger vers la page de dashboard
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
});
