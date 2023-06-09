import { ReactNode, useEffect, useState } from "react";

const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";
const KAKAO_MAP_APP_KEY = process.env.KAKAP_MAP_KEY;

// declare interface Type {
//   window {
//     kakao: any
//   }
// }
// 대신 -> npm install --save-dev kakao.maps.d.ts

interface KakaoMapScriptLoaderProps {
  children: ReactNode;
}

export default function KakaoMapScriptLoader(props: KakaoMapScriptLoaderProps) {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

    if (mapScript && !window.kakao) {
      return;
    }

    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapScriptLoaded(true);
      });
    };
    script.onerror = () => {
      setMapScriptLoaded(false);
    };

    document.getElementById("root")?.appendChild(script);
  }, []);
  return <>{mapScriptLoaded ? props.children : <div>지도를 가져오는 중입니다...</div>}</>;
}
