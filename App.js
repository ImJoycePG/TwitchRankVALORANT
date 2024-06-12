const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/rango', async (req, res) => {
    const apiKey = req.query.api_key;
    const name = req.query.name;
    const tag = req.query.tag;
    const region = req.query.region;

    const url = `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${name}/${tag}?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const { currenttierpatched, ranking_in_tier, mmr_change_to_last_game, elo } = data.data;
        const text = `Rango Actual: ${currenttierpatched} | RR Actual: ${ranking_in_tier} RR | Ultimo RR: ${mmr_change_to_last_game} | Elo: ${elo}`;
        res.send(text);
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        res.status(500).send('Error al obtener datos de la API');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor intermedio en funcionamiento en el puerto ${PORT}`);
});
