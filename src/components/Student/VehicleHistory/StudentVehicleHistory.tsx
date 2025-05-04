import React, { useEffect, useState } from 'react';
import { getStudentVehicleHistory } from '../../../services/api';
import {VehicleHistory} from '../../../types/types';
import {NavMenu} from '../../NavMenu/NavMenuStudent';

const PAGE_SIZE = 9;


export const StudentVehicleHistory: React.FC = () => {
  const [history, setHistory] = useState<VehicleHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentVehicleHistory();
        if (Array.isArray(data)) {
          setHistory(data);
          setTotalPages(Math.ceil(data.length / PAGE_SIZE));
        } else {
          console.error('Ожидался массив, но пришло:', data);
        }
      } catch (error) {
        console.error('Ошибка при получении истории:', error);
        setError('Ошибка при получении данных');
      }
    };

    fetchData();
  }, []);

  const currentData = history.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="history-container">
      <NavMenu />

      <h2 className="history-title">История въездов</h2>
      {error && <p>{error}</p>}
      {currentData.length === 0 ? (
        <p>История пуста.</p>
      ) : (
        <div>
          <table className="history-table">
            <thead>
              <tr>
                <th>Номер</th>
                <th>Марка</th>
                <th>Модель</th>
                <th>Цвет</th>
                <th>Въезд</th>
                <th>Выезд</th>
                <th>Длительность</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.carPlate}</td>
                  <td>{entry.brand}</td>
                  <td>{entry.model}</td>
                  <td>{entry.color}</td>
                  <td>{new Date(entry.entryTime).toLocaleString()}</td>
                  <td>{entry.exitTime ? new Date(entry.exitTime).toLocaleString() : ''}</td>
                  <td>{entry.duration.replace('PT', '').toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <span>Страница {currentPage} из {totalPages}</span>
            {currentPage > 1 && (
              <button onClick={handlePreviousPage}
              className='buttonLeft'>
                Назад
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={handleNextPage}
              className='buttonLeft'>
                Вперед
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentVehicleHistory;