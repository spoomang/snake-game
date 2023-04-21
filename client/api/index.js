async function callAPI(request) {
    const { path, urlParamMap } = request;

    let urlParamString = '';
    for (const property in urlParamMap) {
        urlParamString += `${property}=${urlParamMap[property]}&`;
      }
      

    try {
        const response = await fetch(`http://localhost:8080/${path}?${urlParamString}`);
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