import styles from "./style.module.css";
import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";

export default function Map() {
  const google = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAPS,
    libraries: ["places"],
  });
  if (!google.isLoaded) return <div>Loading...</div>;
  return <MapIn />;
}

function MapIn() {
  const center = useMemo(() => ({ lat: 31.94864, lng: 35.2568 }), []);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <>
      <div className={styles.places_container}>
        <LocationSearchInput setSelected={setSelected} />
      </div>

      <GoogleMap zoom={10} center={center} mapContainerClassName={styles.map}>
        {selected.length > 0 &&
          selected.map((mark) => <Marker position={mark} />)}
      </GoogleMap>
    </>
  );
}
