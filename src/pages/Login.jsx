import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import Logo from '../images/logo.svg';
import '../assets/css/Login.css';

function Login({ history }) {
  const {
    loginEmail,
    loginPassword,
    loginButtonDisabled,
    handleChange,
  } = useContext(RecipeContext);

  const btnSubmit = () => {
    const emailObject = { email: loginEmail };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(emailObject));

    history.push('/foods');
  };

  return (
    <div>
      <form className="container-login">
        <div className="container-name">
          <p>Nome App</p>
          <div className="name-line" />
        </div>
        <div className="container-email">
          <label htmlFor="email-input">
            <p>Email</p>
            <input
              type="email"
              data-testid="email-input"
              id="email-input"
              name="loginEmail"
              value={ loginEmail }
              onChange={ (e) => handleChange(e) }
            />
          </label>
        </div>
        <div className="container-password">
          <label htmlFor="password-input">
            <p>Senha</p>
            <input
              type="password"
              data-testid="password-input"
              id="password-input"
              name="loginPassword"
              value={ loginPassword }
              onChange={ (e) => handleChange(e) }
            />
          </label>
        </div>
        <div className="container-btn">
          <img className="btn-logo" src={ Logo } alt="logo" />
          <button
            type="button"
            className="btn-enter"
            data-testid="login-submit-btn"
            name="isSaveButtonDisabled"
            disabled={ loginButtonDisabled }
            onClick={ () => btnSubmit() }
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
