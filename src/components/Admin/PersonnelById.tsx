import React, { useEffect, useState } from "react";
import { addVehicleToPersonnel, getPersonnelById, updatePersonnelById, updateVehicle, deleteVehicle } from "../../services/api";
import { PersonnelArray, ProfilePersonnel, VehicleDTO } from "../../types/types";
import { NavMenuAdmin } from "../NavMenu/NavMenuAdmin";
import { useParams } from 'react-router-dom';

export const PersonnelById: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const [profile, setProfile] = useState<ProfilePersonnel | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
    const [isEditCarModalOpen, setIsEditCarModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<VehicleDTO | null>(null);

    const [formData, setFormData] = useState<Partial<PersonnelArray>>({});
      const [carData, setCarData] = useState<Partial<VehicleDTO>>({
        carPlate: "",
        brand: "",
        model: "",
        color: "",
      });

    useEffect(() => {
        if (!uuid) return;
        getPersonnelById(uuid)
          .then((data) => {
            setProfile(data);
            setFormData(data);
          })
          .catch((err) => setError(err.message));
      }, [uuid]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleCarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCarData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const handleEditCarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setEditingVehicle((prev) => prev ? { ...prev, [name]: value } : prev);
        };
    
      const handleSave = async () => {
        if (!uuid) return;
        try {
          if (formData.id) {
            await updatePersonnelById(uuid, formData as PersonnelArray);
            const updatedProfile = await getPersonnelById(uuid);
            setProfile(updatedProfile);
            setIsModalOpen(false);
          } else {
            throw new Error("Ошибка");
          }
        } catch (err) {
          alert("Ошибка при обновлении");
        }
      };
    
      const handleAddCar = async () => {
        if (!uuid) return;
        try {
          await addVehicleToPersonnel(uuid, carData as VehicleDTO);
          const updatedProfile = await getPersonnelById(uuid);
          setProfile(updatedProfile);
          setIsAddCarModalOpen(false);
        } catch (err) {
          alert("Ошибка при добавлении автомобиля");
        }
      };

      const handleDeleteCar = async (vehicleId: string) => {
          try {
            await deleteVehicle(vehicleId);
            if (uuid) {
              const updated = await getPersonnelById(uuid);
              setProfile(updated);
            }
          } catch {
            alert("Ошибка при удалении автомобиля");
          }
        };
        
        const handleEditCar = (vehicle: VehicleDTO) => {
          setEditingVehicle(vehicle);
          setIsEditCarModalOpen(true);
        };

  if (error) return <p>Ошибка: {error}</p>;
  if (!profile) return <p></p>;

  return (
    <div>
    <NavMenuAdmin/>
      <div className="profile-container">
        <div className="info-cards">
          <button onClick={() => setIsModalOpen(true)}>Изменить профиль</button>
          <button onClick={() => setIsAddCarModalOpen(true)}>Добавить авто</button>
        </div>
        <h2>Профиль персонала</h2>
        <p><strong>ФИО:</strong> {profile.lastName} {profile.firstName} {profile.middleName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Телефон:</strong> {profile.phone}</p>
        <p><strong>Факультет:</strong> {profile.faculty}</p>
        <p><strong>Должность:</strong> {profile.position}</p>
        <h3>Автомобили</h3>
        {profile.vehicleDTOList.length === 0 ? (
            <p>Автомобили не зарегистрированы</p>
        ) : (
          <table className="history-table">
          <thead>
            <tr>
              <th>Номер</th>
              <th>Марка</th>
              <th>Модель</th>
              <th>Цвет</th>
              <th colSpan={2}>Действия</th>
              </tr>
          </thead>
          <tbody>
            {profile.vehicleDTOList.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.carPlate}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.color}</td>
                <td>
                  <button className="navmenu-logout-button" onClick={() => handleEditCar(vehicle)}>Редактировать</button>
                  </td>
                  <td>
                  <button className="navmenu-logout-button" onClick={() => handleDeleteCar(vehicle.id)}>Удалить</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {/* Модалка профиля */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Редактировать профиль</h2>
            <input name="lastName" value={formData.lastName || ""} onChange={handleChange} placeholder="Фамилия" />
            <input name="firstName" value={formData.firstName || ""} onChange={handleChange} placeholder="Имя" />
            <input name="middleName" value={formData.middleName || ""} onChange={handleChange} placeholder="Отчество" />
            <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" />
            <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Телефон" />
            <input name="faculty" value={formData.faculty || ""} onChange={handleChange} placeholder="Факультет" />
            <input name="position" value={formData.position || ""} onChange={handleChange} placeholder="Должность" />
            <button onClick={handleSave}>Сохранить</button>
            <button onClick={() => setIsModalOpen(false)}>Отмена</button>
          </div>
        </div>
      )}

      {/* Модалка добавления автомобиля */}
      {isAddCarModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Добавить автомобиль</h2>
            <input name="carPlate" value={carData.carPlate || ""} onChange={handleCarChange} placeholder="Номер" />
            <input name="brand" value={carData.brand || ""} onChange={handleCarChange} placeholder="Марка" />
            <input name="model" value={carData.model || ""} onChange={handleCarChange} placeholder="Модель" />
            <input name="color" value={carData.color || ""} onChange={handleCarChange} placeholder="Цвет" />
            <button onClick={handleAddCar}>Сохранить</button>
            <button onClick={() => setIsAddCarModalOpen(false)}>Отмена</button>
          </div>
        </div>
      )}

      {isEditCarModalOpen && editingVehicle && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Редактировать автомобиль</h2>
                  <input name="carPlate" value={editingVehicle.carPlate} onChange={handleEditCarChange} placeholder="Номер"/>
                  <input name="brand" value={editingVehicle.brand} onChange={handleEditCarChange} placeholder="Марка"/>
                  <input name="model" value={editingVehicle.model} onChange={handleEditCarChange} placeholder="Модель"/>
                  <input name="color" value={editingVehicle.color} onChange={handleEditCarChange} placeholder="Цвет"/>
                  <button
                    onClick={async () => {
                      if (!editingVehicle?.id) return;
                      try {
                        await updateVehicle(editingVehicle.id, editingVehicle);
                        if (uuid) {
                          const updated = await getPersonnelById(uuid);
                          setProfile(updated);
                        }
                        setIsEditCarModalOpen(false);
                      } catch {
                        alert("Ошибка при редактировании автомобиля");
                      }
                    }}
                  >
                    Сохранить
                  </button>
                  <button onClick={() => setIsEditCarModalOpen(false)}>Отмена</button>
                </div>
              </div>
            )}
    </div>
  );
};
