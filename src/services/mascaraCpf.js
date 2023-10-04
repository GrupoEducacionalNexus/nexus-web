const handleCpf = async (e) => {
    console.log(e);
    let str = await e.replace(/[^\d]/g, "").slice(0, 11);
    return await str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export { handleCpf }