import React, { useContext } from "react";
import { TodoContext } from "../Context";
import "../style/Button.css";

export const CloseButton = ({ id }) => {
  const dispatch = useContext(TodoContext);
  const handleDelete = () => {
    dispatch({ type: "removeFromList", id: id });
  };
  return (
    <button
      type="button"
      className="close text-warning"
      aria-label="Close"
      onClick={handleDelete}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

export const Checkbox = ({ toggleCheck, id }) => {
  const dispatch = useContext(TodoContext);
  const handleCheckToggle = () => {
    dispatch({ type: "completeTask", id: id });
  };
  return (
    <span onClick={handleCheckToggle}>
      <input
        type="checkbox"
        checked={toggleCheck}
        onChange={handleCheckToggle}
      />
      <span />
    </span>
  );
};
