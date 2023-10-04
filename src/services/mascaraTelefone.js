const handleTelefone = async (e) => {
    let str = await e.replace(/[^0-9]/g, "").slice(0, 11);
    return await str.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1)$2-$3");
}

export {handleTelefone}