import React, { useCallback } from 'react';
import { withRouter } from "react-router";
import firebase from "../../Firebase";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  
  return (
    <div>
    <h1>SIGN UP!!!!!</h1>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="example@example.com" />
        </label>
        <label>
          Password
          <input type="password" name="password" placeholder="password" />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
