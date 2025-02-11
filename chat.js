const repoOwner = "blackoemrl"; 
const repoName = "Symbios";
const filePath = "messages.json"; 
const token = "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"; 

const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

const username = sessionStorage.getItem('user') || 'Utilisateur'; 

const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messageContainer = document.getElementById('messageContainer');

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span>${sender} :</span> ${message}`;
    messageContainer.appendChild(messageElement);

    messageContainer.scrollTop = messageContainer.scrollHeight;
}

async function loadMessages() {
    try {
        const response = await fetch(apiUrl, {
            headers: { "Authorization": `token ${token}` }
        });
        const data = await response.json();
        return JSON.parse(atob(data.content));
    } catch (error) {
        console.error("Erreur de chargement des messages :", error);
        return [];
    }
}

async function sendMessage(sender, text) {
    const messages = await loadMessages();
    messages.push({ sender, text, timestamp: new Date().toISOString() });

    const updatedContent = btoa(JSON.stringify(messages, null, 2)); 

    const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Authorization": `token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Mise à jour des messages",
            content: updatedContent,
            sha: await getFileSha() 
        })
    });

    if (response.ok) {
        console.log("Message envoyé !");
        addMessage(text, sender); 
    } else {
        console.error("Erreur d'envoi des messages :", await response.text());
    }
}

async function getFileSha() {
    const response = await fetch(apiUrl, {
        headers: { "Authorization": `token ${token}` }
    });
    const data = await response.json();
    return data.sha;
}

loadMessages().then(messages => {
    messages.forEach(msg => {
        addMessage(msg.text, msg.sender);
    });
});

sendMessageBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== "") {
        sendMessage(username, message);
        messageInput.value = "";
    }
});

messageInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        sendMessageBtn.click();
    }
});
