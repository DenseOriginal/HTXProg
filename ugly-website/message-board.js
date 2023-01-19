const form = document.getElementById('message-board-form');
const messageBoard = document.getElementById('message-container');
const messageTextarea = document.getElementById('message');
let username = "Ludvig";

const messageTemplate = (author, message, timestamp, id) => `
    <div class="message" id="${id}">
        <p class="author">👤 ${author}</p>
        <p class="content">${message}</p>
        <p class="timestamp">${timestamp}</p>
        <ul class="replies">
        </ul>
    </div>
`;

const addReply = (messageId, author, message) => {
    const messageContainer = document.getElementById(messageId);
    const replies = messageContainer.querySelector('.replies');
    const reply = document.createElement('li');
    reply.innerHTML = `<strong>${author}</strong>: ${message}`;
    replies.appendChild(reply);
}

const addMessage = (author, message, timestamp, id) => {
    messageBoard.insertAdjacentHTML('afterbegin', messageTemplate(author, message, timestamp, id))
}

// Listen to form submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (messageTextarea.value === '') return;
    const message = messageTextarea.value;
    const author = username;
    // Timestamp as day / month - year
    const timestamp = new Date().toLocaleDateString('en-GB');
    const id = Date.now();
    addMessage(author, message, timestamp, id);
    appendToLocalStorage(author, message, timestamp, id);
    messageTextarea.value = '';

    addMultipleReplies(id, message, ~~(Math.random() * 8) + 2);
});

function addMultipleReplies(messageId, content, amount) {
    for (let i = 0; i < amount; i++) {
        // Random author name user + 5 digit number
        const author = `user${Math.floor(Math.random() * 100000) + 10000}`;
        const message = replies(content)[Math.floor(Math.random() * replies(content).length)];

        // Add the reply after a random amount of time (4 - 20 seconds)
        setTimeout(() => {
            addReply(messageId, author, message);
        }, Math.floor(Math.random() * 4000 * i) + 2000);
    }
}

// List of mean replies
const replies = (message) => [
    'You are a bad person',
    'This sucks',
    'Downvoted',
    'This is not funny',
    'Please stop',
    'Hi mom',
    'I hate you',
    'I hate this',
    'This is the worst',
    'i hope you fall down the stairs',
    '<insert insult here>',
    '[object Object]',
    '🤓',
    '🤡',
    'your opinion is wrong',
    'You\'re*',
    'I have called the police',
    'You deserve to be in prison',
    'Shut up',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    `"${message}" 🤓`,
    `"${message}" 🤓`,
];

// Store the messages in an array of objects in localStorage
function appendToLocalStorage(author, message, timestamp, id) {
    let messages = [];
    if (localStorage.getItem('messages')) {
        messages = JSON.parse(localStorage.getItem('messages'));
    }
    messages.push({ author, message, timestamp, id });
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Get the messages from localStorage and render them
function getMessages() {
    const messages = JSON.parse(localStorage.getItem('messages'));
    if (!messages) return;
    messages.forEach(message => {
        addMessage(message.author, message.message, message.timestamp, message.id);
    });
}

// render them on load
// getMessages();