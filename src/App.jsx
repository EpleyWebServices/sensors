import React from "react";

const SENSOR_URL = "http://sensors.local";

function App() {
  const [temp, setTemp] = React.useState(null);
  const [humidity, setHumidity] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Function to fetch temperature
  const fetchTemperature = async () => {
    try {
      const response = await fetch(`${SENSOR_URL}/temperature`);
      console.log(response);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.text();
      setTemp(parseFloat(data));
      setError(null);
    } catch (err) {
      setError("Error fetching temperature data");
      console.error(err);
    }
  };

  const fetchHumidity = async () => {
    try {
      const response = await fetch(`${SENSOR_URL}/humidity`);
      console.log(response);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.text();
      setHumidity(parseFloat(data));
      setError(null);
    } catch (err) {
      setError("Error fetching temperature data");
      console.error(err);
    }
  };

  // Fetch data on component mount and every 5 seconds
  React.useEffect(() => {
    fetchTemperature();
    fetchHumidity();
    const interval = setInterval(() => {
      fetchTemperature();
      fetchHumidity();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">📡 Sensors 📡</h1>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Temperature
            </h2>
            <p className="text-5xl font-bold text-blue-600">
              {temp !== null ? `${temp}°F` : "Loading..."}
            </p>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Humidity
            </h2>
            <p className="text-5xl font-bold text-blue-600">
              {humidity !== null ? `${humidity}%` : "Loading..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
