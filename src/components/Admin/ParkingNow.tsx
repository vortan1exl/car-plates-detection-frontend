import React, { useEffect, useState } from 'react';
import { getParkingNow } from '../../services/api';
import { ParkingInfo } from '../../types/types';
import { NavMenuAdmin } from '../NavMenu/NavMenuAdmin';

const PAGE_SIZE = 9;


export const ParkinNow: React.FC = () => {
  const [history, setHistory] = useState<ParkingInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParkingNow();
        if (Array.isArray(data)) {
          setHistory(data);
          setTotalPages(Math.ceil(data.length / PAGE_SIZE));
        } else {
          console.error('Ожидался массив, но пришло:', data);
        }
      } catch (error) {
        console.error('Ошибка при получении персонала:', error);
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
      <NavMenuAdmin/>

      <div className='mainPage'>
      <div className='moreMainPage'>
      <h2 className="history-title">Парковка в данный момент</h2>
      {error && <p>{error}</p>}
      {currentData.length === 0 ? (
        <p>История пуста.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="history-table">
            <thead>
              <tr>
                <th>Номер авто</th>
                <th>Марка</th>
                <th>Модель</th>
                <th>Цвет</th>
                <th>Въезд</th>
                <th>Выезд</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.color}</td>
                  <td>{entry.carPlate}</td>
                  <td>{entry.brand}</td>
                  <td>{entry.model}</td>
                  <td>{entry.entryTime}</td>
                  <td>{entry.exitTime}</td>
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
    </div>
    </div>
  );
};

export default ParkinNow;