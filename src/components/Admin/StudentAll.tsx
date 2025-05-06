import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllStudent } from '../../services/api';
import { StudentArray } from '../../types/types';
import { NavMenuAdmin } from '../NavMenu/NavMenuAdmin';

const PAGE_SIZE = 5;


export const StudentAll: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<StudentArray[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStudent();
        if (Array.isArray(data)) {
          setHistory(data);
          setTotalPages(Math.ceil(data.length / PAGE_SIZE));
        } else {
          console.error('Ожидался массив, но пришло:', data);
        }
      } catch (error) {
        console.error('Ошибка при получении студентов:', error);
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

  const goToStudent = (uuid: string) => {
    navigate(`/admin/student/${uuid}`);
  };

  return (
    <div className="history-container">
      <NavMenuAdmin/>

      <div className='mainPage'>
      <div className='moreMainPage'>
      <h2 className="history-title">Студенты</h2>
      {error && <p>{error}</p>}
      {currentData.length === 0 ? (
        <p>История пуста.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="history-table">
            <thead>
              <tr>
                <th>Почта</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Студенческий билет</th>
                <th>Факультет</th>
                <th>Курс</th>
                <th>Группа</th>
                <td>Действие</td>
              </tr>
            </thead>
            <tbody>
              {currentData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.email}</td>
                  <td>{entry.firstName}</td>
                  <td>{entry.middleName}</td>
                  <td>{entry.lastName}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.student_card}</td>
                  <td>{entry.faculty}</td>
                  <td>{entry.course}</td>
                  <td>{entry.groups}</td>
                  <td>
                  <button className="navmenu-logout-button" onClick={() => goToStudent(entry.id)}>Открыть</button>
                </td>
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

export default StudentAll;