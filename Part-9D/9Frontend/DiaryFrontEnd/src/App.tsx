import { useState, useEffect } from 'react';
import { Diary } from './types';
import diaryService from './services/diaries';

function App(): JSX.Element {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    const fetchDiaryList = async () => {
      try {
        const diaries = await diaryService.getAll();
        setDiaries(diaries);
      } catch (error) {
        console.error("Failed to fetch diaries", error);
      }
    };
    fetchDiaryList();
  }, []);

  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map(diary =>
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      )};
    </div>
  );
};

export default App;
