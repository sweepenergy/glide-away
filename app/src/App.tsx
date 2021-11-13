import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import ModbusProvider from './providers/ModbusProvider';

import Home from './pages/Home';
import Login from './pages/Login';
import useDate from './components/useDate';
import withClearCache from './ClearCache';
import packageJson from '../package.json';
import { getBuildDate } from './utils/date';

import './App.css';

const MainApp = () => {
  const { time } = useDate();
  const [devicesDirectoryId, setDevicesDirectoryId] = useState('');
  const [devicesStreamId, setDevicesStreamId] = useState('');
  const [sensorsDirectoryId, setSensorsDirectoryId] = useState('');

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          {window.localStorage.getItem('token')
            && (
            <Route exact path='/dashboard'>
              <ModbusProvider>
                <Home
                  devicesDirectoryId={devicesDirectoryId}
                  devicesStreamId={devicesStreamId}
                  sensorsDirectoryId={sensorsDirectoryId}
                />
              </ModbusProvider>
            </Route>
            )}
          <Route path='*'>
            <Redirect to='/login' />
          </Route>
        </Switch>
      </Router>
      <footer>
        <div className='container'>
          <ul className='footer-container'>
            <li className='footer-item'>
              <button
                type='button'
                className='footer-links'
                onClick={() => {
                  window.location.href = 'https://sweepenergy.com';
                }}
              >
                Sweep Energy
              </button>
            </li>
            <li className='footer-item'>{time}</li>
            <li className='footer-item'>
              <button
                type='button'
                className='footer-links'
                onClick={() => {
                  window.location.href = 'https://docs.sweepapi.com';
                }}
              >
                API
              </button>
            </li>
          </ul>
          <p>
            Build date:
            {' '}
            {getBuildDate(packageJson.buildDate)}
          </p>
        </div>
      </footer>
    </AuthProvider>
  );
};

const ClearCacheComponent = withClearCache(MainApp);

const App = () => <ClearCacheComponent />;

export default App;
