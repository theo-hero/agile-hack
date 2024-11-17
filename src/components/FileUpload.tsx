import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

export interface SprintTypes {  
  sprint_name: string;
  sprint_status: string;
  sprint_start_date: string;
  sprint_end_date: string;
  entity_ids: number[];
}

// interface CsvRow {
//   [key: string]: string | number;
// }

interface UploadProps {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUpload = ({ setAdd }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<SprintTypes[]>([]);

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

          const parsedData: SprintTypes[] = rows.map((row) => {
            const sprintData: SprintTypes = {
              sprint_name: '',
              sprint_status: '',
              sprint_start_date: '',
              sprint_end_date: '',
              entity_ids: []
            };

            row.forEach((cell, index) => {
              const header = headers[index];
              if (header) {
                // Format each cell value before assigning it
                const formattedValue = formatValue(header, cell);

                switch (header) {
                  case 'sprint_name':
                    sprintData.sprint_name = formattedValue as string;
                    break;
                  case 'sprint_status':
                    sprintData.sprint_status = formattedValue as string;
                    break;
                  case 'sprint_start_date':
                    sprintData.sprint_start_date = formattedValue as string;
                    break;
                  case 'sprint_end_date':
                    sprintData.sprint_end_date = formattedValue as string;
                    break;
                  case 'entity_ids': 
                    // Assuming the entity_ids is a comma-separated string of numbers
                    sprintData.entity_ids = typeof formattedValue === 'string' 
  ? formattedValue.split(',').map(Number) 
  : [];
                    break;
                  default:
                    break;
                }
              }
            });

            return sprintData;
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

  const sendJsonData = async (data: SprintTypes[]) => {
    try {
      const response = await axios.post('/sprints/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      alert('Файл успешно загружен!');
    } catch (error) {
      console.error('Ошибка загрузки:', error);
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

    // For entity_ids or other number-related columns, we just return the value as it is
    if (header === 'entity_ids') {
      return value;  // Keep it as string until we handle it in the specific case
    }

    // Return the value as is if it's not a date
    return value;
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

export default FileUpload;
