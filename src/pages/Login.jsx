import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

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
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            data-testid="email-input"
            id="email-input"
            name="loginEmail"
            value={ loginEmail }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            id="password-input"
            name="loginPassword"
            value={ loginPassword }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          name="isSaveButtonDisabled"
          disabled={ loginButtonDisabled }
          onClick={ () => btnSubmit() }
        >
          Entrar
        </button>
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
