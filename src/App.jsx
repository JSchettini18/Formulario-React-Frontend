import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    question: "Qual das opções abaixo não é um tipo de dado primitivo em JavaScript?",
    options: ["String", "Number", "Boolean", "Element"],
    answer: "Element"
  },
  {
    question: "Qual das tags abaixo é utilizada para renderizar um componente React?",
    options: ["<render>", "<component>", "<div>", "<jsx>"],
    answer: "<div>"
  },
  {
    question: "Como se define um estado em um componente funcional?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    answer: "useState"
  },
  {
    question: "O que o hook `useEffect` faz em um componente React?",
    answer: "Permite realizar efeitos colaterais em componentes funcionais"
  },
  {
    question: "Qual é a função do Virtual DOM no React?",
    options: ["Manipular o DOM diretamente", "Melhorar a performance", "Atualizar o DOM automaticamente", "Interagir com a API REST"],
    answer: "Melhorar a performance"
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="app-container">
      <h1>Questionário de FrontEnd</h1>
      {currentPage === 0 && (
        <div>
          <label>
            Nome:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Matrícula:
            <input type="text" value={registration} onChange={(e) => setRegistration(e.target.value)} />
          </label>
          <button onClick={handleNextPage}>Iniciar Questionário</button>
        </div>
      )}
      {currentPage > 0 && currentPage <= questions.length && (
        <div>
          <h2>{questions[currentPage - 1].question}</h2>
          {questions[currentPage - 1].options ? (
            questions[currentPage - 1].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question-${currentPage}`}
                  value={option}
                  onChange={() => handleAnswerChange(currentPage - 1, option)}
                />
                {option}
              </label>
            ))
          ) : (
            <textarea
              value={answers[currentPage - 1] || ""}
              onChange={(e) => handleAnswerChange(currentPage - 1, e.target.value)}
            />
          )}
          {currentPage < questions.length ? (
            <button onClick={handleNextPage}>Próxima</button>
          ) : (
            <button onClick={handleSubmit}>Enviar</button>
          )}
        </div>
      )}
      {submitted && (
        <div className="feedback">
          <h2>Feedback:</h2>
          {questions.map((q, index) => (
            <div key={index}>
              <p>{q.question}</p>
              <p>
                Sua resposta: {answers[index] || "Nenhuma resposta"}
                <br />
                {answers[index] === q.answer ? (
                  <span className="correct">Correto!</span>
                ) : (
                  <span className="incorrect">Incorreto. Resposta correta: {q.answer}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
