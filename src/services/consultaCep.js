const consultaCep = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson
      } catch (error) {
        console.log(error);
      }
    }
  }

export {consultaCep};
