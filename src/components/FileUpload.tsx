import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

interface CsvRow {
  [key: string]: string | number;
}

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [txtData, setTxtData] = useState<string[][]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (selectedFile.type === 'text/csv') {
        setFile(selectedFile);
      } else if (selectedFile.type === 'text/plain') {
        setFile(selectedFile);
      } else {
        alert('Пожалуйста, выберите файл с расширением .csv или .txt.');
        setFile(null);
      }
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

    if (file.type === 'text/csv') {
      parseCsvFile(file);
    } else if (file.type === 'text/plain') {
      parseTxtFile(file);
    }
  };

  const parseCsvFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      Papa.parse(fileContent, {
        complete: (result) => {
          const parsedData = result.data.slice(1) as CsvRow[]; 
          setCsvData(parsedData);
          console.log('Результат парсинга CSV:', parsedData);
        },
        header: true,
        skipEmptyLines: true, 
        dynamicTyping: true, 
      });
    };
    reader.readAsText(file);
  };

  const parseTxtFile = (file: File) => { // работает плохо, лучше не надо!
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      const lines = fileContent.split('\n').map(line => line.trim());
      const parsedData = lines.map(line => {
        const values = line
          .replace(/"/g, '')
          .split(',') 
          .map(value => value.trim());
        return values;
      });
      setTxtData(parsedData);
      console.log('Результат парсинга TXT:', parsedData);
    };
    reader.readAsText(file);
  };

  return (
    <div className="upload-box">
      <h2>Добавить файл (CSV или TXT)</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Загрузить</button>
      </form>
      {/* {csvData.length > 0 && (
        <div>
          <h3>Загруженные данные (CSV)</h3>
          <pre>{JSON.stringify(csvData, null, 2)}</pre>
        </div>
      )}
      {txtData.length > 0 && (
        <div>
          <h3>Загруженные данные (TXT)</h3>
          <pre>{JSON.stringify(txtData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default FileUpload;
