import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";


const slideIn = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100px);
    opacity: 0;
  }
`;

const StyledLoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();


  const showMessage = (msg) => {
    setErrorMsg(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 10000);
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
      showMessage("Signup Successful ✅");
      navigate("/dashboard");
    } catch (error) {
      showMessage(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
      showMessage("Login Successful ✅");
      navigate("/dashboard");
    } catch (error) {
      showMessage(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return showMessage("Please enter your email first 📧");
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("Reset link sent. Check your inbox 📩");
    } catch (error) {
      showMessage(error.message);
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <h1>Project Cost Tracker</h1>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <p id="heading">Login</p>
          <div className="field">
            <input
              placeholder="Email"
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <input
              placeholder="Password"
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn">
            <button className="button1" type="button" onClick={handleLogin}>Login</button>
            <button className="button2" type="button" onClick={handleSignup}>Sign Up</button>
          </div>
          <button className="button3" type="button" onClick={handleForgotPassword}>Forgot Password</button>
        </form>

        {errorMsg && (
          <div className={`notification ${showNotification ? "" : "hide"}`}>
            <div className="notiglow" />
            <div className="notiborderglow" />
            <div className="notititle">
              Status
              <button className="close-btn" onClick={() => setShowNotification(false)}>×</button>
            </div>
            <div className="notibody">{errorMsg}</div>
          </div>
        )}
      </FormWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 3em;
    width: 350px;
    min-height: 420px;
    background-color: #171717;
    border-radius: 30px;
    transition: 0.4s ease-in-out;
  }

  .form:hover {
    transform: scale(1.05);
    border: 1px solid black;
  }

  #heading {
    text-align: center;
    color: white;
    font-size: 2em;
    margin-bottom: 1em;
  }

  .field {
    display: flex;
    align-items: center;
    border-radius: 25px;
    padding: 0.7em;
    background-color: #171717;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
    padding: 0.6em;
    font-size: 1rem;
  }

  .btn {
    display: flex;
    justify-content: center;
    gap: 1.5em;
    margin-top: 1.5em;
  }

  .button1, .button2, .button3 {
    padding: 0.8em 1.8em;
    border-radius: 6px;
    border: none;
    background-color: #252525;
    color: white;
    font-size: 1rem;
    transition: 0.4s ease-in-out;
    cursor: pointer;
  }

  .button1:hover, .button2:hover {
    background-color: black;
  }

  .button3 {
  align-self: center;
    margin-top: 1em;
    background-color: #252525;
    max-width: 200px;
  }

  .button3:hover {
    background-color: red;
  }

  .notification {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 20rem;
    background: #29292c;
    border-radius: 1rem;
    overflow: hidden;
    font-family: 'Gill Sans', sans-serif;
    font-size: 15px;
    --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
    --color: #32a6ff;
    animation: ${slideIn} 0.4s ease forwards;
  }

  .notification.hide {
    animation: ${slideOut} 0.6s ease forwards;
  }

  .notification:before {
    content: "";
    position: absolute;
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: #18181b;
    z-index: 2;
  }

  .notification:after {
    content: "";
    position: absolute;
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    z-index: 4;
  }

  .notititle {
    color: var(--color);
    padding: 0.65rem 0.25rem 0.4rem 1.25rem;
    font-weight: 500;
    font-size: 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: #ccc;
    font-size: 1.3rem;
    cursor: pointer;
    margin-right: 0.8rem;
    transition: color 0.3s ease;
  }

  .close-btn:hover {
    color: #fff;
  }

  .notibody {
    color: #99999d;
    padding: 0 1.25rem 1rem 1.25rem;
    z-index: 5;
  }

  .notiglow, .notiborderglow {
    position: absolute;
    width: 20rem;
    height: 20rem;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle closest-side at center, white, transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  /* Medium screens: tablets, small laptops */
  @media (max-width: 1024px) {
    .form {
      width: 420px;
      padding: 2.5em;
    }
  }

  /* Small screens: mobile phones */
  @media (max-width: 768px) {
    .form {
      width: 90%;
      padding: 2em;
    }

    #heading {
      font-size: 1.6em;
    }

    .button1, .button2, .button3 {
      padding: 0.6em 1.4em;
      font-size: 0.95rem;
    }
  }
`;

export default StyledLoginPage;
