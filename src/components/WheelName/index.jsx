import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { AreaList, ButtonWheel, TitleWheel } from "./WhellName.style";
import FireWork from "./FireWork";
import luckyMP3 from "../../assets/audio/lucky.mp3";
const wheelAudio = new Audio(luckyMP3);
wheelAudio.loop = true;
const hexColor = [
  "#EE4040",
  "#F0CF50",
  "#815CD1",
  "#3DA5E0",
  "#34A24F",
  "#F9AA1F",
  "#EC3F3F",
  "#FF9000",
  "#0013c1",
  "#be32a3",
  "#223637",
  "#9aec41",
  "#c6a337",
];
export default function WheelName({ data, setIsOpenLucky }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [nameSelect, setNameSelect] = useState(null);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [listLucky, setListLucky] = useState([]);
  const [areaValue, setAreaValue] = useState("");
  useEffect(() => {
    if (data) {
      setListLucky(data);
      setAreaValue(data.join("\n"));
    }
  }, [data]);

  const colorArray = () => {
    let listColor = hexColor;
    while (
      listLucky &&
      listLucky.length > 0 &&
      listLucky.length > listColor.length
    ) {
      const endIndex =
        listLucky.length - hexColor.length > hexColor.length
          ? hexColor.length
          : listLucky.length - hexColor.length;
      const colorAdd = hexColor.slice(0, endIndex);
      listColor = [...listColor, ...colorAdd];
    }
    return listColor;
  };

  const newData =
    listLucky && listLucky.length > 0
      ? listLucky.map((item, index) => {
          const newItem = {
            option: item,
            style: { backgroundColor: colorArray()[index] },
          };
          return newItem;
        })
      : [
          {
            option: "",
            style: { backgroundColor: colorArray()[0] },
          },
        ];

  const stopSpin = () => {
    setNameSelect(newData[prizeNumber].option);
    setMustSpin(false);
  };
  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * listLucky.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    wheelAudio.currentTime = 0;
    wheelAudio.play();
  };

  const handleChangeArea = (value) => {
    setAreaValue(value);
    const newList = value.split("\n").filter((item) => item.trim() !== "");
    setListLucky(newList);
  };
  return (
    <>
      {newData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: "#ffffffc2",
          }}
        >
          <TitleWheel>Lucky Wheel</TitleWheel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div style={{ width: "50%" }}>
              <Wheel
                prizeNumber={prizeNumber}
                mustStartSpinning={mustSpin}
                data={newData}
                textColors={["#ffffff"]}
                onStopSpinning={stopSpin}
                radiusLineWidth={2}
                outerBorderWidth={2}
                spinDuration={0.6}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "40%",
              }}
            >
              <AreaList
                placeholder="name"
                value={areaValue}
                rows={10}
                onChange={(e) => {
                  handleChangeArea(e.target.value);
                }}
              ></AreaList>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <ButtonWheel onClick={handleSpinClick}>Start</ButtonWheel>
                <ButtonWheel
                  onClick={() => {
                    setIsOpenLucky(false);
                    stopSpin();
                    wheelAudio.pause();
                  }}
                  bgColor={"red"}
                >
                  Back
                </ButtonWheel>
              </div>
            </div>
          </div>
          {nameSelect && (
            <FireWork
              nameSelect={nameSelect}
              setNameSelect={setNameSelect}
              wheelAudio={wheelAudio}
            />
          )}
        </div>
      )}
    </>
  );
}
