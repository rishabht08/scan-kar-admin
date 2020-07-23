import React from 'react';

const SignUp = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='sign-up-form'>
      <h2 className='title'>Sign up</h2>
      <div className='input-field'>
        <i className='fas fa-user'></i>
        <input type='text' name='name' placeholder='Username' />
      </div>
      <div className='input-field'>
        <i className='fas fa-envelope'></i>
        <input type='email' name='email' placeholder='Email' />
      </div>
      <div className='input-field'>
        <i className='fas fa-lock'></i>
        <input type='password' placeholder='Password' name='password' />
      </div>

  
        <label for="type">Choose your Category</label><br></br><br></br>
        <input type="radio" id="restaurant" name="type" value="restaurant"/>
          <label for="restaurant">Restaurant</label><br></br>
            <input type="radio" id="hotel" name="type" value="hotel"/>
              <label for="hotel">Hotel</label><br></br>
     


              <button type='submit' className='btn'>
                Sign Up
      </button>

    </form>
  );
};

export default SignUp;
