import AWS from 'aws-sdk';

const S3_BUCKET = 'gestor-administrativo';
const REGION = 'us-east-1';

// Configure AWS com as variáveis de ambiente para segurança
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: REGION
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const uploadFile = (file, path, onProgress) => {
  return new Promise((resolve, reject) => {
    // Remove qualquer link anterior do localStorage
    localStorage.removeItem('@link');

    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: `${path}${file.name}`,
    };

    // Inicia o upload para o S3
    myBucket.putObject(params)
      .on('httpUploadProgress', (event) => {
        const percentComplete = Math.round((event.loaded * 100) / event.total);
        if (onProgress) {
          onProgress(percentComplete); // Atualiza a barra de progresso
        }
      })
      .send((err, data) => {
        if (err) {
          reject(err);
        } else {
          const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
          localStorage.setItem('@link', JSON.stringify(fileUrl)); // Salva o link do arquivo no localStorage
          resolve(fileUrl); // Resolve com o URL do arquivo
        }
      });
  });
};

export { uploadFile };
