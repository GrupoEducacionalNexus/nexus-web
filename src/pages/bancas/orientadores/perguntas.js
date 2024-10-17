// src/pages/bancas/orientadores/perguntas.js
export const getPerguntas = [
    {
        numeroPergunta: 1,
        textoPergunta: 'O título do projeto reflete o estudo a ser realizado',
        nomeEstadoResposta: 'titulo_projeto',
        nomeEstadoResumo: 'resumoQ1',
    },
    {
        numeroPergunta: 2,
        textoPergunta: 'A pergunta condutora está explicitada?',
        nomeEstadoResposta: 'pergunta_condutora',
        nomeEstadoResumo: 'resumoQ2',
    },
    {
        numeroPergunta: 3,
        textoPergunta: 'A hipótese do estudo está claramente definida?',
        nomeEstadoResposta: 'hipotese',
        nomeEstadoResumo: 'resumoQ3',
    },
    {
        numeroPergunta: 4,
        textoPergunta: 'A fundamentação teórica está bem estruturada?',
        nomeEstadoResposta: 'fundamentacao_teorica',
        nomeEstadoResumo: 'resumoQ4',
    },
    {
        numeroPergunta: 5,
        textoPergunta: 'Os objetivos estão claramente definidos?',
        nomeEstadoResposta: 'objetivo',
        nomeEstadoResumo: 'resumoQ5',
    },
    {
        numeroPergunta: 6,
        textoPergunta: 'O método proposto é adequado para o estudo?',
        nomeEstadoResposta: 'metodo',
        nomeEstadoResumo: 'resumoQ6',
    },
    {
        numeroPergunta: 7,
        textoPergunta: 'O cronograma está viável para o desenvolvimento do projeto?',
        nomeEstadoResposta: 'cronograma',
        nomeEstadoResumo: 'resumoQ7',
    },
    {
        numeroPergunta: 8,
        textoPergunta: 'Conclusão da avaliação',
        nomeEstadoResposta: 'conclusao_avaliacao',
        nomeEstadoResumo: 'resumoQ8',
        opcoes: [
            'APROVADO SEM MODIFICAÇÕES',
            'APROVADO COM NECESSIDADE DE OBSERVAR AS ALTERAÇÕES SUGERIDAS E LIBERAÇÃO DO ORIENTADOR',
            'ENCAMINHADO PARA NOVA QUALIFICAÇÃO DE PROJETO APÓS OBSERVADAS AS ALTERAÇÕES SUGERIDAS COM OS MESMOS COMPONENTES DA BANCA QUE FEZ A AVALIAÇÃO INICIAL',
        ],
    },
];
