import React, { useState, useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './index.scss';
import SignUp from '../../components/Signup';
import Signin from '../../components/Signin';
import RightPanel from '../../components/Rightpannel';
import LeftPanel from '../../components/Leftpannel';
import myApp from '../../FirebaseConfig';
import { AuthContext } from '../../utility/AuthContext';

const Login = ({ history }) => {
  const [toggle, setToggle] = useState(true);
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await myApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { name, email, password } = event.target.elements;
      try {
        await myApp
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        return myApp.auth().currentUser.updateProfile({
          displayName: name,
        });
        //  history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    []
  );
  const onClick = () => setToggle(!toggle);
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to='/' />;
  }
  return toggle ? (
    <div className='container'>
      <div className='forms-container'>
        <div className='signin-signup'>
          <Signin onSubmit={handleLogin} />
        </div>
      </div>

      <div className='panels-container'>
        <LeftPanel click={onClick} />
        <RightPanel click={onClick} />
      </div>
    </div>
  ) : (
    <div className='container sign-up-mode'>
      <div className='forms-container'>
        <div className='signin-signup'>
          <SignUp onSubmit={handleSignUp} />
        </div>
      </div>

      <div className='panels-container'>
        <LeftPanel click={onClick} />
        <RightPanel click={onClick} />
      </div>
    </div>
  );
};

export default withRouter(Login);
