function getQueryParam(parameterName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterName);
}

async function getToken() {
    const token = getQueryParam('api_key');
    const name = getQueryParam('name');
    const tag = getQueryParam('tag');
    const region = getQueryParam('region');
    
    return { token, name, tag, region };
}

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

async function runApp() {
    const { token, name, tag, region } = await getToken();

    if (token && name && tag && region) {
        const json = await getJSON(token, region, name, tag);
        
        const information = extractInformation(json);
        
        if (information) {
            const text = `Rango Actual: ${information.currenttierpatched} | MMR Actual: ${information.ranking_in_tier} RR | Ultimo RR: ${information.mmr_change_to_last_game} | Elo: ${information.elo}`;
                        
            const textElement = document.getElementById('valorantText');
            if (textElement) {
                textElement.innerText = text;
            }
        } else {
            console.log('No se pudo extraer la información necesaria del JSON.');
        }
    } else {
        console.log('Faltan parámetros en la URL.');
    }
}

function extractInformation(json) {
    if (!json || !json.data) {
        return null;
    }

    const { ranking_in_tier, currenttierpatched, mmr_change_to_last_game, elo } = json.data;
    
    return { ranking_in_tier, currenttierpatched, mmr_change_to_last_game, elo };
}

runApp();
