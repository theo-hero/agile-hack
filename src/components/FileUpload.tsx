import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface CsvRow {
  [key: string]: string | number;
}

interface UploadProps {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUpload = ({ setAdd }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<CsvRow[]>([]);

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
          const data = result.data as string[][]; // Parse the CSV into an array of arrays
          const headers = data[1]; // Extract headers from the second row (1st index)
          const rows = data.slice(2); // Extract rows starting from the third row

          // Log for debugging
          console.log('Headers:', headers);
          console.log('Rows:', rows);

          // Map the rows to objects with headers as keys
          const parsedData = rows.map((row) => {
            const rowObj: CsvRow = {};
            row.forEach((cell, index) => {
              const header = headers[index];
              if (header) {
                rowObj[header] = cell;
              }
            });
            return rowObj;
          });

          setJsonData(parsedData); // Set the state with the parsed JSON data
          sendJsonData(parsedData); // Optionally send data to the server
        },
        skipEmptyLines: true,
        delimiter: ';', // Ensure this matches your CSV delimiter
      });
    };
    reader.readAsText(file);
  };

  const sendJsonData = async (data: CsvRow[]) => {
    try {
      const response = await axios.post('/upload', data, {
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
