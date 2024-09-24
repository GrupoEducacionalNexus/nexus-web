// src/services/uploadFile.js
import AWS from 'aws-sdk';

// Função para upload de arquivo
export const uploadFile = async (file, path, onProgress) => {
    try {
        const S3_BUCKET = 'gestor-administrativo';
        const REGION = 'us-east-1';

        AWS.config.update({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        });

        const myBucket = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: `${path}${file.name}`,
        };

        return new Promise((resolve, reject) => {
            myBucket
                .putObject(params)
                .on('httpUploadProgress', (evt) => {
                    const percentCompleted = Math.round((evt.loaded * 100) / evt.total);
                    onProgress(percentCompleted);
                })
                .send((err, data) => {
                    if (err) {
                        reject(err);
                        console.error('Erro ao enviar o anexo:', err);
                    } else {
                        const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${params.Key}`;
                        resolve(fileUrl);
                        console.log('Arquivo enviado com sucesso:', data, fileUrl);
                    }
                });
        });
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        throw error;
    }
};

// Função para deletar arquivo no S3
// export const deleteFile = async (fileKey) => {
//     try {
//         const S3_BUCKET = 'gestor-administrativo';
//         const REGION = 'us-east-1';

//         AWS.config.update({
//             accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//         });

//         const myBucket = new AWS.S3({
//             params: { Bucket: S3_BUCKET },
//             region: REGION,
//         });

//         const params = {
//             Bucket: S3_BUCKET,
//             Key: fileKey, // Nome do arquivo completo que será deletado
//         };

//         return new Promise((resolve, reject) => {
//             myBucket.deleteObject(params, (err, data) => {
//                 if (err) {
//                     console.error('Erro ao deletar arquivo:', err);
//                     reject(err);
//                 } else {
//                     console.log('Arquivo deletado com sucesso:', data);
//                     resolve(data);
//                 }
//             });
//         });
//     } catch (error) {
//         console.error('Erro ao deletar arquivo:', error);
//         throw error;
//     }
// };

