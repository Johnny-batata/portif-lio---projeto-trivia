import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import logo from './trivia.png';
import './Home.css';

import FetchApi from '../services/fetchApi';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      buttonReady: false,
      isRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.emailVerify = this.emailVerify.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleFormLabel = this.handleFormLabel.bind(this);
  }

  onClick() {
    // console.log('batata');
    const { name, email } = this.state;
    FetchApi();
    const player = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } };

    this.setState({ isRedirect: true });
    localStorage.setItem('state', JSON.stringify(player));
    // localStorage.setItem('email', email);
  }

  emailVerify() {
    const { name, email } = this.state;

    if (name.length > 0 && email.length > 0) {
      return this.setState({ buttonReady: true });
    }
    return this.setState({ buttonReady: false });
  }

  handleChange({ target: { value, name } }) {
    this.emailVerify();
    this.setState({ [name]: value });
  }

  handleFormLabel() {
    return (
      <>
        <label className="labels-input" htmlFor="name">
          Nome
          <input
            className="config-input"
            id="name"
            name="name"
            onChange={ this.handleChange }
            data-testid="input-player-name"
            type="text"
            placeholder="Digite seu nome"
          />
        </label>
        <label className="labels-input" htmlFor="email">
          Email
          <input
            className="config-input"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            type="email"
            placeholder="Digite seu email"
          />
        </label>
      </>);
  }

  render() {
    const { handleFormLabel } = this;
    const { buttonReady, isRedirect } = this.state;
    return (
      <div className="main">

        <span className="bem-vindo"> Bem vindo </span>
        <span className="bem-vindo2">Trybe Quiz </span>

        <section className="form-login">

          {handleFormLabel()}

          <button
            type="button"
            disabled={ !buttonReady }
            data-testid="btn-play"
            onClick={ this.onClick }
          >
            {' '}
            JOGAR
            {' '}

          </button>
          {isRedirect && <Redirect to="/game" />}

          <div className="settings">
            <Link to="/settings">
              <button
                className="btn-settings"
                type="button"
                data-testid="btn-settings"
              >
                {' '}
                CONFIGURAÇÕES

              </button>
            </Link>
          </div>
        </section>

      </div>
    );
  }
}
export default Home;
