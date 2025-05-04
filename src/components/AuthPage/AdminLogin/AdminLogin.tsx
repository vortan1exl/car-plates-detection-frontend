import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../services/api';
import { useAuthStore } from '../../../stores/authStore';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await adminLogin(email, password); 
      useAuthStore.getState().setUserFromToken(data.accessToken); 
      const { role } = useAuthStore.getState().user!;
      if (role === 'ADMIN') {
        navigate('/admin/home');
      }
      else if (role === 'PERSONNEL') {
        navigate('/personnel/parking');
      }
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className='centered-layout'>
      <div className='FormLogin'>
        <h2 className='textH2LoginForm'>Вход для администратора</h2>
        {error && <p >{error}</p>}
        <div onSubmit={handleSubmit} >
          <div>
            <label className='LabelLoginForm'>Электронная почта:</label>
            <input
              type="email"
              className='formLoginInput'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='LabelLoginForm'>Пароль:</label>
            <input
              type="password"
              className='formLoginInput'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br></br>
          <button
            type="submit"
            className='formLoginButton'
            onClick={handleSubmit}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;