import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

export interface TaskTypes {
  entity_id: number;
  area: string;
  type: string;
  status: string;
  state: string;
  priority: string;
  ticket_number: string;
  name: string;
  create_date: string;
  created_by: string;
  update_date: string;
  updated_by: string;
  parent_ticket_id: number | null;
  assignee: string;
  owner: string;
  due_date: string | null;
  rank: string;
  estimation: number | null;
  spent: string | null;
  resolution: string | null;
}

// interface CsvRow {
//   [key: string]: string | number;
// }

interface UploadProps {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUploadTasks = ({ setAdd }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<TaskTypes[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Пожалуйста, выберите файл с расширением .csv.');
      setFile(null);
      console.log(jsonData);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Пожалуйста, выберите файл.');
      return;
    }

    parseCsvFile(file);
  };

  const parseCsvFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      Papa.parse(fileContent, {
        complete: (result) => {
          const data = result.data as string[][];

          const headers = data[1]; // Assuming headers are on the second row
          const rows = data.slice(2);

          const parsedData: TaskTypes[] = rows.map((row) => {
            const taskData: TaskTypes = {
              entity_id: 0,
              area: '',
              type: '',
              status: '',
              state: '',
              priority: '',
              ticket_number: '',
              name: '',
              create_date: '',
              created_by: '',
              update_date: '',
              updated_by: '',
              parent_ticket_id: null,
              assignee: '',
              owner: '',
              due_date: null,
              rank: '',
              estimation: null,
              spent: null,
              resolution: null
            };

            row.forEach((cell, index) => {
              const header = headers[index];
              if (header) {
                const formattedValue = formatValue(header, cell);

                switch (header) {
                  case 'entity_id':
                    taskData.entity_id = Number(formattedValue);
                    break;
                  case 'area':
                    taskData.area = formattedValue as string;
                    break;
                  case 'type':
                    taskData.type = formattedValue as string;
                    break;
                  case 'status':
                    taskData.status = formattedValue as string;
                    break;
                  case 'state':
                    taskData.state = formattedValue as string;
                    break;
                  case 'priority':
                    taskData.priority = formattedValue as string;
                    break;
                  case 'ticket_number':
                    taskData.ticket_number = formattedValue as string;
                    break;
                  case 'name':
                    taskData.name = formattedValue as string;
                    break;
                  case 'create_date':
                    taskData.create_date = formattedValue as string;
                    break;
                  case 'created_by':
                    taskData.created_by = formattedValue as string;
                    break;
                  case 'update_date':
                    taskData.update_date = formattedValue as string;
                    break;
                  case 'updated_by':
                    taskData.updated_by = formattedValue as string;
                    break;
                  case 'parent_ticket_id':
                    taskData.parent_ticket_id = formattedValue === 'null' ? null : Number(formattedValue);
                    break;
                  case 'assignee':
                    taskData.assignee = formattedValue as string;
                    break;
                  case 'owner':
                    taskData.owner = formattedValue as string;
                    break;
                  case 'due_date':
                    taskData.due_date = formattedValue ? formattedValue as string : null;
                    break;
                  case 'rank':
                    taskData.rank = formattedValue as string;
                    break;
                  case 'estimation':
                    taskData.estimation = formattedValue ? formattedValue as string : null;
                    break;
                  case 'spent':
                    taskData.spent = formattedValue ? formattedValue as string : null;
                    break;
                  case 'resolution':
                    taskData.resolution = formattedValue ? formattedValue as string : null;
                    break;
                  default:
                    break;
                }
              }
            });

            return taskData;
          });

          setJsonData(parsedData);
          sendJsonData(parsedData);
          console.log(parsedData);
        },
        skipEmptyLines: true,
        delimiter: ';',
      });
    };
    reader.readAsText(file);
  };

  const sendJsonData = async (data: CsvRow[]) => {
    try {
      const formattedData = data.map((row) => {
        const task: TaskTypes = {
          entity_id: Number(row["entity_id"]),
          area: String(row["area"]),
          type: String(row["type"]),
          status: String(row["status"]),
          state: String(row["state"]),
          priority: String(row["priority"]),
          ticket_number: String(row["ticket_number"]),
          name: String(row["name"]),
          create_date: String(row["create_date"]),
          created_by: String(row["created_by"]),
          update_date: String(row["update_date"]),
          updated_by: String(row["updated_by"]),
          parent_ticket_id: row["parent_ticket_id"] ? Number(row["parent_ticket_id"]) : null,
          assignee: String(row["assignee"]),
          owner: String(row["owner"]),
          due_date: row["due_date"] ? String(row["due_date"]) : null,
          rank: String(row["rank"]),
          estimation: row["estimation"] ? parseFloat(String(row["estimation"])) : null, // Ensure it's a number
          spent: row["spent"] ? String(row["spent"]) : null,
          resolution: row["resolution"] ? String(row["resolution"]) : null,
        };
        return task;
      });
  
      const response = await axios.post("/tasks/add", formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      alert("Файл успешно загружен!");
      setAdd(false); // Close the upload window
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };
  

  // This function checks if the value is a valid date
  const formatValue = (header: string, value: string | number): string | number => {
    if (typeof value === 'string') {
      // Check if the string looks like a date
      const date = new Date(value);
      // If it's a valid date string, return the ISO format
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    }
    return value;  // Return value as is for non-date fields
  };

  return (
    <div className="upload-box">
      <button className="button_round" onClick={() => setAdd(false)}></button>
      <h2>Добавить файл CSV</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Загрузить</button>
      </form>
    </div>
  );
};

export default FileUploadTasks;
