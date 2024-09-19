function ChartBot(props,season) {
    // console.log(season);
    // console.log(props);
    const chartText = `in our area the season is ${season}  tempreature is ${props.current.temp_c}c, uv index ${props.current.uv} and humedity ${props.current.humidity} in this weather condition which crops are perfect to grow`
    const url = 'https://custom-chatbot-api.p.rapidapi.com/chatbotapi';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'af277767f3msh989911cf5208f00p136707jsn8d48f60452f6',
            'x-rapidapi-host': 'custom-chatbot-api.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bot_id: 'OEXJ8qFp5E5AwRwymfPts90vrHnmr8yZgNE171101852010w2S0bCtN3THp448W7kDSfyTf3OpW5TUVefz',
            messages: [
                {
                    role: 'user',
                    content: chartText
                }
            ],
            user_id: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            model: 'gpt 3.5'
        })
    };

    async function chart() {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }

    }
    
    return chart();
}

export default ChartBot
