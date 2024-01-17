const createNewBot = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/create-new-bot', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error checking authentication:', error);
    }
};

export default createNewBot;