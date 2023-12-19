const code = `
    // Create the chatbox container
    const chatboxElement = document.createElement('div');
    chatboxElement.style.position = 'fixed';
    chatboxElement.style.bottom = '156px';
    chatboxElement.style.right = '32px'; // Adjusted to be at the bottom right
    chatboxElement.style.width = '400px';
    chatboxElement.style.backgroundColor = '#f0f0f0';
    chatboxElement.style.padding = '10px';
    chatboxElement.style.display = 'none'; // Initially hide the chatbox
    
    // Create the message list (ul element)
    const messageList = document.createElement('ul');
    messageList.style.listStyleType = 'none';
    messageList.style.margin = '0';
    messageList.style.padding = '0';
    messageList.style.overflowY = 'auto';
    messageList.style.maxHeight = '200px'; // Set a max height for the message list
    
    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.placeholder = 'Type a message...';
    userInput.style.width = '75%'; // Adjusted width
    userInput.style.padding = '5px';

    // Create a button to send the message
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.width = '20%'; // Adjusted width
    sendButton.style.padding = '5px';

    // Add styles for the container of input and button
    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.marginTop = '10px'; // Adjusted margin
    inputContainer.style.marginBottom = '10px'; // Adjusted margin

    // Append the text input and button to the input container
    inputContainer.appendChild(userInput);
    inputContainer.appendChild(sendButton);

    // Append the input container to the chatbox
    chatboxElement.appendChild(inputContainer);
    
    const chatMessages = [];
    
    const url = new URL(document.currentScript.getAttribute('src'));
    const scriptParams = Object.fromEntries(url.searchParams)

    // Add an event listener to the button to send messages
    sendButton.addEventListener('click', () => {
        const messageText = userInput.value.trim();
        if (messageText !== '') {
            sendMessage('User', messageText);
            callAi(); // Send the message to the AI
            userInput.value = ''; // Clear the input field after sending the message
        }
    });
    
    // Append the message list, text input, and button to the chatbox
    chatboxElement.appendChild(messageList);
    chatboxElement.appendChild(userInput);
    chatboxElement.appendChild(sendButton);
    
    // Append the chatbox to the body
    document.body.appendChild(chatboxElement);

    // Create the icon button to toggle chat visibility
    const chatIconButton = document.createElement('div');
    chatIconButton.style.position = 'fixed';
    chatIconButton.style.bottom = '32px'; // Adjusted to be above the chatbox
    chatIconButton.style.right = '32px';
    chatIconButton.style.width = '96px';
    chatIconButton.style.height = '96px';
    chatIconButton.style.backgroundColor = 'red';
    chatIconButton.style.backgroundSize = 'cover';
    chatIconButton.style.cursor = 'pointer';

    // Flag to track the chatbox visibility
    let chatboxVisible = false;

    // Toggle chatbox visibility function
    function toggleChatbox() {
        chatboxElement.style.display = chatboxVisible ? 'none' : 'block';
        chatboxVisible = !chatboxVisible;
    }

    // Add click event listener to the icon button
    chatIconButton.addEventListener('click', toggleChatbox);

    // Append the icon button to the body
    document.body.appendChild(chatIconButton);

    // Function to add a message to the message list
    function sendMessage(sender, content) {
        const messageItem = document.createElement('li');
        messageItem.textContent = \`\${sender}: \${content}\`;
        messageList.appendChild(messageItem);

        chatMessages.push(\`\${sender}: \${content}\`)

        //max length of the chat history
        if(chatMessages.length > 4) {
            chatMessages.shift();
        }
    
        // Scroll to the bottom of the message list to show the latest message
        messageList.scrollTop = messageList.scrollHeight;
    }
    
    // Function to call the AI endpoint with the user's message
    async function callAi() {
        try {
            const response = await fetch('http://localhost:5001/api/send-chat-message?botId='+scriptParams.botId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
                body: JSON.stringify({
                    chatHistory: chatMessages,
                }),
            });
    
            if (response.ok) {
                const aiResponse = await response.json();
                sendMessage(aiResponse.botName, aiResponse.message); // Display AI response in the chat
            } else {
                console.error('Error calling AI endpoint:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
`;

export default code;
