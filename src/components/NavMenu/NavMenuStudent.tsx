import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import './NavMenu.css';

export const NavMenu: React.FC = () =>{
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
  const studentProfile = async () => {
    navigate('/student/profile')
  }
  const parking = async () => {
    navigate('/student/parking')
  }

  return (
    <div>
      <nav className="navmenu-menu">
      <ol>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={studentProfile}>Профиль</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={parking}>Парковка</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={handleSignOut}>Выйти</button></li>
      </ol>
    </nav>
    </div>
  );
}