import React, { useState } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';

const UploadForm = ({ onSubmit, onProgress }) => {
  const [arquivo, setArquivo] = useState(null);
  const [progressoUpload, setProgressoUpload] = useState(0);

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (arquivo) {
      onSubmit(arquivo, setProgressoUpload);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Escolha um arquivo</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      {progressoUpload > 0 && <ProgressBar now={progressoUpload} label={`${progressoUpload}%`} />}
      <Button variant="primary" type="submit">Salvar</Button>
    </Form>
  );
};

export default UploadForm;
