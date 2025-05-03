import { useNavigate } from 'react-router-dom';
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='centered-layout'>
      <div className = "FormLogin">
        <h2 className='textH2LoginForm'>Выберите тип авторизации</h2>
        <div>
          <button
              className='formLoginButton'
              onClick={() => navigate('/student-auth')}
          >
            Вход для студентов
          </button>
          <br/>
          <br/>
          <button
              className='formLoginButton'
              onClick={() => navigate('/admin-login')}
          >
            Вход для персонала
          </button>
        </div>
      </div>
      </div>
  );
};

export default LandingPage;