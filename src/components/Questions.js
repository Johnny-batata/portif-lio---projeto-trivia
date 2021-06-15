import React from 'react';
import FetchApi from '../services/fetchApi';
// import FetchApi from '../services/fetchApi';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      perguntas: [],
      indice: 2,
    };
    this.updtadeQuestions = this.updtadeQuestions.bind(this);
  }

  componentDidMount() {
    FetchApi().then((data) => this.updtadeQuestions(data));
  }

  updtadeQuestions(perguntas) {
    this.setState({ perguntas: perguntas.results });
  }

  render() {
    const { perguntas, indice } = this.state;
    if (perguntas.length < 1) return <p>Carregando...</p>;
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
        <p>teste</p>
      </div>
    );
  }
}

export default Questions;
