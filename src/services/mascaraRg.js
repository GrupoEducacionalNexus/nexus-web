const handleRg = async (e) => {
    e=e.replace(/\D/g,"");
    e=e.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/,"$1.$2.$3-$4");
    return e;
}

export {handleRg}