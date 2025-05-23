import { NavMenuStudent } from './NavMenu/NavMenuStudent'
import { VehicleStatusList } from './Student/VehicleStatus/VehicleStatusList';
import { VisitCount } from './Student/VisitCount';
import { ParkingStatus } from './Student/ParkingStatus';
import { AverageTime } from './Student/AverageTime';
import { ParkingStatusCount } from './Student/PakringStatusCount';
import './Parking.css';
import { Link } from "react-router-dom";

const StudentHome: React.FC = () => {
  return (
    <div>
      <NavMenuStudent/>
        <div className='mainPage'>
        <div className='moreMainPage'>
        <div className="info-cards">
          <p>
          <Link to="/student/vehicle-history" className="block-link">
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

export default StudentHome;
