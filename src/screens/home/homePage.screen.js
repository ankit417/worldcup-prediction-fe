import React, { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import {
  Title,
  Label,
  CompWrapper,
  Nav,
  BottomNav,
  Card,
  HrLine,
  PrimaryButton,
  DefaultButton,
} from "../../commons";
import { Matches } from "./component/Matches/matches.component";

const DATA = [
  {
    id: 1,
    title: "Argentina vs nepal",
    teamA: {
      title: "Argentina",
      image: "https://www.worldatlas.com/r/w768/img/flag/ar-flag.jpg",
    },
    teamB: {
      title: "Nepal",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png",
    },
  },
  {
    id: 2,
    title: "Argentina vs nepal",
    teamA: {
      title: "Argentina",
      image: "https://www.worldatlas.com/r/w768/img/flag/ar-flag.jpg",
    },
    teamB: {
      title: "Nepal",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png",
    },
  },
  {
    id: 3,
    title: "Argentina vs nepal",
    teamA: {
      title: "Argentina",
      image: "https://www.worldatlas.com/r/w768/img/flag/ar-flag.jpg",
    },
    teamB: {
      title: "Nepal",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png",
    },
  },
  {
    id: 4,
    title: "Argentina vs nepal",
    teamA: {
      title: "Argentina",
      image: "https://www.worldatlas.com/r/w768/img/flag/ar-flag.jpg",
    },
    teamB: {
      title: "Nepal",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png",
    },
  },
];

export const HomePage = () => {
  return (
    <div>
      <Nav />
      <div className="home-wrapper">
        <Card className={"card-container"}>
          <div className="home-card-title">
            <Title name="Group Stage" />
          </div>
          <HrLine gap={15} />
          <MatchCard />
        </Card>
      </div>
    </div>
  );
};

const MatchCard = () => {
  const handleChange = (e, id) => {
    console.log("eee", e.target.value, id);
    // alert(e);
  };
  return DATA.map((item, index) => {
    return (
      <div key={index.toString()} className="matchCard_wrapper">
        <Title name={item.title} />
        <div className="match_wrapper">
          <div>
            <img src={item.teamA.image} alt={item.teamA.title} />
          </div>
          <div className="prediction_button_wrapper">
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="draw"
              name="radio-buttons-group"
              onChange={(e) => handleChange(e, item.id)}
            >
              <FormControlLabel
                value={item.teamA.title}
                control={<Radio />}
                label={item.teamA.title}
              />
              <FormControlLabel value="Draw" control={<Radio />} label="Draw" />
              <FormControlLabel
                value={item.teamB.title}
                control={<Radio />}
                label={item.teamB.title}
              />
            </RadioGroup>
          </div>
          <div>
            <img
              src={item.teamB.image}
              height={100}
              width={100}
              alt={item.teamB.title}
            />
          </div>
        </div>
        <HrLine gap={10} />
      </div>
    );
  });
};
