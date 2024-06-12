const tokenUtil= require('./Utils/getToken');
const jsonUtil = require('./Utils/getJSON');

async function runApp() {
    const { token, name, tag, region } = tokenUtil.getParams();

    if (token && name && tag && region) {
        const json = await jsonUtil.getJSON(token, region, name, tag);
        
        const information = extractInformation(json);
        
        if (information) {
            const text = `Rango Actual: ${information.currenttierpatched} | MMR Actual: ${information.ranking_in_tier} RR | Ultimo RR: ${information.mmr_change_to_last_game} | Elo: ${information.elo}`;
            console.log(text);
            
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