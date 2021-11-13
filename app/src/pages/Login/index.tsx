import React, {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '../../providers/AuthProvider';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import check from '../../assets/cloud.png';

const GLIDE_AWAY = 'https://qa.api.sweepapi.com';

const Login = (): React.ReactElement => {
  const history = useHistory();
  const [inputToken, setInputToken] = useState('');
  const [isError, setIsError] = useState(false);
  const { setToken } = useAuthContext();

  const headers = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${inputToken}`,
    }),
    [inputToken],
  );

  // Auto-login if saved token is valid
  useEffect(() => {
    const verifyToken = async (token: string) => {
      const { status } = await axios.get(
        `${GLIDE_AWAY}/account/verify_auth`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          validateStatus: () => true,
        },
      );

      if (status === 200) {
        history.push('/dashboard');
      } else {
        window.localStorage.removeItem('token');
      }
    };

    if (window.localStorage.getItem('token')) {
      // eslint-disable-next-line no-void
      void verifyToken(window.localStorage.getItem('token')!);
    }
  }, [headers, history]);

  const login = useCallback(async () => {
    const response = await axios.get(
      `${GLIDE_AWAY}/account/verify_auth`,
      {
        headers,
        validateStatus: () => true,
      },
    );
    return response;
  }, [headers]);

  const handleSubmission = async (event) => {
    event.preventDefault();
    const { status } = await login();
    if (status === 200) {
      setToken(inputToken);
      /* global window */
      window.localStorage.setItem('token', inputToken);
      history.push('/dashboard');
    } else {
      setIsError(true);
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <div className='logo'>
          <img src={check} alt='check' />
        </div>
        <div className='title'>
          <header>Glide Away</header>
          <header>Sweep API</header>
        </div>
        <form className='userinput' onSubmit={handleSubmission}>
          <div className='input-control'>
            {isError && <div style={{color: 'red'}}>Invalid Token</div>}
            <label htmlFor='token'>API Token (JWT)</label>
            <input
              type='password'
              id='token'
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='button'>
            Sign in
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
