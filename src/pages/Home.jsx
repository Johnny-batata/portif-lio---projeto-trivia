import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import logo from './trivia.png';
// import '../';

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
  }

  onClick() {
    // console.log('batata');
    const { name, email } = this.state;
    FetchApi();
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };

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

  render() {
    const { handleChange } = this;
    const { buttonReady, isRedirect } = this.state;
    return (
      <>
        <p> Bem vindo : página inicial </p>

        <label htmlFor="name">
          Nome
          <input
            id="name"
            name="name"
            onChange={ handleChange }
            data-testid="input-player-name"
            type="text"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ handleChange }
            type="email"
          />
        </label>
        <button
          type="button"
          disabled={ !buttonReady }
          data-testid="btn-play"
          onClick={ this.onClick }
        >
          {' '}
          Jogar
          {' '}

        </button>
        {isRedirect && <Redirect to="/game" />}

        <Link to="/settings">
          <button type="button" data-testid="btn-settings"> Configurações</button>
        </Link>

      </>
    );
  }
}
export default Home;
