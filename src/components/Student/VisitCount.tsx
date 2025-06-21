import React, { useEffect, useState } from "react";
import { getVisitCount } from "../../services/api"; 

export const VisitCount: React.FC = () => {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      getVisitCount()
        .then((data) => setCount(data))
        .catch((err) => setError(err.message));
    }, []);
  
    if (error) return <p>Ошибка: {error}</p>;
    if (count === null) return <p>Загрузка...</p>;
  
    return <p>Посещения за месяц: {count}</p>;
  };