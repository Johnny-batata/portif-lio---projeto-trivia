import React from 'react';
import FetchApi from '../services/fetchApi';
// import FetchApi from '../services/fetchApi';
import '../App.css';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      perguntas: [],
      indice: 0,
      disable: false,
      timer: 30,
    };
    this.updtadeQuestions = this.updtadeQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.timer = this.timer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clearStyles = this.clearStyles.bind(this);
  }

  componentDidMount() {
    FetchApi().then((data) => this.updtadeQuestions(data));
    this.timer();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) setTimeout(() => { this.nextQuestion(); }, 5000);
    // if (timer === 0) this.nextQuestion();
  }

  nextQuestion() {
    this.setState((prev) => ({ indice: prev.indice + 1 }));
    this.setState(() => ({ timer: 30 }));
    this.setState({ disable: false });
    this.clearStyles();
  }

  clearStyles() {
    const buttons = document.querySelectorAll('.default');
    buttons.forEach((button) => {
      button.classList.remove('green-border');
      button.classList.remove('red-border');
    });
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
    // console.log(buttons);
  }

  regress() {
    return this.setState((prev) => ({ timer: prev.timer - 1 }));
  }

  timer() {
    const { timer } = this.state;
    const MS = 1000;
    const intervalo = setInterval(() => { this.regress(); }, MS);
    // if (timer === 0) return clearInterval(intervalo);
  }

  renderQuestions() {
    const { perguntas, indice, disable, timer } = this.state;
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
        <p>{ timer }</p>
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
