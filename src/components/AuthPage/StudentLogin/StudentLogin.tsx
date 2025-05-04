import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestStudentCode, studentLogin } from '../../../services/api';
import { useAuthStore } from '../../../stores/authStore';

const StudentAuth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestStudentCode(email);
      setStep('code');
    } catch (err) {
      setError('Ошибка при отправке кода');
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await studentLogin(email, code); 
      useAuthStore.getState().setUserFromToken(data.accessToken); 
      const { role } = useAuthStore.getState().user!;
      if(role === 'STUDENT'){
        navigate('/student/parking');
      }
    } catch (err) {
      setError('Неверный код или email');
    }
  };

  return (
    <div className='centered-layout'>
      <div className='FormLogin'>
        <h2 className='textH2LoginForm'>
          {step === 'email' ? 'Вход для студентов' : 'Введите код для аутентификации'}
        </h2>
        {error && <p>{error}</p>}
        {step === 'email' ? (
          <div onSubmit={handleEmailSubmit}>
            <div>
              <label className='LabelLoginForm'>Электронная почта:</label>
              <input
                type="email"
                value={email}
                className='formLoginInput'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br></br>
            <button
              type="submit"
              className='formLoginButton'
              onClick={handleEmailSubmit}
            >
              Отправить код
            </button>
          </div>
        ) : (
          <div onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label className='LabelLoginForm'>Код:</label>
              <input
                className='formLoginInput'
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <br></br>
            <button
              type="submit"
              className='formLoginButton'
              onClick={handleCodeSubmit}
            >
              Войти
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAuth;