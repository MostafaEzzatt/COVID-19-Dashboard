import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useGlobalContext } from "../../context/AppContext";
import { minusByBiggervalue } from "../../context/calcs";

const Item = ({ item }) => {
  const { startDate, todayDate, lastMonthCountriesData, setLongAndLat } =
    useGlobalContext();
  const [countryLastMonthCases, setCountryLastMonthCases] = useState(0);
  const [countryLastMonthDeaths, setCountryLastMonthDeaths] = useState(0);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const counteryIdx = lastMonthCountriesData.findIndex(
      (country) => country.country == item.country
    );

    if (counteryIdx == -1) {
      setNotFound(true);
    } else {
      setCountryLastMonthCases(
        minusByBiggervalue(
          lastMonthCountriesData[counteryIdx].timeline.cases[startDate],
          lastMonthCountriesData[counteryIdx].timeline.cases[todayDate]
        )
      );

      setCountryLastMonthDeaths(
        minusByBiggervalue(
          lastMonthCountriesData[counteryIdx].timeline.deaths[startDate],
          lastMonthCountriesData[counteryIdx].timeline.deaths[todayDate]
        )
      );
    }
  }, [item, lastMonthCountriesData, startDate, todayDate]);

  if (notFound) return <></>;
  return (
    <li
      className="rounded bg-slate-600 py-2 px-2 cursor-pointer"
      onClick={() =>
        setLongAndLat([item.countryInfo.lat, item.countryInfo.long])
      }
    >
      <h6 className="text-slate-200 font-semibold text-lg">{item.country}</h6>
      <ul>
        <li className="text-slate-400">
          <span className="font-medium text-slate-300 mr-1">28-Day: </span>
          <span className="text-teal-500">{countryLastMonthCases}</span> |{" "}
          <span className="text-yellow-500">{countryLastMonthDeaths}</span>
        </li>
        <li className="text-slate-400">
          <span className="font-medium text-slate-300 mr-1">Today:</span>
          <span className="text-teal-500">{item.todayCases}</span> |{" "}
          <span className="text-yellow-500">{item.todayDeaths}</span>
        </li>
      </ul>
    </li>
  );
};

export default Item;
