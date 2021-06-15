import React from 'react';
import FetchApi from '../services/fetchApi';
// import FetchApi from '../services/fetchApi';
import '../App.css';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      perguntas: [],
      indice: 2,
      disable: false,
    };
    this.updtadeQuestions = this.updtadeQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    FetchApi().then((data) => this.updtadeQuestions(data));
  }

  updtadeQuestions(perguntas) {
    this.setState({ perguntas: perguntas.results });
  }

  checkAnswer() {
    const buttons = document.querySelectorAll('.default');
    this.setState({
      disable: true,
    });

    buttons.forEach((button) => {
      if (button.name === 'correct-answer') {
        return button.classList.add('green-border');
      }
      return button.classList.add('red-border');
    });
    // buttons[0].classList.remove('default');
    // buttons[0].classList.add('red-border');
    // console.log(buttons);
  }

  renderQuestions() {
    const { perguntas, indice, disable } = this.state;
    return (
      <div>
        <p data-testid="question-category">{`Categoria ${perguntas[indice].category}`}</p>
        <p data-testid="question-text">{`Pergunta: ${perguntas[indice].question}`}</p>
        <button
          type="button"
          data-testid="correct-answer"
          name="correct-answer"
          disabled={ disable }
          className="default"
          onClick={ this.checkAnswer }
        >
          {`Resposta1: ${perguntas[indice].correct_answer}`}
        </button>
        <button
          type="button"
          data-testid={ `wrong-answer-${0}` }
          name="wrong-answer"
          disabled={ disable }
          className="default"
          onClick={ this.checkAnswer }
        >
          {`Resposta2: ${perguntas[indice].incorrect_answers[0]}`}
        </button>
        <button
          type="button"
          data-testid={ `wrong-answer-${1}` }
          name="wrong-answer"
          disabled={ disable }
          className="default"
          onClick={ this.checkAnswer }
        >
          {`Resposta3: ${perguntas[indice].incorrect_answers[1]}`}
        </button>
        <button
          type="button"
          data-testid={ `wrong-answer-${2}` }
          name="wrong-answer"
          disabled={ disable }
          className="default"
          onClick={ this.checkAnswer }
        >
          {`Resposta4: ${perguntas[indice].incorrect_answers[2]}`}
        </button>
        <p>teste</p>
      </div>
    );
  }

  render() {
    const { perguntas } = this.state;
    if (perguntas.length < 1) return <p>Carregando...</p>;
    return (
      this.renderQuestions()
    );
  }
}

export default Questions;
