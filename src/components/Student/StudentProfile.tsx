import React, { useEffect, useState } from "react";
import { getProfileStudent } from "../../services/api";
import { ProfileStudent } from "../../types/types";
import { NavMenu } from "../NavMenu/NavMenuStudent";
import './StudentProfile.css';

export const StudentProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileStudent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfileStudent()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Ошибка: {error}</p>;
  if (!profile) return <p></p>;

  return (
    <div>
    <NavMenu/>
      <div className="profile-container">
        <h2>Профиль студента</h2>
        <p><strong>ФИО:</strong> {profile.lastName} {profile.firstName} {profile.middleName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Телефон:</strong> {profile.phone}</p>
        <p><strong>Студенческий:</strong> {profile.student_card}</p>
        <p><strong>Факультет:</strong> {profile.faculty}</p>
        <p><strong>Курс:</strong> {profile.course}</p>
        <p><strong>Группа:</strong> {profile.groups}</p>

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
