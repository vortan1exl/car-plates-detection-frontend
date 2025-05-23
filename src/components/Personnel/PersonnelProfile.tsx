import React, { useEffect, useState } from "react";
import { getProfilePersonnel} from "../../services/api";
import { ProfilePersonnel } from "../../types/types";
import { NavMenuPersonnel } from "../NavMenu/NavMenuPersonnel";
import './StudentProfile.css';

export const PersonnelProfile: React.FC = () => {
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
    <NavMenuPersonnel/>
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
          <table className="history-table">
            <thead>
              <tr>
                <th>Номер</th>
                <th>Марка</th>
                <th>Модель</th>
                <th>Цвет</th>
              </tr>
            </thead>
            <tbody>
              {profile.vehicleDTO.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.carPlate}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.color}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
