// FichaDeAvaliacao.js
import React from 'react';
import DocumentHeader from './DocumentHeader';
import DocumentFooter from './DocumentFooter';

const FichaDeAvaliacao = (props) => {
    const {
        nome,
        id_curso,
        areaConcentracao,
        linha_pesquisa,
        titulo_teseOuDissertacao,
        orientador,
        membro_interno,
        titulo_projeto,
        resumoQ1,
        pergunta_condutora,
        resumoQ2,
        hipotese,
        resumoQ3,
        fundamentacao_teorica,
        resumoQ4,
        objetivo,
        resumoQ5,
        metodo,
        resumoQ6,
        cronograma,
        resumoQ7,
        conclusao_avaliacao,
        resumoQ8,
        dataFichaAvaliacaoPtBr,
        assinatura_presidente,
        Logo_ATA
    } = props;

    return (
        <div id="ficha_avaliacao" className='page'>
            <DocumentHeader src={Logo_ATA} />
            <h6 className='text-center font-weight-bold'>IVY ENBER CHRISTIAN UNIVERSITY</h6>
            <h6 className='text-center font-weight-bold mb-3'>FICHA DE AVALIAÇÃO DA QUALIFICAÇÃO DO PROJETO</h6>

            <p>ALUNO(A): {this.state.nome}</p>
            <p>NÍVEL:  {this.state.id_curso === 1 || this.state.id_curso === 3 ? `(x) MESTRADO  ( ) DOUTORADO}` : `( ) MESTRADO  (x) DOUTORADO`}</p>
            <p>ÁREA DE CONCENTRAÇÃO: {this.state.areaConcentracao}</p>
            <p>LINHA DE PESQUISA: {this.state.linha_pesquisa}</p>
            <p>TÍTULO DO PROJETO DE DISSERTAÇÃO/TESE: {this.state.titulo_teseOuDissertacao}</p>
            <p>ORIENTADOR(A): {this.state.orientador}</p>
            <p>AVALIADOR(A): {this.state.membro_interno}</p>
            <p>{this.state.membro_interno}</p>

            <p>1 - O título do projeto reflete o estudo a ser realizado</p>
            <p>{this.state.titulo_projeto === "SIM" ? "(X)" : "()"} SIM</p>
            <p>{this.state.titulo_projeto === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
            <p>{this.state.titulo_projeto === "NÃO" ? "(X)" : "()"} NÃO</p>
            <p>Resumo: {this.state.resumoQ1}</p>

            <p>2 - A pergunta condutora está explicitada?</p>
            <p>{this.state.pergunta_condutora === "SIM" ? "(X)" : "()"} SIM</p>
            <p>{this.state.pergunta_condutora === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
            <p>{this.state.pergunta_condutora === "NÃO" ? "(X)" : "()"} NÃO</p>

            <p>Resumo: {this.state.resumoQ2}</p>

            <p>3 - A hipótese (não responder quando o desenho do estudo não couber a formulação de hipótese) está
                redigida de forma clara e o estudo proposto permite testá-la?</p>
            <p>{this.state.hipotese === "SIM" ? "(X)" : "()"} SIM</p>
            <p>{this.state.hipotese === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
            <p>{this.state.hipotese === "NÃO" ? "(X)" : "()"} NÃO</p>

            <p>Resumo: {this.state.resumoQ3}</p>

            <p>4 - A fundamentação teórica e empírica (revisão da literatura) dá sustentação ao estudo tanto nos aspectos
                teóricos quanto metodológicos?</p>

            <p>7350 FUTURES DRIVE •
                ORLANDO • FL 32819 WWW.ENBER.EDUCATION • TEL.:
                +1 (321) 300-9710</p>

            <p>{this.state.fundamentacao_teorica === "SIM" ? "(X)" : "()"} SIM</p>
            <p>{this.state.fundamentacao_teorica === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
            <p>{this.state.fundamentacao_teorica === "NÃO" ? "(X)" : "()"} NÃO</p>

            <p>Sugestão: {this.state.resumoQ4}</p>

            <p>5 - Os objetivos estão redigidos de forma clara e poderão ser atingidos a partir do estudo empírico
                delineado?</p>
            <p>{this.state.objetivo === "SIM" ? "(X)" : "()"} SIM</p>
            <p>{this.state.objetivo === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
            <p>{this.state.objetivo === "NÃO" ? "(X)" : "()"} NÃO</p>

            <p>Sugestão: {this.state.resumoQ5}</p>

            <p>6 - O método contempla os passos necessários para garantir a validação interna da pesquisa?</p>
            <p>{this.state.metodo === "SIM" ? "(X)" : "()"} SIM</p>
            <p>{this.state.metodo === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
            <p>{this.state.metodo === "NÃO" ? "(X)" : "()"} NÃO</p>

            <p>Sugestão: {this.state.resumoQ6}</p>

            <p>7 - O cronograma proposto é compatível com a proposta?</p>
            <p>{this.state.cronograma === "SIM" ? "(X)" : "()"} SIM</p>
            <p>{this.state.cronograma === "PARCIALMENTE" ? "(X)" : "()"} PARCIALMENTE</p>
            <p>{this.state.cronograma === "NÃO" ? "(X)" : "()"} NÃO</p>

            <p>Sugestão: {this.state.resumoQ7}</p>

            <p>7 - CONCLUSÃO DA AVALIAÇÃO</p>

            <p>{this.state.conclusao_avaliacao === "APROVADO SEM MODIFICAÇÕES" ? "(X)" : "()"} APROVADO SEM MODIFICAÇÕES</p>
            <p>{this.state.conclusao_avaliacao === "APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E LIBERAÇÃO DO ORIENTADOR" ? "(X)" : "()"} APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E
                LIBERAÇÃO DO ORIENTADOR</p>
            <p>{this.state.conclusao_avaliacao === "ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A AVALIAÇÃO INICIAL" ? "(X)" : "()"} ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS
                ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENETES DA BANCA QUE FEZ A
                AVALIAÇÃO INICIAL</p>

            <p>Sugestão: {this.state.resumoQ8}</p>

            <p>7350 FUTURES DRIVE •
                ORLANDO • FL 32819 WWW.ENBERUNIVERSITY.COM • TEL.:
                +1 (321) 300-9710</p>

            <p>Orientações:</p>
            <p>A orientanda terá o tempo de 20 min para fazer a sua exposição da sua pesquisa
                Cada um dos membros da banca terá 20 min para fazer as suas considerações a respeito do texto enviado
                para avaliação;</p>
            <p>Em seguida, a banca reunir-se á em uma outra sala do Meet a fim de que possa redigir o seu parecer final
                referente a qualificação/defesa.</p>
            <p>Link do Meet: meet.google.com/hvf-khsa-cfq</p>

            <p>ENCAMINHADO A COORDENAÇÃO / COLEGIADO PARA PROVIDÊNCIAS ADMINISTRATIVAS
                CABÍVEIS</p>

            <p>Orlando Flórida, {this.state.dataFichaAvaliacaoPtBr}</p>

            <hr />
            <div className="row mt-5 text-center">
                <div className="col border-bottom border-dark  mr-1">
                    <img className="img-fluid" src={this.state.assinatura_presidente} />
                </div>

            </div>

            <p className='text-center'>Assinatura do Examinador</p>
            <DocumentFooter />
        </div>
    );
};

export default FichaDeAvaliacao;
