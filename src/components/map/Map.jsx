import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect } from "react";
import { ApiContext } from "../../ContextApi/IpAddressProvider";

const MapUpdater = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng, map]);
  return null;
};

const Map = () => {
  const { data, err } = useContext(ApiContext);
  const location = data?.location;

  return (
    <div className="relative flex h-screen">
      {err ? (
        <div className="text-red-500 font-bold text-[2rem] underline m-auto">
          <span className="text-red-500 font-bold no-underline">Error:</span>{" "}
          Please provide a valid IP address
        </div>
      ) : location ? (
        <MapContainer
          className="w-full h-screen z-10"
          center={[location.lat, location.lng]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapUpdater lat={location.lat} lng={location.lng} />
          <Marker position={[location.lat, location.lng]}>
            <Popup>{data?.location?.city || "No location"}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="m-auto font-bold text-[1.2rem]">Loading map...</div>
      )}
    </div>
  );
};

export default Map;
