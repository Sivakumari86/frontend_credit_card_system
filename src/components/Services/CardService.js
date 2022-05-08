const axios = require('axios');

export async function getAllCards() {

    try{
        const response = await axios.get('/credit/cards');
        console.log('response  ', response)
        return response.data;
    }catch(error) {
        return [];
    }
    
}

export async function createUser(data) {
    const response = await axios.post(`/credit/addCard`, {user: data});
    return response.data;
}