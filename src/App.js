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
    timeInSeconds: 0,
    notify: false,
    openModal: false
  });

  const inputRef = useRef();
  const minutes = new Date().getMinutes();

  useEffect(() => {
    const raw = localStorage.getItem("todoData");
    const timeInSecondsNow = new Date().getTime() / 1000;
    if (raw !== "") {
      dispatch({ type: "fetchInitialData", payload: JSON.parse(raw) });
    }

    if (timeInSecondsNow >= state.timeInSeconds) {
      dispatch({ type: "completeTask", completed: true });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setstate({ ...state, notify: !state.notify });
    }, 900000);
    return () => clearInterval(interval);
  }, [minutes]);

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
    const hourInSeconds = newTime.hour * 3600;
    const minuteInSeconds = newTime.minutes * 60;
    seconds = hourInSeconds + minuteInSeconds;

    setstate({ ...state, time: newTime.formatted, timeInSeconds: seconds });
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
        {state.notify ? <Notification todos={transition} /> : null}
        <div className="App-wrapper col-lg-6 col-xs-12">
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
