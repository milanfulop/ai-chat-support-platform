const createNewApi = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/create-new-api', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
    }
};

export default createNewApi;