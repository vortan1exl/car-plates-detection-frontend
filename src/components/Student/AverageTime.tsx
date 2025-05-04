import React, { useEffect, useState } from "react";
import { getAverageTime } from "../../services/api"; 

export const AverageTime: React.FC = () => {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        getAverageTime()
        .then((data) => setCount(data)) // ← теперь data — это просто число
        .catch((err) => setError(err.message));
    }, []);
  
    if (error) return <p>Ошибка: {error}</p>;
    if (count === null) return <p>Загрузка...</p>;
  
    return <p>Среднее время посещения: {count}</p>;
  };