import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './Login.css'; // Import your CSS file

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="aakhu">
    <div className={`container ${isSignUp ? 'active' : ''}`} style={{width:"65%"}}>
      <div className="form-container sign-up">
        <form>
          <h1 style={{fontSize:"30px"}}>Create Account</h1>
          <div className="social-icons">
            <a href="google.com" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="google.com" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="google.com" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="google.com" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button style={{fontSize:'18px'}}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1 style={{fontSize:"30px"}}>Login</h1>
          <div className="social-icons">
            <a href="google.com" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="google.com" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="google.com" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="google.com" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="google.com">Forget Your Password?</a>
          <button style={{fontSize:'18px'}}>Login</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
          <h1 style={{color:" #eeeeee",fontSize:"22px"}}>Welcome Back!</h1>
    <p style={{color: "#eeeeee",fontSize:"18px"}}>Enter your personal details to use all of site features</p>
            <button className="hi" onClick={toggleForm} style={{fontSize:"15px"}}>Login</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 style={{color:" #eeeeee",fontSize:"22px"}}>Hello, Friend!</h1>
            <p style={{color:" #eeeeee",fontSize:"18px"}}>Register with your personal details to use all of site features</p>
            <button className="hi" onClick={toggleForm} style={{fontSize:"15px"}} >Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
