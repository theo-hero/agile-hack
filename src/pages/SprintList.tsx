import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export interface SprintTypes {
  sprint_name: string;
  sprint_status: string;
  sprint_start_date: string;
  sprint_end_date: string;
  entity_ids: number[];
}

interface TransformedSprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

const SprintList = () => {
  const [sprints, setSprints] = useState<SprintTypes[]>([]);
  const [sortedSprints, setSortedSprints] = useState<TransformedSprint[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const formatSprints = (data: SprintTypes[]): TransformedSprint[] => {
    return data.map((sprint, index) => ({
      id: index + 1,
      name: sprint.sprint_name,  
      startDate: sprint.sprint_start_date.split('T')[0],  
      endDate: sprint.sprint_end_date.split('T')[0],
      status: sprint.sprint_status,
    }));
  };

  useEffect(() => {

    const fetchSprints = async () => {
      try {
        const response = await axios.get('/sprint/all');
        const fetchedSprints: SprintTypes[] = response.data;
        setSprints(fetchedSprints);
        setSortedSprints(formatSprints(fetchedSprints));
      } catch (error) {
        console.error('Error fetching sprints:', error);
        console.log(sprints);
      }
    };

    fetchSprints();
  }, []);

  const sortSprints = (key: keyof TransformedSprint) => {
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
            <div className="sprint-items__item">
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
