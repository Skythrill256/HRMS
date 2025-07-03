import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaFolderOpen, FaBriefcase, FaIndustry } from 'react-icons/fa';
import { IoPeople } from "react-icons/io5";
const InitialDashboardContent = () => {

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000); // update every second

        return () => clearInterval(interval); // cleanup
    }, []);

    const weekday = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
    const date = dateTime.getDate();
    const month = dateTime.toLocaleString('default', { month: 'long' });
    const year = dateTime.getFullYear();
    const time = dateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });


    const [weather, setWeather] = useState({
        temp: '',
        condition: '',
        icon: '', // This will be used now
        city: ''
    });

    const cardData = [
        { title: "TOTAL EMPLOYEE", value: 30, link: "/employees", icon: <FaUsers /> },
        { title: "TOTAL PROJECT", value: 55, link: "/projects", icon: <FaFolderOpen /> },
        { title: "TOTAL CLIENT", value: 18, link: "/clients", icon: <FaBriefcase /> },
        { title: "PRODUCTION", value: "Active", link: "/production", icon: <FaIndustry /> },
        { title: "INTERN", value: 8, link: "/INTERN", icon: <IoPeople /> }
    ];


    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        const API_KEY = 'b24fd8e562a33a541ee63e704978a615';
        const fetchWeatherByCoords = async (lat, lon) => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setWeather({
                    temp: `${Math.round(data.main.temp)}°C`,
                    condition: data.weather[0].main,
                    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                    city: data.name
                });
            } catch (error) {
                console.error("Weather fetch error:", error);
                setWeather({
                    temp: '',
                    condition: 'N/A',
                    icon: '',
                    city: 'N/A'
                });
            }
        };

        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherByCoords(latitude, longitude);
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                        fetchWeatherByCoords(22.5726, 88.3639); // Kolkata coordinates
                        setWeather(prevWeather => ({ ...prevWeather, city: 'Kolkata (Default)' }));
                    }
                );
            } else {
                console.log("Geolocation not supported by this browser.");
                fetchWeatherByCoords(22.5726, 88.3639); // Kolkata coordinates
                setWeather(prevWeather => ({ ...prevWeather, city: 'Kolkata (Default)' }));
            }
        };

        getUserLocation();
    }, []);


    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };


    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };



    // taskbar and graph section

    const [tasks, setTasks] = useState([
        { id: 1, title: "Fix login bug", status: "In Progress", completed: false },
        { id: 2, title: "Create Employee Profile Page", status: "Completed", completed: true },
        { id: 3, title: "Update Client Records", status: "Pending", completed: false }
    ]);

    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? {
                    ...task,
                    completed: !task.completed,
                    status: !task.completed ? "Completed" : "Pending"
                }
                : task
        ));
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };


    return (
        <div className="p-4 md:p-6 bg-background dark:bg-gray-900 mt-8 rounded-lg shadow-lg transition-colors duration-300">

            {/* Main Header Section */}
            <div
                class="bg-card dark:bg-gray-800 flex flex-col md:flex-row flex-wrap items-start md:items-center p-4 rounded-lg shadow-sm justify-between gap-4 relative"
            >
                <div class="flex items-center gap-3 w-full md:w-auto">
                    <img
                        src="https://randomuser.me/api/portraits/men/9.jpg"
                        alt="Profile"
                        class="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-blue-500 object-cover"
                    />
                    <div class="flex flex-col text-sm md:text-base">
                        <h2 class="text-[#1E90FF] dark:text-white font-semibold">Hi, (User)</h2>
                        <p class="text-[#e45858] dark:text-gray-300 font-medium">
                            Welcome back, Indomitech Group
                        </p>
                    </div>
                </div>

                <div class="text-sm md:text-base order-last md:order-none w-full sm:w-auto text-left sm:text-right md:text-left">
                    <p class="text-[#1E90FF] dark:text-gray-300 font-semibold">{weekday}</p>
                    <p class="text-[#1E90FF] dark:text-gray-300">
                        {date} {month} {year}
                    </p>
                </div>

                <div class="text-[#1E90FF] dark:text-gray-300 text-xl font-semibold order-last md:order-none w-full sm:w-auto text-left sm:text-center md:text-left">
                    {time}
                </div>

                <div class="flex items-center gap-2 text-sm md:text-base text-[#e45858] font-semibold order-last md:order-none w-full sm:w-auto justify-start sm:justify-end md:justify-start">
                    {weather.icon && (
                        <img
                            src={weather.icon}
                            alt="Weather icon"
                            class="w-8 h-8 md:w-10 md:h-10"
                        />
                    )}
                    {weather.temp && <span>{weather.temp}</span>}
                    {weather.condition && <span>| {weather.condition}</span>}
                </div>
            </div>




            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                {cardData.map((card, index) => (
                    <Link to={card.link} key={index} className="block">
                        <div
                            className={`rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl
                                bg-card dark:bg-gray-800 p-6 flex items-center gap-4`}
                        >
                            <div className="text-blue-600 dark:text-blue-400 text-4xl">
                                {card.icon}
                            </div>
                            <div className="flex flex-col">
                                <h5 className="mb-1 text-2xl md:text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
                                    {card.value}
                                </h5>
                                <p className="text-sm md:text-md font-bold text-indigo-600 dark:text-indigo-400">
                                    {card.title}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>




            {/* task bar and graph section */}

            <div className="flex flex-col lg:flex-row gap-4 w-full  md:p-6 bg-background dark:bg-gray-900">

                {/* Taskbar Section */}
                <div className="bg-card dark:bg-gray-800 rounded-lg shadow-md p-4 w-full lg:w-1/2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tasks</h3>
                    <ul className="space-y-3">
                        {tasks.map(task => (
                            <li
                                key={task.id}
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-md"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task.id)}
                                        className="accent-green-500"
                                    />
                                    <span
                                        className={`text-gray-800 dark:text-white ${task.completed ? 'line-through' : ''}`}
                                    >
                                        {task.title}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                                    <button
                                        onClick={() => removeTask(task.id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                    {task.completed && (
                                        <span className="px-2 py-1 text-sm rounded-full bg-green-500 text-white">
                                            Completed
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Graph Section */}
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