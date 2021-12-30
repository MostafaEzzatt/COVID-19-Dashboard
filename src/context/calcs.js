import { formateNumber } from "../utilities/formateNumber";

export const getDates = (setTodayDate, setStartDate) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  setTodayDate(`${month}/${day - 1}/${year.toString().slice(2)}`);
  setStartDate(`${month}/${day - 28}/${year.toString().slice(2)}`);
};

export const getCovidData = async (
  setMapData,
  setTotalCases,
  setTotalDeaths
) => {
  const fetchAPIAllCountries = await fetch(
    "https://corona.lmao.ninja/v3/covid-19/countries"
  );

  let responseAllCountries;
  try {
    responseAllCountries = await fetchAPIAllCountries.json();
  } catch (error) {
    console.log("ERROR : ", error);
    return;
  }
  setMapData(responseAllCountries);

  // getTotal Cases/Deaths
  let calcTotalCases = 0;
  let calcTotalDeaths = 0;
  responseAllCountries.map((country) => {
    calcTotalCases += +country.cases;
    calcTotalDeaths += +country.deaths;
  });

  setTotalCases(formateNumber(calcTotalCases));
  setTotalDeaths(formateNumber(calcTotalDeaths));
};

export const getLastMonthData = async (setLastMonthData) => {
  const fetchLastMonthData = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=28"
  );

  let responseLastMonthData;

  try {
    responseLastMonthData = await fetchLastMonthData.json();
  } catch (error) {
    console.log("ERROR : ", error);
  }

  setLastMonthData(responseLastMonthData);
};

export const calcLastMonthData = (
  lastMonthData,
  setLastMonthCases,
  setLastMonthDeaths
) => {
  if (Object.keys(lastMonthData).length == 0) return;

  const keys = getFirstAndLastKeyOfObject(lastMonthData.cases);

  const calcLastMonthCases = minusByBiggervalue(
    lastMonthData.cases[keys[0]],
    lastMonthData.cases[keys[1]]
  );

  const calcLastMonthDeaths = minusByBiggervalue(
    lastMonthData.deaths[keys[0]],
    lastMonthData.deaths[keys[1]]
  );

  setLastMonthCases(calcLastMonthCases);
  setLastMonthDeaths(calcLastMonthDeaths);
};

export const getFirstAndLastKeyOfObject = (obj) => {
  const firstElementKey = Object.keys(obj)[0];
  const lastElementKey = Object.keys(obj)[Object.keys(obj).length - 1];

  return [firstElementKey, lastElementKey];
};

export const getCountriesLastMonthData = async (setLastMonthCountriesData) => {
  const itemData = await fetch(
    `https://disease.sh/v3/covid-19/historical?lastdays=28`
  );

  try {
    const response = await itemData.json();
    setLastMonthCountriesData(response);
  } catch (error) {
    console.log("ERROR : ", error);
  }
};

export const minusByBiggervalue = (numOne, numTwo) => {
  if (!numOne || !numTwo) return;

  if (numOne > numTwo) {
    return formateNumber(numOne - numTwo);
  } else if (numOne < numTwo) {
    return formateNumber(numTwo - numOne);
  }
  return 0;
};
