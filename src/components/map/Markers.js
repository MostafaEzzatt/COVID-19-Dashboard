// App Context
import { useGlobalContext } from "../../context/AppContext";

// Leaflet
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const Markers = () => {
  const { mapData } = useGlobalContext();
  return (
    <>
      {mapData.length >= 1 &&
        mapData.map((markData) => {
          const customeIcon = L.divIcon({
            className: "app-map-marker",
            html: `
              <h6>${markData.country}</h6>
            `,
          });
          return (
            <Marker
              position={[
                markData.countryInfo.lat || 0,
                markData.countryInfo.long || 0,
              ]}
              key={markData.country}
              icon={customeIcon}
            >
              <Popup>
                <ul>
                  <li> Cases : {markData.cases}</li>
                  <li> Deaths : {markData.deaths}</li>
                  <li> Recovered : {markData.recovered}</li>
                  <li> Today Cases : {markData.todayCases}</li>
                  <li> Today Deaths : {markData.todayDeaths}</li>
                </ul>
              </Popup>
            </Marker>
          );
        })}
    </>
  );
};

export default Markers;
