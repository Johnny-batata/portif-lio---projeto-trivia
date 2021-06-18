import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FetchApi from '../services/fetchApi';
import '../App.css';
import { enableDisable } from '../actions';
// import Timer from './Timer';

const LEVEL = 2;
const RAMDOM = 0.5;
const MIN_SCORE = 10;
const ONE_SECOND = 1000;
const TIME_TO_ANSWER = 5;
const NUMBER_OF_QUESTIONS = 5;
const CORRECT_ANSWER = 'correct-answer';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      perguntas: [],
      answers: [],
      assertions: 0,
      indice: 0,
      disable: props.disable,
      timer: 15,
      score: 0,
      isRedirect: false,
    };
    this.updtadeQuestions = this.updtadeQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.renderQuestions = this.renderQuestion.bind(this);
    this.timer = this.timer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clearStyles = this.clearStyles.bind(this);
    this.renderNextQuestionButton = this.renderNextQuestionButton.bind(this);
    this.freezedByTimer = this.freezedByTimer.bind(this);
    // this.calcDificult = this.calcDificcultyLevel.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.setAnswersProperties = this.setAnswersProperties.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    FetchApi().then((data) => this.updtadeQuestions(data));
    this.timer();
  }

  setAnswersProperties() {
    const { perguntas, indice } = this.state;
    const wrongAnswers = perguntas[indice].incorrect_answers.map((answer, index) => ({
      answer,
      name: 'wrong-answer',
      testid: `wrong-answer-${index}`,
    }));
    const answers = (
      [
        {
          answer: `${perguntas[indice].correct_answer} ## CORRETA ##`,
          name: CORRECT_ANSWER,
          testid: CORRECT_ANSWER,
        },
        ...wrongAnswers,
      ].sort(() => Math.random() - RAMDOM) // https://stackoverflow.com/questions/49555273/how-to-shuffle-an-array-of-objects-in-javascript
    );
    this.setState({
      answers,
    });
  }

  nextQuestion() {
    const { indice } = this.state;
    if (indice + 1 === NUMBER_OF_QUESTIONS) return this.setState({ isRedirect: true });
    this.setState((prev) => ({
      indice: prev.indice + 1,
      timer: TIME_TO_ANSWER,
      disable: false,
    }), () => this.setAnswersProperties());
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
    const dados = JSON.parse(localStorage.getItem('state'));
    this.setState({ perguntas: perguntas.results, score: dados.player.score },
      () => this.setAnswersProperties());
  }

  calcQuestionScore() {
    const { indice, perguntas } = this.state;
    const { timer } = this.props;

    let questionLevel = perguntas[indice].difficulty;
    if (questionLevel === 'hard') {
      questionLevel = LEVEL + 1;
    } else if (questionLevel === 'medium') {
      questionLevel = LEVEL;
    } else {
      questionLevel = LEVEL - 1;
    }
    const questionScore = MIN_SCORE + (timer * questionLevel);
    this.setState((prev) => ({
      score: prev.score + questionScore,
      assertions: prev.assertions + 1 }), () => this.updateLocalStorage());
  }

  updateLocalStorage() {
    const { score, assertions } = this.state;
    const dados = JSON.parse(localStorage.getItem('state'));

    const player = { player: {
      name: dados.player.name,
      assertions,
      score,
      gravatarEmail: dados.player.gravatarEmail,
    } };

    localStorage.setItem('state', JSON.stringify(player));
  }

  checkAnswer({ target: { name } }) {
    const buttons = document.querySelectorAll('.default');
    this.setState({
      disable: true,
    });

    buttons.forEach((button) => {
      if (button.name === CORRECT_ANSWER) {
        return button.classList.add('green-border');
      }
      return button.classList.add('red-border');
    });

    if (name === CORRECT_ANSWER) {
      this.calcQuestionScore();
    }
  }

  regress() {
    const { timer } = this.state;
    if (timer === 0) this.freezedByTimer();
    if (timer > 0) return this.setState((prev) => ({ timer: prev.timer - 1 }));
  }

  timer() {
    setInterval(() => { this.regress(); }, ONE_SECOND);
  }

  freezedByTimer() {
    return this.setState({ disable: true });
  }

  renderAnswers() {
    const { answers, disable } = this.state;
    return answers.map(({ answer, name, testid }, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ testid }
        name={ name }
        disabled={ disable }
        className="default"
        onClick={ this.checkAnswer }
      >
        { answer }
      </button>
    ));
  }

  renderQuestion() {
    const { perguntas, indice } = this.state;
    const { category, question } = perguntas[indice];
    return (
      <div>
        <p data-testid="question-category">{`Categoria ${category}`}</p>
        <p data-testid="question-text">{`Pergunta: ${question}`}</p>
        {this.renderAnswers()}
      </div>
    );
  }

  renderNextQuestionButton() {
    const { disable, timer } = this.state;
    if (disable || !timer) {
      return (
        <button
          type="button"
          disabled={ !disable }
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima pergunta
        </button>
      );
    }
  }

  render() {
    const { perguntas, isRedirect, timer } = this.state;
    if (perguntas.length < 1) return <p>Carregando...</p>;
    return (
      <div>
        { isRedirect && <Redirect to="/feedback" />}
        { this.renderQuestion() }
        { this.renderNextQuestionButton() }
        <p>{ timer }</p>
        {/* <Timer /> */}
      </div>
    );
  }
}

Questions.propTypes = {
  disable: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  // toggleEnable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  disable: state.controls.disable,
  timer: state.controls.timer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEnable: (value) => dispatch(enableDisable(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
