async function getQueryParam(parameterName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterName);
}

async function getParams() {
    const token = getQueryParam('api_key');
    const name = getQueryParam('name');
    const tag = getQueryParam('tag');
    const region = getQueryParam('region');
    
    return { token, name, tag, region };
}

module.exports = {
    getParams
}