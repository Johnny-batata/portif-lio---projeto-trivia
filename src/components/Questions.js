import React from 'react';
// import FetchApi from '../services/fetchApi';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      perguntas: JSON.parse(localStorage.getItem('questions')).results,
      indice: 2,
    };
  }

  componentDidMount() {
    // const perguntas = JSON.parse(localStorage.getItem('questions'));
    // this.setState({ perguntas: perguntas.result });
  }

  render() {
    const { perguntas, indice } = this.state;
    return (
      <div>
        <p data-testid="question-category">{`Categoria ${perguntas[indice].category}`}</p>
        <p data-testid="question-text">{`Pergunta: ${perguntas[indice].question}`}</p>
        <button type="button" data-testid="correct-answer">
          {`Resposta1: ${perguntas[indice].correct_answer}`}
        </button>
        <button type="button" data-testid={ `wrong-answer-${0}` }>
          {`Resposta2: ${perguntas[indice].incorrect_answers[0]}`}
        </button>
        <button type="button" data-testid={ `wrong-answer-${1}` }>
          {`Resposta3: ${perguntas[indice].incorrect_answers[1]}`}
        </button>
        <button type="button" data-testid={ `wrong-answer-${2}` }>
          {`Resposta4: ${perguntas[indice].incorrect_answers[2]}`}
        </button>
      </div>
    );
  }
}

export default Questions;
