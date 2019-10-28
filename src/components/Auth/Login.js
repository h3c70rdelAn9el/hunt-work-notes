import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";
import { AuthContext } from "../../Auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
      async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          await firebase 
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
          history.push("/");
        } catch (error) {
          alert(error)
        }
      },
      [history]
    );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input type="email" name="email" placeholder="example@example.com" />
        </label>
        <label>
          <input type="password" name="password" placeholder="Password" />
        </label>
        <button type="submit" >
          Login 
        </button>
      </form>
      <h4><Link to="/signup" >Sign up</Link></h4>
    </div>
  );
}

export default withRouter(Login);
