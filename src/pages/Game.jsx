import React, { Component } from 'react';
import FetchImageGravatar from '../services/fetchImageGravatar';
import Questions from '../components/Questions';
import './Game.css';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      score: 0,
      name: '',
    };
    this.updateState = this.updateState.bind(this);
    this.header = this.header.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    const name = JSON.parse(localStorage.getItem('state'));
    this.updateState(name);
  }

  updateScore(props) {
    this.setState((prev) => ({
      ...prev, score: props,
    }));
  }

  async updateState(name) {
    await FetchImageGravatar(name.player.gravatarEmail)
      .then((data) => this.setState({ url: data }));
    this.setState({ score: name.player.score });
    this.setState({ name: name.player.name });
  }

  header() {
    const { url, score, name } = this.state;
    return (
      <header>
        <div className="header-sideA">
          <img
            src={ url }
            alt="player.jpeg"
            data-testid="header-profile-picture"
          />
        </div>
        <div className="header-sideB">
          <div className="side-b1">
            <span
              data-testid="header-player-name"
            >
              {`Usuário: ${name}`}

            </span>
            <span
              data-testid="header-score"
            >
              {`Pontuação: ${score}`}

            </span>
          </div>
          <div className="side-b2">
            <span className="trybeQuiz">
              Trybe Quiz
            </span>
          </div>
        </div>
      </header>
    );
  }

  render() {
    return (
      <div className="content">
        {this.header()}
        <Questions updateScore={ this.updateScore } />
      </div>
    );
  }
}

// export default game;
