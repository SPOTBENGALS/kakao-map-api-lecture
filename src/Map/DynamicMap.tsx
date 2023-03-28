import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { KakaoMapContext } from "../Hooks/useMap";

interface DynamicMapProps {
  children: ReactNode;
}

export default function DynamicMap(props: DynamicMapProps) {
  const [map, setMap] = useState<kakao.maps.Map>();
  const kakaoMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!kakaoMapRef.current) {
      return;
    }

    const targetPoint = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: targetPoint,
      level: 4,
    };

    setMap(new window.kakao.maps.Map(kakaoMapRef.current, options));
  }, []);

  return (
    <Container>
      <Map ref={kakaoMapRef} />
      {map ? (
        <KakaoMapContext.Provider value={map}>{props.children}</KakaoMapContext.Provider>
      ) : (
        <div>지도 정보를 가져오는데 실패하였습니다. </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: static;
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;
