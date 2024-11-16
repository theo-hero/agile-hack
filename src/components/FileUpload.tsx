import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface CsvRow {
  [key: string]: string | number;
}

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Пожалуйста, выберите файл с расширением .csv.');
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Пожалуйста, выберите файл.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Файл успешно загружен!');
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      alert('Не получилось загрузить файл.');
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
          const headers: string[] = data[0];

          const parsedData = data.slice(1).map((row) => {
            const rowObj: CsvRow = {};
            row.forEach((cell, index) => {
              const header = headers[index];
              rowObj[header] = cell;
            });
            return rowObj;
          });

          setCsvData(parsedData);
          console.log('Результат парсинга CSV:', csvData);
        },
        skipEmptyLines: true,
        delimiter: ';',
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="upload-box">
      <h2>Добавить файл CSV</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Загрузить</button>
      </form>
    </div>
  );
};

export default FileUpload;
