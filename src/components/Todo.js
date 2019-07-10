import React, { Fragment } from "react";
import { CloseButton, Checkbox } from "./Button";

export default ({ text, id, complete }) => {
  return (
    <Fragment>
      <div className="grid-container">
        <div>
          <Checkbox id={id} toggleCheck={complete} />
        </div>
        <div className={complete ? "done" : ""}>{text}</div>
        <div>
          <CloseButton id={id} />
        </div>
      </div>
    </Fragment>
  );
};
