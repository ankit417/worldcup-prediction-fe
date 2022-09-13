import React from "react";
import { RadioButton, Label } from "../../../../commons";

export const Matches = ({ data }) => {
  return (
    <div className="Match-wrapper">
      {data.map((item, index) => {
        return (
          <div className="match-group" key={index}>
            <Label title={item.title} />
            <div>
              <RadioButton
                title={item.teamA}
                value={1}
                name={index.toString()}
              />
            </div>
            <div>
              <RadioButton
                title={item.teamB}
                value={2}
                name={index.toString()}
              />
            </div>
            <div>
              <RadioButton title={"Draw"} value={0} name={index.toString()} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
