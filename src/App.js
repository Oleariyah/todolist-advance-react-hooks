import React, { useState, useReducer, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import Notification from "./components/Notification";
import { TodoContext } from "./utils/Context";
import { appReducer } from "./utils/Reducers";
import { useTransition, animated } from "react-spring";
import "./style/App.css";

export default () => {
  const [todos, dispatch] = useReducer(appReducer, []);
  const [state, setstate] = useState({
    time: "",
    seconds: 0,
    openModal: false
  });

  const inputRef = useRef();

  useEffect(() => {
    const raw = localStorage.getItem("todoData");
    if (raw !== "") {
      dispatch({ type: "fetchInitialData", payload: JSON.parse(raw) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todos));
  }, [todos]);

  const handleKeyDown = event => {
    if (event.key === "Enter" && inputRef.current.value !== null) {
      event.preventDefault();
      dispatch({
        type: "addToList",
        text: inputRef.current.value
      });
      inputRef.current.value = "";
    }
  };

  const handleTimeChange = newTime => {
    let seconds = 0;
    let hoursInSeconds = newTime.hour * 3600;
    let minutesInSeconds = newTime.minute * 60;
    seconds = hoursInSeconds + minutesInSeconds;
    console.log(seconds);
    setstate({ ...state, time: newTime.formatted, seconds: seconds });
  };

  const handleTimePicker = () => {
    setstate({ ...state, openModal: !state.openModal });
  };

  const handleSubmit = event => {
    if (inputRef.current.value !== "") {
      event.preventDefault();
      dispatch({
        type: "addToList",
        text: inputRef.current.value,
        timeInSeconds: state.seconds,
        deadline: state.time
      });
      inputRef.current.value = "";
      state.time = "";
    }
  };

  const transition = useTransition(todos, todos => todos.id, {
    from: { opacity: 0, marginTop: -25, marginBottom: 25 },
    enter: { opacity: 1, marginTop: 0, marginBottom: 0 },
    leave: { opacity: 0, marginTop: -25, marginBottom: 25 }
  });

  return (
    <TodoContext.Provider value={dispatch}>
      <div className="App">
        {transition.map(({ item }) => (
          <Notification
            text={item.text}
            todos={transition}
            id={item.id}
            deadline={item.deadline}
            complete={item.completed}
          />
        ))}
        <div className="App-wrapper col-10 col-lg-6">
          <header className="bg">
            <div className="App-header text-center">Todo App</div>
            <hr />
          </header>
          <section className="form-area">
            <div className="container">
              <Form
                handleKeyDown={handleKeyDown}
                handleTimeChange={handleTimeChange}
                handleTimePicker={handleTimePicker}
                handleSubmit={handleSubmit}
                time={state.time}
                modal={state.openModal}
                inputRef={inputRef}
              />
            </div>
          </section>
          <main className="App-body mt-3 mb-3">
            <div className="container">
              {todos.length === 0 ? (
                <div className="text-center p-3 text-muted">
                  {"No available to-do-list"}
                </div>
              ) : (
                transition.map(({ item, key, props }) => (
                  <animated.div key={key} style={props}>
                    <Todo
                      text={item.text}
                      id={item.id}
                      deadline={item.deadline}
                      complete={item.completed}
                    />
                    <hr />
                  </animated.div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </TodoContext.Provider>
  );
};
