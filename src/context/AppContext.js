import { createContext, useContext, useState, useEffect } from "react";

// Utilities
import {
  getDates,
  getCovidData,
  getLastMonthData,
  calcLastMonthData,
  getCountriesLastMonthData,
} from "./calcs";

const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [mapData, setMapData] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [lastMonthData, setLastMonthData] = useState([]);
  const [lastMonthCountriesData, setLastMonthCountriesData] = useState([]);
  const [lastMonthCases, setLastMonthCases] = useState(0);
  const [lastMonthDeaths, setLastMonthDeaths] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [longAndLat, setLongAndLat] = useState([0, 0]);

  useEffect(() => {
    getDates(setTodayDate, setStartDate);
    getCovidData(setMapData, setTotalCases, setTotalDeaths);
    getLastMonthData(setLastMonthData);
    getCountriesLastMonthData(setLastMonthCountriesData);
  }, []);

  useEffect(() => {
    calcLastMonthData(
      lastMonthData,
      setLastMonthCases,
      setLastMonthDeaths,
      startDate,
      todayDate
    );
    setIsLoading(false);
  }, [lastMonthData, startDate, todayDate]);

  const contextValue = {
    mapData,
    totalCases,
    totalDeaths,
    lastMonthData,
    lastMonthCases,
    lastMonthDeaths,
    setTodayDate,
    setStartDate,
    startDate,
    todayDate,
    lastMonthCountriesData,
    longAndLat,
    setLongAndLat,
    isLoading,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default AppContext;
