import { useNavigate } from 'react-router-dom';
import { signOut } from '../services/api';
import { useAuthStore } from '../stores/authStore';

const PersonnelHome: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      setAuthenticated(false);
      navigate('/');
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  };

  return (
    <div>
      <h2>Добро пожаловать, сотрудник!</h2>
      <button onClick={handleSignOut}>Выйти</button>
    </div>
  );
};

export default PersonnelHome;
