import React, { Fragment } from "react";
import { CloseButton, Checkbox } from "./Button";

export default ({ text, id, complete, deadline }) => {
  return (
    <Fragment>
      <div className="mt-2 mb-3">
        <div className="grid-container">
          <div>
            <Checkbox id={id} toggleCheck={complete} />
          </div>
          <div>
            <div className={complete ? "done" : ""}>{text}</div>
            <div>
              {deadline ? (
                <div className="deadline">{`deadline: ${deadline}`}</div>
              ) : null}{" "}
            </div>
          </div>
          <div>
            <CloseButton id={id} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
