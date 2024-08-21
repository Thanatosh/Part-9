import { useState, useEffect } from 'react';
import { Diary, Weather, Visibility} from './types';
import diaryService from './services/diaries';

const App = (): JSX.Element => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDiaryList = async () => {
      try {
        const diaries = await diaryService.getAll();
        setDiaries(diaries);
      } catch (error) {
        console.error("Failed to fetch diaries", error);
        setError("Failed to fetch diaries");
      }
    };
    void fetchDiaryList();
  }, []);

  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryEntryToAdd: Diary = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    };
    try {
      const newDiary = await diaryService.createDiaryEntry(diaryEntryToAdd);
      setDiaries(diaries.concat(newDiary));
      setDate('');
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setComment('');
      setError(null);
    } catch (error) {
      console.error("Failed to create Diary entry", error);
      setError("Failed to create Diary entry");
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>Add new entry</h1>
      <form onSubmit={(event) => { void diaryEntryCreation(event); }}>
        <div>
          <label>Date:
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
           </label>
        </div>
        <div>
        <label>Weather:
          {Object.values(Weather).map((weatherOption) => (
            <label key={weatherOption}>
              <input
                type="radio"
                name="weather"
                value={weatherOption}
                checked={weather === weatherOption}
                onChange={() => setWeather(weatherOption)}
              />
              {weatherOption}
            </label>
          ))}
        </label>
        </div>
        <div>
        <label>Visibility:
          {Object.values(Visibility).map((visibilityOption) => (
            <label key={visibilityOption}>
              <input
                type="radio"
                name="visibility"
                value={visibilityOption}
                checked={visibility === visibilityOption}
                onChange={() => setVisibility(visibilityOption)}
              />
              {visibilityOption}
            </label>
          ))}
        </label>
        </div>
        <div>
          <label>Comment:
          <input 
            name="comment"
            value={comment} 
            onChange={(event) => setComment(event.target.value)} 
          />
          </label>
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
