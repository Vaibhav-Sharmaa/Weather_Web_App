export default async function handler(request, response) {
    const { city } = request.query;

    if (!city) {
        return response.status(400).json({ error: 'City is required' });
    }
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const weatherRes = await fetch(url);
        
        if (!weatherRes.ok) {
            return response.status(weatherRes.status).json({ error: 'City not found' });
        }
        const data = await weatherRes.json();
        return response.status(200).json(data);
    } catch (error) {
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}