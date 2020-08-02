const BASE_URL = 'http://localhost:8081';

async function getCity(city, state, country) {

    try {
        const response = await fetch(`${BASE_URL}/city`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city, state, country}),
        });

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}

export {
    getCity,
}