import React from 'react';

interface ProgressBarProps {
  done: number;
  inProgress: number;
  toDo: number;
  old: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ done, inProgress, toDo, old }) => {
  const totalPercentage = done + inProgress + toDo + old;

  if (totalPercentage !== 100) {
    return <div>Не удалось построить</div>;
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-bar done" style={{ width: `${done}%` }} />
      <div className="progress-bar in-progress" style={{ width: `${inProgress}%` }} />
      <div className="progress-bar to-do" style={{ width: `${toDo}%` }} />
      <div className="progress-bar old" style={{ width: `${old}%` }} />
    </div>
  );
};

export default ProgressBar;
