import { useEffect } from "react";
import { useMap } from "../Hooks/useMap";
import MapMarker from "./MapMarker";
import { PlaceType } from "./mapTypes";

interface MapMarkerControllerProps {
  places: PlaceType[];
  selectedMarkerId?: string;
}

export default function MapMarkerController(props: MapMarkerControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (props.places.length < 1) return; // 장소가 존재하지 않을 때

    const bounds = new window.kakao.maps.LatLngBounds();
    props.places.forEach((place) => {
      bounds.extend(place.position);
    });

    map.setBounds(bounds);
  }, [props.places]);

  return (
    <>
      {props.places.map((place, index) => {
        return <MapMarker key={place.id} index={index} place={place} selected={props.selectedMarkerId === place.id} />;
      })}
    </>
  );
}
