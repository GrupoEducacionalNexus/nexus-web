// DocumentFooter.js
import React from 'react';
import RODAPE1 from '../../../assets/rodape1.png';
import RODAPE2 from '../../../assets/rodape2.png';
import RODAPE3 from '../../../assets/rodape3.png';
import RODAPE4 from '../../../assets/rodape4.png';

const DocumentFooter = () => (
    <>
        <div className="row" style={{ marginTop: '80px' }}>
            <div className="col-sm-6">
                <p style={{ fontSize: '8pt' }}>
                    Register at the Secretary of State of Florida - USA P19000042160 - EIN# 38-4120047
                    Section 1005.06 (1)(f). Florida Commission for Independent Education
                </p>
            </div>
            <div className="col-sm-6 d-flex justify-content-center">
                <img style={{ width: '50px', height: '50px' }} src={RODAPE1} alt="Rodapé 1" />
                <img style={{ width: '50px', height: '50px' }} src={RODAPE2} alt="Rodapé 2" />
                <img style={{ width: '50px', height: '50px' }} src={RODAPE3} alt="Rodapé 3" />
                <img style={{ width: '120px', height: '40px' }} src={RODAPE4} alt="Rodapé 4" />
            </div>
        </div>
        <p className="text-center mt-3" style={{ fontSize: '9pt' }}>
            7350 FUTURES DRIVE • ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.: +1 (321) 300-9710
        </p>
    </>
);

export default DocumentFooter;
