const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const API_KEY = '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';
    const mytext = mytextInput.value.trim();

    if (mytext) {
        try {
            const engineId = 'text-davinci-004'; // Replace with your GPT-4 engine ID
            const response = await fetch(`https://api.openai.com/v1/engines/${engineId}/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    prompt: mytext,
                    temperature: 1.0,
                    max_tokens: 300, // You can adjust this
                    top_p: 0.7,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].text;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});
