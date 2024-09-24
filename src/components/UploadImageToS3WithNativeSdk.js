// src/components/UploadImageToS3WithNativeSdk.js
import React, { useState } from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET = 'gestor-administrativo';
const REGION = 'us-east-1';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const UploadImageToS3WithNativeSdk = (props) => {

    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [link, setLink] = useState("");

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: `enber/eventos/anexos/` + file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
                console.log(`https://gestor-administrativo.s3.amazonaws.com/enber/eventos/anexos/${file.name}`);
                console.log(`https://gestor-administrativo.s3.amazonaws.com/enber/eventos/anexos/${file.name}`);
            })
            .send((err) => {
                if (err) console.log(err);
                
            })
    }

    return <div>
        <p>Progresso de envio {progress}%</p>
        <hr/>
        <div class="custom-file mb-2">
            <input type="file" class="custom-file-input" id="customFile" onChange={handleFileInput}/>
            <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
        <div className='row text-center'>
            <div className='col-sm-12'>
                <button className='button' onClick={() => uploadFile(selectedFile)}> Enviar arquivo</button>
            </div>
        </div>
    </div>
}

export default UploadImageToS3WithNativeSdk;