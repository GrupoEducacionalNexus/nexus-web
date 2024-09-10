import AWS from 'aws-sdk';

const S3_BUCKET = 'gestor-administrativo';
const REGION = 'us-east-1';

AWS.config.update({
    accessKeyId: 'AKIAWH3VX2V54PRTMJFO',
    secretAccessKey: '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',
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

const uploadFile = (file, path, onProgress) => { 
    localStorage.removeItem("@link");

    const btnCadastrarAnexo = document.getElementById("btnCadastrarAnexo");
    if (btnCadastrarAnexo) btnCadastrarAnexo.style.display = "none";

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: path + file.name,
    };

    myBucket.putObject(params, (err, data) => {
        if (err) {
            console.error("Erro ao fazer upload:", err);
            return;
        }
        localStorage.setItem('@link', JSON.stringify(`https://${params.Bucket}.s3.amazonaws.com/${params.Key}`));
    }).on('httpUploadProgress', ({ loaded, total }) => {
        const percentCompleted = Math.round((loaded * 100) / total);
        
        if (onProgress) {
            onProgress(percentCompleted);
        }

        const progresso = document.getElementById("progresso");
        if (progresso) {
            progresso.textContent = `${percentCompleted}%`;
            progresso.style.width = `${percentCompleted}%`;

            if (percentCompleted === 100) {
                setTimeout(() => {
                    if (btnCadastrarAnexo) btnCadastrarAnexo.style.display = "block";
                }, 5000);
            }
        }
    });
};

export { uploadFile };
