import { extractEventHandlers } from "@mui/base";
import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import SelectWeather from "./components/SelectWeather";
import TodoList from "./components/TodoList";
import initialTodos from "./data";
import { nanoid } from "nanoid";

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [weatherStatus, setWeatherStatus] = useState({});
  const [currentFilter, setCurrentFilter] = useState("current");

  useEffect(() => {
    // You do not need to change anything in this useEffect
    async function determineCurrentWeather() {
      try {
        const location = await getUserLocation();
        const weatherCode = await getWeatherData(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeatherStatus(convertWeatherCodeToEmoji(weatherCode));
      } catch (error) {
        console.error(error);
      }
    }
    determineCurrentWeather();
  }, []);

  // Function to get the current location of the user
  function getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  // Function to toggle Checkboxes
  function toggleCheckbox(todoId) {
    setTodos(
      todos.map((item) => {
        if (item.id === todoId) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        } else return item;
      })
    );
  }

  function addTodo(title, weather) {
    console.log(title + " - " + weather);
    const newTodo = {
      id: nanoid(),
      title: title,
      isChecked: false,
      weather: weather,
    };

    console.log(newTodo);
    console.log(todos);
    console.log([...todos, newTodo]);

    const newArray = [...todos, newTodo];

    setTodos(newArray);
  }

  // Function to convert the fetched weather code to our weather status object
  function convertWeatherCodeToEmoji(weatherCode) {
    switch (weatherCode) {
      case 0:
        return { emoji: "☀️", weather: "good" };
      case 1:
        return { emoji: "🌤", weather: "good" };
      case 2:
        return { emoji: "🌥", weather: "good" };
      case 3:
        return { emoji: "☁️", weather: "good" };
      default:
        return { emoji: "💩", weather: "bad" };
    }
  }

  // Function to fetch the weather data for the user's location
  async function getWeatherData(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (response.ok) {
        const data = await response.json();
        return data.current_weather.weathercode;
      }
    } catch (error) {
      console.error(error);
    }
    return 0;
  }

  // Function to save the selected weather filter
  function handleWeatherSelect(event) {
    setCurrentFilter(event.target.value);
  }

  // Function to filter the ToDos according to the selected filter
  function filterTodos(currentFilter) {
    switch (currentFilter) {
      case "current":
        return todos.filter(
          (todo) =>
            todo.weather === weatherStatus.weather || todo.weather === "always"
        );
      case "always":
      case "good":
      case "bad":
        return todos.filter((todo) => todo.weather === currentFilter);
      case "all":
      default:
        return todos;
    }
  }

  const filteredTodos = filterTodos(currentFilter);

  return (
    <>
      <Header />
      <main>
        <InfoBox emoji={weatherStatus.emoji} />
        <SelectWeather handleChange={handleWeatherSelect} />
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={filteredTodos.filter((todo) => !todo.isChecked)}
          toggleCheckbox={toggleCheckbox}
          title="Open ToDos"
        />
        <TodoList
          todos={filteredTodos.filter((todo) => todo.isChecked)}
          toggleCheckbox={toggleCheckbox}
          title="Done"
        />
      </main>
    </>
  );
}

export default App;
