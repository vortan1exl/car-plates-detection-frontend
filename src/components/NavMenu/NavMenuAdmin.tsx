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
  const adminProfile = async () => {
    navigate('/admin/profile')
  }
  const adminStudent = async () => {
    navigate('/admin/student')
  }

  const adminPersonnel = async () => {
    navigate('/admin/personnel')
  }
  const adminParking = async () => {
    navigate('/admin/home')
  }
  
  const adminParkingLog = async () => {
    navigate('/admin/parkinglog')
  }

  return (
    <div>
      <nav className="navmenu-menu">
      <ol>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={adminProfile}>Профиль</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={adminStudent}>Студенты</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={adminPersonnel}>Персонал</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={adminParking}>Парковка</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={adminParkingLog}>Лог парковки</button></li>
        <li className="navmenu-menu-item"><button className='navmenu-logout-button' onClick={handleSignOut}>Выйти</button></li>
      </ol>
    </nav>
    </div>
  );
}