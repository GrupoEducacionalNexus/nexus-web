import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #00923e;
  min-height: 100vh;
  
  .img-usuario {
    margin-top: 140px;
  }

  .titulo {
    color: #fd7d14;
  }

  #link {
    color: red;
    text-align: center;
    display: none;
  }
`;

export const Form = styled.form`
  width: 800px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 8px 8px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-top: 80px;
  margin-bottom: 30px;

  .msg {
    color: #c82333;
    margin-bottom: 16px;
    padding: 10px;
    border: 1px solid #c82333;
    width: 100%;
    text-align: center;
    font-weight: bold;
  }

  @media only screen and (min-width: 320px) and (max-width: 725px) {
    width: 300px;
  }
`;

export const Img = styled.div`
  text-align: center;
  img {
    margin: 10px 0px 30px;
  }
`;
