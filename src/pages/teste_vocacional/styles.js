import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #000233;
  min-height: 100vh;
  color: #ffffff;

  .titulo {
    text-align:center;
    font-weight: bold;
  }

  .button {
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #000233;
    display: inline-block;
    cursor: pointer;
    color: #000233;
    font-family: Arial;
    font-size: 16px;
    padding: 4px 40px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
    font-weight: bold;
    margin-top: 10px;
  }

  .button:hover {
    background-color: #f9b800;
    color: #000233;
  }

  table.table-hover tbody tr:hover {
    background-color: #ffffff; 
  }
`;

export const Form = styled.form``;

export const FormContainer = styled.div`
  width: 600px;
  background: rgba(255, 255, 255, 0.08);
  padding: 20px;
  margin-top: 15px;
  margin-bottom: 20px;
  border-radius: 16px;

  
  @media only screen and (min-width: 320px) and (max-width: 725px) {
    width: 350px;
    .button {
      display: block;
      width: 100%;
    }
  }
  
  .msg {
    color: #c82333;
    margin-bottom: 16px;
    padding: 10px;
    border: 1px solid #c82333;
    width: 100%;
    text-align: center;
    font-weight: bold;
  }
`;
