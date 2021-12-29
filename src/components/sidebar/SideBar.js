import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";
import Item from "./Item";

const SideBar = () => {
  const { mapData } = useGlobalContext();
  const [renderList, setRenderList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (mapData) {
      setRenderList(mapData);
    }
  }, [mapData]);

  const handleChange = (e) => {
    if (e.target.value) {
      setSearch(e.target.value);
      const tempList = mapData.filter((country) =>
        country.country.toLowerCase().match(`.*${e.target.value}.*.`)
      );
      setRenderList(tempList);
      return;
    }
    setRenderList(mapData);
  };

  return (
    <div className="w-3/12 max-h-screen overflow-y-scroll px-1 pt-2">
      <div className="rounded bg-slate-600 py-2 px-2 cursor-pointer mb-2 sticky top-0 shadow-2xl">
        <label className="text-center">
          <span className="block w-full text-white font-black text-lg">
            Search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => handleChange(e)}
            className="w-full bg-transparent text-center text-slate-400 text-lg outline-none"
            placeholder="Type Here"
          />
        </label>
      </div>
      <ul className="space-y-2">
        {renderList &&
          renderList.map((item) => {
            return <Item key={item.country} item={item} />;
          })}
      </ul>
    </div>
  );
};

export default SideBar;
