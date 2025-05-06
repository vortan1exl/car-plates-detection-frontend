import React, { useEffect, useState } from "react";
import { getProfilePersonnel} from "../../services/api";
import { ProfilePersonnel } from "../../types/types";
import { NavMenuAdmin } from "../NavMenu/NavMenuAdmin";
import '../Personnel/StudentProfile.css';

export const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfilePersonnel | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfilePersonnel()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Ошибка: {error}</p>;
  if (!profile) return <p></p>;

  return (
    <div>
    <NavMenuAdmin/>
      <div className="profile-container">
        <h2>Профиль сотрудника</h2>
        <p><strong>ФИО:</strong> {profile.lastName} {profile.firstName} {profile.middleName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Телефон:</strong> {profile.phone}</p>
        <p><strong>Факультет:</strong> {profile.faculty}</p>
        <p><strong>Должность:</strong> {profile.position}</p>

        <h3>Автомобили</h3>
        {profile.vehicleDTO.length === 0 ? (
          <p>Автомобили не зарегистрированы</p>
        ) : (
          <ul>
            {profile.vehicleDTO.map((vehicle, index) => (
              <li key={index}>
                <p><strong>Номер:</strong> {vehicle.carPlate}</p>
                <p><strong>Марка:</strong> {vehicle.brand}</p>
                <p><strong>Модель:</strong> {vehicle.model}</p>
                <p><strong>Цвет:</strong> {vehicle.color}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
