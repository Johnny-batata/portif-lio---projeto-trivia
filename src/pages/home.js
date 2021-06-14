import React, { Component } from 'react';
// import logo from './trivia.png';
// import '../';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      buttonReady: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.emailVerify = this.emailVerify.bind(this);
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
    const { buttonReady } = this.state;
    return (
      <>
        <p> Bem vindo : página inicial </p>

        <label htmlFor="name">
          Nome
          <input
            id="name"
            name="name"
            onChange={handleChange}
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
            onChange={handleChange}
            type="email"
          />
        </label>
        <button
          type="button"
          disabled={!buttonReady}
          data-testid="btn-play"
        >
          {' '}
          Jogar
          {' '}

        </button>

      </>
    );
  }
}
export default Home;
