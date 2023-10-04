const handleMoeda = async (valor) => {
    
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor === 'NaN') valor = '';

    return valor;
}

export { handleMoeda };