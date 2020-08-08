import React, { useState, useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './index.scss';
import SignUp from '../../components/Signup';
import Signin from '../../components/Signin';
import RightPanel from '../../components/Rightpannel';
import LeftPanel from '../../components/Leftpannel';
import myApp from '../../FirebaseConfig';
import { AuthContext } from '../../utility/AuthContext';
import axios from "axios";

const Login = ({ history }) => {
  const [toggle, setToggle] = useState(true);
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        // await myApp
        //   .auth()
        //   .signInWithEmailAndPassword(email.value, password.value);
        // history.push('/');
        axios.post("https://scankarapi.herokuapp.com/api/v1/adminLogin", { email: email.value, password: password.value }).then(res => {
          console.log("login success", res)
          if (res.status == 200) {
            localStorage.setItem('ownertype', res.data.user.ownerType);
               localStorage.setItem('token', res.data.token);
            // history.push("/")
            window.location.reload();
          }

        })
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { name, email, password, type } = event.target.elements;
      try {
        // await myApp
        //   .auth()
        //   .createUserWithEmailAndPassword(email.value, password.value);
        // return myApp.auth().currentUser.updateProfile({
        //   displayName: name,
        // });
        let mobNo = Math.floor(Math.random() * (Math.pow(10,11) - Math.pow(10,10)) ) + Math.pow(10,10);
        const data = {
          "firstName": name.value,
          "lastName": name.value,
          "email": email.value,
          "password": password.value,
          "ownerType": type.value,
          "role": "admin",
          "mobileNumber": mobNo.toString()
        }
        axios.post("https://scankarapi.herokuapp.com/api/v1/register" , data).then(res=>{
          console.log("signup reponse" , res)
          if(res.status==200){
            localStorage.setItem('ownertype', res.data.user.ownerType);
               localStorage.setItem('token', res.data.token);
            // history.push("/")
            window.location.reload();

          }

        })
        
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
