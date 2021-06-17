import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FetchImageGravatar from '../services/fetchImageGravatar';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      score: 0,
      name: '',
      assertions: 0,
    };
    this.updateState = this.updateState.bind(this);
    this.header = this.header.bind(this);
    this.scoreFeedback = this.scoreFeedback.bind(this);
    this.createRanking = this.createRanking.bind(this);
  }

  componentDidMount() {
    const name = JSON.parse(localStorage.getItem('state'));
    // console.log(name);
    this.updateState(name);
  }

  createRanking() {
    const { url, score, name } = this.state;
    const recovery = JSON.parse(localStorage.getItem('ranking')) || [];

    const ranking = {
      name,
      score,
      picture: url,
    };

    recovery.push(ranking);
    recovery.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(recovery));
  }

  async updateState(name) {
    await FetchImageGravatar(name.player.gravatarEmail)
      .then((data) => this.setState({ url: data }));
    this.setState({ score: name.player.score });
    this.setState({ name: name.player.name });
    this.setState({ assertions: name.player.assertions });
  }

  scoreFeedback() {
    const { assertions } = this.state;
    const THREE = 3;
    if (assertions < THREE) {
      return (
        <p data-testid="feedback-text">
          Podia ser melhor...
        </p>
      );
    }
    return (
      <p data-testid="feedback-text">
        Mandou bem!
      </p>
    );
  }

  header() {
    const { url, score, name } = this.state;
    return (
      <header>
        <img
          src={ url }
          alt="player.jpeg"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          {name}

        </p>
        <p
          data-testid="header-score"

        >
          {score}

        </p>
      </header>
    );
  }

  render() {
    const { assertions, score } = this.state;
    return (
      <div>
        { this.header() }
        { this.scoreFeedback() }
        <p>Questões corretas:</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            onClick={ this.createRanking }
            type="button"
          >
            Ver Ranking

          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
