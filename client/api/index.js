const baseUrl = 'http://localhost:8080';

async function callAPI(request) {
    const { path, urlParamMap, body } = request;

    let urlParamString = '';
    if (urlParamMap) {
        for (const property in urlParamMap) {
            urlParamString += `${property}=${urlParamMap[property]}&`;
        }
    }

    try {
        console.log('dasdasd', body);
        const response = await fetch(`${baseUrl}/${path}?${urlParamString}`, body);
        console.log('dasdasd', response);
        const jsonData = await response.json();
        return jsonData
    } catch (error) {
        console.log('error fetching.', error);
    }

    return null;
}

module.exports = {
    callAPI,
}