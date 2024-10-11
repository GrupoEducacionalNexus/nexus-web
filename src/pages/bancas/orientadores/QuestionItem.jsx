// QuestionItem.js
import React from 'react';

const QuestionItem = ({
    number,
    question,
    answer,
    resumo,
    options = ['SIM', 'PARCIALMENTE', 'NÃO'],
    isSuggestion = false,
}) => (
    <>
        <p>{`${number} - ${question}`}</p>
        {options.map((option) => (
            <p key={option}>
                {answer === option ? '(X)' : '()'} {option}
            </p>
        ))}
        <p>{isSuggestion ? 'Sugestão' : 'Resumo'}: {resumo}</p>
    </>
);

export default QuestionItem;
