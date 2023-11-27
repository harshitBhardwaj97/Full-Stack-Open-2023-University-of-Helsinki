import { useEffect, useState } from "react";
import axios from "axios";
import { createEntry } from "../services/diary-service";

const AddNewDiary = () => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const filterSelected = (name: string, value: string) => {
    if (name === "visibility") {
      setVisibility(value);
    }
    if (name === "weather") {
      setWeather(value);
    }
  };

  useEffect(() => {}, [isSuccess]);

  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry = {
      date: event.target.date.value,
      weather,
      visibility,
      comment: event.target.comment.value,
    };
    console.log(newDiaryEntry);

    try {
      const data = await createEntry(newDiaryEntry);
      console.log(data);
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setIsSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response?.data);
        alert(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add Diary</legend>
          <label htmlFor="date">
            Date :
            <input
              type="date"
              name="date"
              id="date"
              required
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            {/* {date} */}
          </label>
          <br />
          <label htmlFor="visibility">
            Visibility :
            <input
              type="radio"
              name="visibility"
              id="great-visibility"
              required
              onChange={() => filterSelected("visibility", "great")}
            />
            <label>Great</label>
            <input
              type="radio"
              name="visibility"
              id="good-visibility"
              onChange={() => filterSelected("visibility", "good")}
            />
            <label>Good</label>
            <input
              type="radio"
              name="visibility"
              id="ok-visibility"
              onChange={() => filterSelected("visibility", "ok")}
            />
            <label>Ok</label>
            <input
              type="radio"
              name="visibility"
              id="poor-visibility"
              onChange={() => filterSelected("visibility", "poor")}
            />
            <label>Poor</label>
          </label>
          <br />
          {/* {visibility} */}
          <br />
          <label htmlFor="weather">
            Weather :
            <input
              type="radio"
              name="weather"
              id="sunny-weather"
              required
              onChange={() => filterSelected("weather", "sunny")}
            />
            <label>Sunny</label>
            <input
              type="radio"
              name="weather"
              id="rainy-weather"
              onChange={() => filterSelected("weather", "rainy")}
            />
            <label>Rainy</label>
            <input
              type="radio"
              name="weather"
              id="cloudy-weather"
              onChange={() => filterSelected("weather", "cloudy")}
            />
            <label>Cloudy</label>
            <input
              type="radio"
              name="weather"
              id="stormy-weather"
              onChange={() => filterSelected("weather", "stormy")}
            />
            <label>Stormy</label>
            <input
              type="radio"
              name="weather"
              id="windy-weather"
              onChange={() => filterSelected("weather", "windy")}
            />
            <label>Windy</label>
          </label>
          <br />
          {/* {weather} */}
          <br />
          <label htmlFor="comment">
            Comment :
            <input
              type="text"
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            {/* {comment} */}
          </label>
          <br />
          <button type="submit">Add</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddNewDiary;
