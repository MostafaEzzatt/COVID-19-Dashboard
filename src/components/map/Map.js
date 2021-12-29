import dynamic from "next/dynamic";
import Head from "next/head";
import { useGlobalContext } from "../../context/AppContext";

// Leaflet
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";

const MarkersComp = dynamic(() => import("./Markers"), {
  ssr: false,
});

const ChangeMapPosition = () => {
  const { longAndLat } = useGlobalContext();
  const map = useMapEvent("click", () => {});
  map.setView(longAndLat);

  return <></>;
};

const Map = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <MapContainer
        center={[0, 0]}
        zoom={4}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkersComp />
        <ChangeMapPosition />
      </MapContainer>
    </>
  );
};

export default Map;
