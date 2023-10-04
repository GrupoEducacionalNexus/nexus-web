const uuid = () => {
    return Date.now().toString().substring(16, 20) + Math.random().toString().substring(10);
}

export {uuid}