import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Ranking.css';

class Ranking extends Component {
  render() {
    const recovery = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div className="main-ranking">
        <p className="ranking-trybe-quiz" data-testid="ranking-title">Ranking Trybe Quiz</p>
        <div className="conteudo-ranking">
          {
            recovery.map((jogador, index) => (
              <section className="content-ranking" key={ jogador.name }>
                <div className="ranking-sideA">
                  <img className="img-ranking" src={ jogador.picture } alt={ jogador.name } />
                </div>
                <div className="ranking-sideB">
                  <span>{`Posição: ${(index + 1)}`}</span>
                  <span data-testid={ `player-name-${index}` }>{`Jogador: ${jogador.name}`}</span>
                  <span data-testid={ `player-score-${index}` }>{`Pontuação: ${jogador.score}`}</span>
                </div>
              </section>))
          }
        </div>
        <Link to="/">
          <button
            className="go-to-home"
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
