import React, { useEffect, useState } from "react";
import { getVehicleStatus } from "../../../services/api";
import { VehicleStatus } from "../../../types/types";
import './VehicleStatusList.css';

export const VehicleStatusList: React.FC = () => {
  const [vehicles, setVehicles] = useState<VehicleStatus[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getVehicleStatus()
      .then((data) => setVehicles(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Ошибка: {error}</p>;
  if (vehicles.length === 0) return <p>Загрузка...</p>;

  return (
    <div className="table-wrapper">
      <table className="history-table">
        <thead>
          <tr>
            <th>Номер</th>
            <th>Марка</th>
            <th>Модель</th>
            <th>Цвет</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.carPlate}>
              <td>{vehicle.carPlate}</td>
              <td>{vehicle.brand}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  );
};
