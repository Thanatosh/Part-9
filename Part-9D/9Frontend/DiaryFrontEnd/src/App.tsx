import { useState, useEffect } from 'react';
import { Diary, Weather, Visibility} from './types';
import diaryService from './services/diaries';

function App(): JSX.Element {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  
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

  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryEntryToAdd: Diary = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }
    try {
      const newDiary = await diaryService.createDiaryEntry(diaryEntryToAdd);
      setDiaries(diaries.concat(newDiary));
      setDate('');
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setComment('');
    } catch (error) {
      console.error("Failed to create Diary entry", error);
    }
  }

  return (
    <div>
      <form onSubmit={diaryEntryCreation}>
        <div>
          <label>Date: </label>
          <input value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          <label>Weather: </label>
          <select value={weather} onChange={(event) => setWeather(event.target.value as Weather)}>
            {Object.values(Weather).map(weatherOption => (
              <option key={weatherOption} value={weatherOption}>
                {weatherOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Visibility: </label>
          <select value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)}>
            {Object.values(Visibility).map(visibilityOption => (
              <option key={visibilityOption} value={visibilityOption}>
                {visibilityOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Comment: </label>
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>Add</button>
      </form>
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
