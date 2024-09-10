import AWS from 'aws-sdk';
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
                    } else {
                        const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${params.Key}`;
                        resolve(fileUrl);
                    }
                });
        });
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        throw error;
    }
};
