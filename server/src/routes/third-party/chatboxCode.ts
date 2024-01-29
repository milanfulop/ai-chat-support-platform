const code = `
    var chatHistoryLength = 4;

    // chatbox container styles
    const chatboxElement = document.createElement('div');
    Object.assign(chatboxElement.style, {
        position: 'fixed',
        bottom: '75px',
        right: '25px',
        width: '350px',
        height: '500px',
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'none'
    });

    // message list styles (ul element)
    const messageList = document.createElement('ul');
    Object.assign(messageList.style, {
        listStyleType: 'none',
        margin: '0',
        padding: '10px',
        overflowY: 'auto',
        minHeight: '415px',
    });

    // user text input element styles
    const userInput = document.createElement('input');
    Object.assign(userInput.style, {
        width: '65%',
        padding: '10px',
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
        marginLeft: '2%',
    });

    // styles for the button to send the message
    const sendButton = document.createElement('button');
    Object.assign(sendButton.style, {
        width: '23%',
        padding: '10px',
        marginLeft: '2%',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        cursor: 'pointer',
    });

    // styles for the container of input and button
    const inputContainer = document.createElement('div');
    Object.assign(inputContainer.style, {
        display: 'flex',
        margin: '10px',
    });

    // styles for the icon button that toggles chat visibility
    const chatIconButton = document.createElement('div');
    Object.assign(chatIconButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        backgroundColor: '#4CAF50',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '18px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    });

    // set the text content for elements
    chatIconButton.textContent = '💬';
    userInput.placeholder='Type a message';
    sendButton.textContent = 'Send';

    inputContainer.append(userInput, sendButton);
    chatboxElement.append(inputContainer);
    chatboxElement.append(messageList, userInput, sendButton);
    document.body.append(chatboxElement);
    document.body.appendChild(chatIconButton);

    const chatMessages = [];

    const url = new URL(document.currentScript.getAttribute('src'));
    const scriptParams = Object.fromEntries(url.searchParams);

    // add an event listener to the button to send messages
    sendButton.addEventListener('click', () => {
        const messageText = userInput.value.trim();
        if (messageText !== '') {
            sendMessage('User', messageText);
            callAi(); // Send the message to the AI
            userInput.value = ''; // clear the input field after sending the message
        }
    });

    let chatboxVisible = false;

    function toggleChatbox() {
        chatboxElement.style.display = chatboxVisible ? 'none' : 'block';
        chatboxVisible = !chatboxVisible;
    }

    chatIconButton.addEventListener('click', toggleChatbox);

    // function to add a message to the message list
    function sendMessage(sender, content) {
        const messageItem = document.createElement('li');
        messageItem.textContent = \`\${sender}: \${content}\`;
        messageList.appendChild(messageItem);

        chatMessages.push(\`\${sender}: \${content}\`);

        // max length of the chat history
        if (chatMessages.length > chatHistoryLength) {
            chatMessages.shift();
        }

        // scroll to the bottom of the message list to show the latest message
        messageList.scrollTop = messageList.scrollHeight;
    }

    // function to call the AI endpoint with the user's message
    async function callAi() {
        try {
            const response = await fetch(\`http://localhost:5001/api/send-chat-message?botId=\${scriptParams.botId}\`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // set the Content-Type header
                },
                body: JSON.stringify({
                    chatHistory: chatMessages,
                }),
            });

            if (response.ok) {
                const aiResponse = await response.json();
                sendMessage(aiResponse.botName, aiResponse.message); // display AI response in the chat
            } else {
                console.error('Error calling AI endpoint:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
`;

export default code;
