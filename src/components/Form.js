import React from "react";
import DatePicker from "./DatePicker";

export default ({
  inputRef,
  handleKeyDown,
  handleTimeChange,
  handleTimePicker,
  handleSubmit,
  time,
  modal
}) => {
  return (
    <div>
      {" "}
      <form>
        <input
          type="text"
          name="addtodo"
          ref={inputRef}
          col="3"
          placeholder="Add new todo"
          onKeyDown={handleKeyDown}
        />
        <div className="mt-3">
          <input
            type="text"
            name="addDeadline"
            col="3"
            placeholder="Add a deadline"
            onClick={handleTimePicker}
            onChange={handleTimeChange}
            value={time !== "" ? time : ""}
          />
          {modal ? (
            <DatePicker
              handleTimePicker={handleTimePicker}
              handleTimeChange={handleTimeChange}
              time={time}
            />
          ) : null}
        </div>

        <button
          type="button"
          className="btn btn-outline-primary ml-0 mt-3"
          onClick={handleSubmit}
        >
          Add To-do
        </button>
      </form>
    </div>
  );
};
