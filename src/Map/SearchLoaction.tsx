import styled from "@emotion/styled";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useMap } from "../Hooks/useMap";
import { PlaceType } from "./mapTypes";

interface SearchLocationProps {
  onUpdatePlaces: (places: PlaceType[]) => void;
  onSelect: (placeId: string) => void;
}

export default function SearchLoaction(props: SearchLocationProps) {
  const map = useMap();
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const placeService = useRef<kakao.maps.services.Places | null>(null);

  useEffect(() => {
    if (placeService.current) {
      return;
    }

    placeService.current = new kakao.maps.services.Places();
  }, []);

  function searchPlaces(keyword: string) {
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return;
    }

    if (!placeService.current) {
      alert("placeService Error");
      return;
    }

    placeService.current.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const placeInfos = data.map((placeSearchResultItem) => {
          return {
            id: placeSearchResultItem.id,
            position: new kakao.maps.LatLng(Number(placeSearchResultItem.y), Number(placeSearchResultItem.x)),
            title: placeSearchResultItem.place_name,
            address: placeSearchResultItem.address_name,
          };
        });

        props.onUpdatePlaces(placeInfos);
        setPlaces(placeInfos);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결화 중 오류가 발생했습니다.");
        return;
      }
    });
  }

  function handelSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchPlaces(keyword);
  }

  function handleItem(place: PlaceType) {
    map.setCenter(place.position);
    map.setLevel(3);
    props.onSelect(place.id);
  }

  return (
    <SearchContainer>
      <Form onSubmit={handelSubmit}>
        <Title>
          <strong>MAP</strong>DAMAEWO
        </Title>
        <Input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </Form>
      <List>
        {places.map((item, index) => {
          return (
            <Item key={`${item}_${index}`} onClick={() => handleItem(item)}>
              <label>{`${index + 1}. ${item.title}`}</label>
              <span>{item.address}</span>
            </Item>
          );
        })}
      </List>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 390px;
  height: 100%;
  background-color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: calc(15% - 32px);
  background-color: #258fff;
`;

const Title = styled.h1`
  margin: 12px 0 24px;
  font-size: 28px;
  font-weight: bold;
  color: #9eceff;
  letter-spacing: -1px;
  width: fit-content;

  strong {
    color: #fff;
  }
`;

const Input = styled.input`
  width: calc(100% - 16px);
  padding: 4px 8px;
  border: 0;
  border-radius: 3px;
  height: 30px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  height: calc(85% - 16px);
  margin: 0;
  padding: 8px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
    opacity: 1;
    transition: background-color 0s;
  }

  label {
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
  }
`;
