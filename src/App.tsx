import { useState } from "react";
import DynamicMap from "./Map/DynamicMap";
import KakaoMapScriptLoader from "./Map/KakaoMapScriptLoader";
import MapMarkerController from "./Map/MapMarkerController";
import { PlaceType } from "./Map/mapTypes";
import SearchLoaction from "./Map/SearchLoaction";

export default function App() {
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [selectedMarkerId, selectMarkerId] = useState("");
  return (
    <KakaoMapScriptLoader>
      <DynamicMap>
        <MapMarkerController places={places} selectedMarkerId={selectedMarkerId} />
        <SearchLoaction
          onUpdatePlaces={(places) => {
            setPlaces(places);
          }}
          onSelect={(placeid) => {
            selectMarkerId(placeid);
          }}
        />
      </DynamicMap>
    </KakaoMapScriptLoader>
  );
}
