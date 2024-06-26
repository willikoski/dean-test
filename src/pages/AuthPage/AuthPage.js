import { useState } from 'react';
import styles from './AuthPage.module.scss';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

export default function AuthPage({ setUser, user }) {
  const [showLogin, setShowLogin] = useState(true);

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <main className={styles.AuthPage}>
      {showLogin ? <Login setUser={setUser} user={user} toggleLoginForm={toggleLoginForm} /> : <Register setUser={setUser} toggleLoginForm={toggleLoginForm} />}
    </main>
  );
}
