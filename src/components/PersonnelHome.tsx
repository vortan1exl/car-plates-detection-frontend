import { NavMenuPersonnel } from './NavMenu/NavMenuPersonnel'
import { VehicleStatusList } from './Student/VehicleStatus/VehicleStatusList';
import { VisitCount } from './Student/VisitCount';
import { ParkingStatus } from './Student/ParkingStatus';
import { AverageTime } from './Student/AverageTime';
import { ParkingStatusCount } from './Student/PakringStatusCount';
import './Parking.css';
import { Link } from "react-router-dom";

const PersonnelHome: React.FC = () => {
  return (
    <div>
      <NavMenuPersonnel/>
        <div className='mainPage'>
        <div className='moreMainPage'>
        <div className="info-cards">
          <p>
          <Link to="/personnel/vehicle-history" className="block-link">
            История
          </Link>
          </p>
          <ParkingStatusCount />
          <ParkingStatus />
          <VisitCount />
          <AverageTime />
      </div>
        <VehicleStatusList/>
      </div>
      </div>
    </div>
  );
};

export default PersonnelHome;
