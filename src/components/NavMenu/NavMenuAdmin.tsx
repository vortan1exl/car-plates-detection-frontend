import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import './NavMenu.css';

export const NavMenuAdmin: React.FC = () =>{
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
      <nav className="navmenu-menu">
      <ol>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={handleSignOut}>Студенты</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={handleSignOut}>Персонал</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={handleSignOut}>Парковка</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={handleSignOut}>Лог парковки</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={handleSignOut}>Выйти</button></li>
      </ol>
    </nav>
    </div>
  );
}