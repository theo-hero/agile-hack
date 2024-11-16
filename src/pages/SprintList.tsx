import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

const SprintList = () => {
  const sprints = [
    {
      id: 1,
      name: 'Спринт 1',
      startDate: '2024-07-01',
      endDate: '2024-07-15',
      status: 'Закрыт',
    },
    {
      id: 2,
      name: 'Спринт 2',
      startDate: '2024-07-16',
      endDate: '2024-07-30',
      status: 'В процессе',
    },
    {
      id: 3,
      name: 'Спринт 3',
      startDate: '2024-08-01',
      endDate: '2024-08-15',
      status: 'Закрыт',
    },
  ];

  const [sortedSprints, setSortedSprints] = useState<Sprint[]>(sprints);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortSprints = (key: keyof Sprint) => {
    const sorted = [...sortedSprints].sort((a, b) => {
      if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedSprints(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="sprint-list">
      <div className="sort-controls">
        <button onClick={() => sortSprints('name')}>По названию</button>
        <button onClick={() => sortSprints('startDate')}>По дате начала</button>
        <button onClick={() => sortSprints('endDate')}>По дате завершения</button>
        <button onClick={() => sortSprints('status')}>По статусу</button>
      </div>
      <div className="sprint-items">
        {sortedSprints.map((sprint) => (
          <Link to={`/sprints/${sprint.id}`} key={sprint.id}>
            <div className="sprint-items__item" key={sprint.id}>
              <h3>{sprint.name}</h3>
              <p><strong>Начат:</strong> {sprint.startDate}</p>
              <p><strong>Завершён:</strong> {sprint.endDate}</p>
              <p><strong>Статус:</strong> {sprint.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SprintList;
