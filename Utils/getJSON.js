async function getJSON(token, region, name, tag) {
    const url = `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${name}/${tag}?api_key=${token}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        return null;
    }
}

module.s = {
    getJSON
}