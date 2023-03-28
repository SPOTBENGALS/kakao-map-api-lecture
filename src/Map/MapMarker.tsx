import styled from "@emotion/styled";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { useMap } from "../Hooks/useMap";
import { PlaceType } from "./mapTypes";

interface MapMarkerProps {
  place: PlaceType;
  index: number;
  selected?: boolean;
}

const MARKER_IMAGE_URL = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";

export default function MapMarker(props: MapMarkerProps) {
  const map = useMap();
  const container = useRef(document.createElement("div"));

  const infoWindow = useMemo(() => {
    container.current.style.position = "absolute";
    container.current.style.bottom = "40px";
    return new kakao.maps.CustomOverlay({
      position: props.place.position,
      content: container.current,
      map: map,
    });
  }, []);

  const marker = useMemo(() => {
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOption = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, props.index * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    };
    const markerImage = new kakao.maps.MarkerImage(MARKER_IMAGE_URL, imageSize, imgOption);
    const marker = new kakao.maps.Marker({
      position: props.place.position,
      image: markerImage,
    });

    kakao.maps.event.addListener(marker, "click", function () {
      map.setCenter(props.place.position);
      map.setLevel(4, {
        animate: true,
      });
      infoWindow.setMap(map);
    });
    return marker;
  }, []);
  // useMemo : memorization 기법으로 저장된 값을 그대로 사용한다. 저장값이 변경될 때에만 마운트한다.
  // useMemo를 남용하면 메모리를 더 쓰게 되고, 컴포넌트 복잡도가 올라가 유지보수성이 떨어진다.
  // useCallback과 달리 useMemo는 특정 결과값이 아닌 특정 함수를 재사용할 때 사용한다.
  // useEffect는 랜더링 될 때마다 마운트한다.

  useLayoutEffect(() => {
    marker.setMap(map);
    return () => {
      marker.setMap(null);
    };
  }, [map]);
  // useLayoutEffect : 레이아웃이 정렬되기 전에 선점적으로 마운트된다.

  useEffect(() => {
    if (props.selected) {
      infoWindow.setMap(map);
      return;
    }

    return () => {
      infoWindow.setMap(null);
    };
  }, [props.selected]);

  return container.current
    ? ReactDOM.createPortal(
        <Message
          onClick={() => {
            infoWindow.setMap(null);
          }}
        >
          <Title>{props.place.title}</Title>
          <Address>{props.place.address}</Address>
        </Message>,
        container.current
      )
    : null;
}

const Message = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;

  min-width: 180px;
  min-height: 50px;
  margin-left: -100px;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
`;

const Title = styled.label`
  font-weight: bold;
  padding: 4px 0;
`;

const Address = styled.label`
  font-size: 12px;
  color: #666;
`;
