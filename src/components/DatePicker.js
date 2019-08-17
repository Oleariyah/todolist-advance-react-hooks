import React from "react";
import TimeKeeper from "react-timekeeper";

export default props => {
  return (
    <div className="modal">
      <div className="modal-body text-center">
        <TimeKeeper
          time={props.time}
          onChange={props.handleTimeChange}
          onDoneClick={() => props.handleTimePicker()}
        />
        ;
      </div>
    </div>
  );
};
