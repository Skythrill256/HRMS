import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaFolderOpen, FaBriefcase, FaIndustry } from 'react-icons/fa';
import { IoPeople } from "react-icons/io5";

const InitialDashboardContent = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [customDate, setCustomDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const weekday = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
  const date = dateTime.getDate();
  const month = dateTime.toLocaleString('default', { month: 'long' });
  const year = dateTime.getFullYear();
  const time = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  });

  const [weather, setWeather] = useState({ temp: '', condition: '', icon: '', city: '' });

  useEffect(() => {
    const API_KEY = 'b24fd8e562a33a541ee63e704978a615';
    const fetchWeatherByCoords = async (lat, lon) => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        setWeather({
          temp: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          city: data.name
        });
      } catch {
        setWeather({ temp: '', condition: 'N/A', icon: '', city: 'N/A' });
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => {
          fetchWeatherByCoords(22.5726, 88.3639);
          setWeather(prev => ({ ...prev, city: 'Kolkata (Default)' }));
        }
      );
    } else {
      fetchWeatherByCoords(22.5726, 88.3639);
      setWeather(prev => ({ ...prev, city: 'Kolkata (Default)' }));
    }
  }, []);

  const cardData = [
    { title: "TOTAL EMPLOYEE", value: 30, link: "/employees", icon: <FaUsers /> },
    { title: "TOTAL PROJECT", value: 55, link: "/projects", icon: <FaFolderOpen /> },
    { title: "TOTAL CLIENT", value: 18, link: "/clients", icon: <FaBriefcase /> },
    { title: "PRODUCTION", value: "Active", link: "/production", icon: <FaIndustry /> },
    { title: "INTERN", value: 8, link: "/INTERN", icon: <IoPeople /> },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix login bug", completed: false, dueDate: new Date() },
    { id: 2, title: "Create Employee Profile Page", completed: false, dueDate: new Date() },
    { id: 3, title: "Update Client Records", completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() - 1)) },
    { id: 4, title: "Generate Bill", completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() - 1)) },
    { id: 5, title: "Plan tomorrow's deployment", completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 1)) },
  ]);

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const stripTime = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const filteredTasks = tasks.filter(task => {
    const today = stripTime(new Date());
    const taskDate = stripTime(new Date(task.dueDate));

    if (filter === "today") return taskDate.getTime() === today.getTime();
    if (filter === "tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return taskDate.getTime() === tomorrow.getTime();
    }
    if (filter === "overdue") return taskDate < today && !task.completed;
    if (filter === "custom" && customDate) {
      const selected = stripTime(new Date(customDate));
      return taskDate.getTime() === selected.getTime();
    }
    return true;
  });

  return (
    <div className="p-4 md:p-6 bg-background dark:bg-gray-900 mt-8 rounded-lg shadow-lg">
      <div className="bg-card dark:bg-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="Profile" className="w-14 h-14 rounded-full border-2 border-blue-500" />
          <div>
            <h2 className="text-[#1E90FF] dark:text-white font-semibold">Hi, (User)</h2>
            <p className="text-[#e45858] dark:text-gray-300 font-medium">Welcome back, Indomitech Group</p>
          </div>
        </div>
        <div className="text-right text-[#1E90FF] dark:text-gray-300">
          <p className="font-semibold">{weekday}</p>
          <p>{date} {month} {year}</p>
        </div>
        <div className="text-[#1E90FF] dark:text-gray-300 text-xl font-semibold">{time}</div>
        <div className="flex items-center gap-2 text-[#e45858] font-semibold">
          {weather.icon && <img src={weather.icon} alt="Weather" className="w-8 h-8" />}
          {weather.temp && <span>{weather.temp}</span>}
          {weather.condition && <span>| {weather.condition}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {cardData.map((card, i) => (
          <Link to={card.link} key={i} className="block">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl flex items-center gap-4">
              <div className="text-blue-600 dark:text-blue-400 text-4xl">{card.icon}</div>
              <div>
                <h5 className="text-3xl font-bold text-gray-800 dark:text-white">{card.value}</h5>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{card.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-card dark:bg-gray-800 rounded-lg shadow-md p-4 w-full lg:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Tasks</h3>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="all">All Task</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="overdue">Overdue</option>
              <option value="custom">Custom Date</option>
            </select>
          </div>

          {filter === "custom" && (
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="mb-4 px-3 py-1 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          )}

          <ul className="space-y-3">
            {filteredTasks.map(task => {
              const isOverdue = !task.completed && stripTime(new Date(task.dueDate)) < stripTime(new Date());
              return (
                <li key={task.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="accent-green-500"
                    />
                    <span className={`text-gray-800 dark:text-white ${task.completed ? 'line-through' : ''}`}>{task.title}</span>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
                    <button onClick={() => removeTask(task.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">Remove</button>
                    {task.completed && <span className="px-2 py-1 text-sm rounded-full bg-green-500 text-white">Completed</span>}
                    {isOverdue && <span className="px-2 py-1 text-sm rounded-full bg-yellow-500 text-white">Overdue</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-card dark:bg-gray-800 rounded-lg shadow-md p-6 w-full lg:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Performance Overview</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>[Graph will be displayed here]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialDashboardContent;
