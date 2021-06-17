import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const recovery = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <div>
          {
            recovery.map((jogador, index) => (
              <section key={ jogador.name }>
                <img src={ jogador.picture } alt={ jogador.name } />
                <span data-testid={ `player-name-${index}` }>{`${jogador.name}`}</span>
                <span data-testid={ `player-score-${index}` }>{jogador.score}</span>
              </section>))
          }
        </div>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
