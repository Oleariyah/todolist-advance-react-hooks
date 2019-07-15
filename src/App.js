import React, { useReducer, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import { TodoContext } from "./utils/Context";
import { appReducer } from "./utils/Reducers";
import { useTransition, animated } from "react-spring";
import "./style/App.css";

export default () => {
  const [todos, dispatch] = useReducer(appReducer, []);
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
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch({ type: "addToList", text: inputRef.current.value });
      inputRef.current.value = "";
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
        <div className="App-wrapper col-10 col-lg-6 mx-auto mt-5 m-3">
          <header className="App-header">
            Todo App
            <hr />
          </header>
          <form>
            <input
              type="text"
              name="addtodo"
              ref={inputRef}
              col="3"
              placeholder="Add new todo"
              onKeyDown={handleKeyDown}
            />
          </form>
          <main className="App-body mb-3">
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
                    complete={item.completed}
                  />
                  <hr />
                </animated.div>
              ))
            )}
          </main>
        </div>
      </div>
    </TodoContext.Provider>
  );
};
