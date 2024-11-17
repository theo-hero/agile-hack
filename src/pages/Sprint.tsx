import { useState } from "react";
import Health from "../components/Health";
import Timeline from "../components/Timeline";
import { SprintTypes } from "../types";
import ProgressBar from "../components/ProgressBar";
import SidePanel from "../components/SidePanel";
import FileUploadTasks from "../components/FileUploadTasks";

interface SprintProps {
  sprint: SprintTypes;
}

function Sprint({ sprint }: SprintProps) {
  const [dataPart, setDataPart] = useState(0);
  const [add, setAdd] = useState(false); // Local state to control file upload window visibility

  const options = ["Общая информация", "Данные о задачах", "Изменения в задачах", "Здоровье"];

  const addTasksInfo = () => {
    setAdd(true); // Show file upload window for tasks
  };

  const addChangeInfo = () => {
    setAdd(true); // Show file upload window for changes
  };

  const updateStatus = () => {
    console.log(sprint);
    // Update status logic
  };

  const getTasks = () => {
    // Fetch tasks logic
    console.log(sprint);
  };

  let content;

  switch (dataPart) {
    case 0:
      content = <ProgressBar done={15} toDo={20} inProgress={15} old={50} />;
      break;
    case 1:
      content = <button onClick={addTasksInfo}>Добавить файл с задачами</button>;
      break;
    case 2:
      content = <button onClick={addChangeInfo}>Добавить файл с изменениями</button>;
      break;
    case 3:
      content = (
        <div className="elements">
          <Health />
          <div className="timeline-container">
            <Timeline min={0} max={16} step={1} value={8} />
          </div>
        </div>
      );
      break;
    default:
      content = null;
      updateStatus();
      getTasks();
  }

  return (
    <main>
      {content}
      <SidePanel options={options} setDataPart={setDataPart} />
      {add && <FileUploadTasks setAdd={setAdd} />}
    </main>
  );
}

export default Sprint;
