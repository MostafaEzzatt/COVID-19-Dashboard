import { useGlobalContext } from "../../context/AppContext";

const TopStatus = () => {
  const { totalCases, totalDeaths, lastMonthCases, lastMonthDeaths } =
    useGlobalContext();
  return (
    <section className="top-status grid grid-rows-2 grid-cols-2 text-center items-center gap-x-2 mb-1 ">
      <div className="bg-slate-900 border-4 border-slate-500 py-1">
        <h4 className="text-gray-200 font-medium">Total Cases</h4>
        <p className="text-4xl font-black text-slate-300">{totalCases}</p>
      </div>
      <div className="bg-slate-900 border-4 border-slate-500 py-1">
        <h4 className="text-gray-200 font-medium">Total Deaths</h4>
        <p className="text-4xl font-black text-slate-300">{totalDeaths}</p>
      </div>
      <div className="bg-slate-900 border-4 border-slate-500 py-1">
        <h4 className="text-gray-200 font-medium">28-Day Cases</h4>
        <p className="text-4xl font-black text-slate-300">{lastMonthCases}</p>
      </div>
      <div className="bg-slate-900 border-4 border-slate-500 py-1">
        <h4 className="text-gray-200 font-medium">28-Day Deaths</h4>
        <p className="text-4xl font-black text-slate-300">{lastMonthDeaths}</p>
      </div>
    </section>
  );
};

export default TopStatus;
