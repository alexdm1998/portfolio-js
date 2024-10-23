import React, { useEffect, useState } from "react";
import { useCapitals } from "@contexts/CapitalsContext";
import { useTimezone } from "@contexts/TimeContext";
import { SnappingScroller } from "./SnappingScroller";
import { CapitalCollage } from "./CapitalCollage";

export const CapitalCards = () => {
  const capitals = useCapitals();
  const { gmtOffset: timezone } = useTimezone();
  const [filteredCapitals, setFilteredCapitals] = useState([]);
  const [capitalImages, setCapitalImages] = useState([]);

  function getCapitalsByTimezone(capitals, timezone) {
    if (capitals) {
      const filt_capitals = capitals.filter(
        (object) => object["GMT offset"] == timezone
      );
      return filt_capitals;
    }
    console.log("Couldn't get capitals from the current timezone.");
    return [];
  }

  function formatTimezone(timezone) {
    if (timezone > 0) {
      if (timezone < 10) {
        return `+0${timezone}:00`;
      }
      if (timezone >= 10) {
        return `+${timezone}:00`;
      }
    }
    if (timezone == 0) {
      return `00:00`;
    }
    if (timezone < 0) {
      if (timezone > -10) {
        return `-0${timezone.toString().substring(1)}:00`;
      }
      if (timezone <= -10) {
        return `-${timezone.toString().substring(1)}:00`;
      }
    }

  }


  useEffect(() => {
    setFilteredCapitals(
      getCapitalsByTimezone(capitals, formatTimezone(timezone))
    );
  }, [capitals, timezone]);


  useEffect(()=>{
    console.log(capitalImages)
    console.log(capitalImages.length)
  },[capitalImages])

  return (
    <>
      <SnappingScroller data={filteredCapitals} onFocus={(e)=>{setCapitalImages(e)}}></SnappingScroller>
      {capitalImages.length > 0 && <CapitalCollage capitalImages={capitalImages}></CapitalCollage>}
    </>
  );
};
