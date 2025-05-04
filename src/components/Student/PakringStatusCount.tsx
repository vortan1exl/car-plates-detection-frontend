import React, { useEffect, useState } from "react";
import { getParkingStatus } from "../../services/api"; 
import { ParkStatus } from "../../types/types";

export const ParkingStatusCount: React.FC = () => {
    const [vehicleStatus, setStatus] = useState<ParkStatus>();
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        getParkingStatus()
        .then((data) => setStatus(data))
        .catch((err) => setError(err.message));
    }, []);
  
    if (error) return <p>Ошибка: {error}</p>;
    if (vehicleStatus === null) return <p>Загрузка...</p>;
  
    return (
        <p>Количество авто на парковке: {vehicleStatus?.countCar}</p>
    );

};