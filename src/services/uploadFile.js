import AWS from 'aws-sdk'

const S3_BUCKET = 'gestor-administrativo';
const REGION = 'us-east-1';

AWS.config.update({
    accessKeyId: 'AKIAWH3VX2V54PRTMJFO',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const uploadFile = (file, path) => { 
    localStorage.removeItem("@link");
    const btnCadastrarAnexo = document.getElementById("btnCadastrarAnexo");
    btnCadastrarAnexo.style.display = "none";

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: path + file.name
    };

    myBucket.putObject(params, (err, data) => {
        localStorage.setItem('@link', JSON.stringify(`https://${params.Bucket}.s3.amazonaws.com/${params.Key}`))
    }).on('httpUploadProgress', ({ loaded, total }) => {

        const progresso = document.getElementById("progresso");
        progresso.textContent = `${Math.round(100 * loaded / total)}%`;
        progresso.style.width = `${Math.round(100 * loaded / total)}%`;

        if (Math.round(100 * loaded / total) === 100) {
            setTimeout(() => {
                btnCadastrarAnexo.style.display = "block";
            }, 5000)
            return;
        }
    })
}

export { uploadFile };