import React from "react";
import { Title, Label, CompWrapper, Nav, BottomNav } from "../../commons";
import { Matches } from "./component/Matches/matches.component";

const DATA = [
  {
    title: "Argentina vs nepal",
    teamA: "Argentina",
    teamB: "Nepal",
  },
  {
    title: "Argentina vs nepal",
    teamA: "Argentina",
    teamB: "Nepal",
  },
  {
    title: "Argentina vs nepal",
    teamA: "Argentina",
    teamB: "Nepal",
  },
  {
    title: "Argentina vs nepal",
    teamA: "Argentina",
    teamB: "Nepal",
  },
  {
    title: "Argentina vs nepal",
    teamA: "Argentina",
    teamB: "Nepal",
  },
];

export const HomePage = () => {
  return (
    <CompWrapper>
      <div>
        <Nav />
        <Title name="Group Stage" />
        <Matches data={DATA} />
      </div>
      <BottomNav />
    </CompWrapper>
  );
};
