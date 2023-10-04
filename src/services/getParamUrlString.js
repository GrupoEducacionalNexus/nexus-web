const getParamUrlString = (param) => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let data = url.searchParams.get(param);
    return data;
}

export { getParamUrlString }