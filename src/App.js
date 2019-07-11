import React, { useReducer, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import { TodoContext } from "./Context";
import "./style/App.css";

const appReducer = (state, action) => {
  switch (action.type) {
    case "fetchInitialData": {
      return action.payload;
    }
    case "addToList": {
      return [
        {
          id: Date.now(),
          text: action.text,
          completed: false
        },
        ...state
      ];
    }

    case "completeTask": {
      return state.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      });
    }

    case "removeFromList": {
      return state.filter(item => item.id !== action.id);
    }

    default:
      return state;
  }
};

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

  return (
    <TodoContext.Provider value={dispatch}>
      <div className="App">
        <div className="App-wrapper col-lg-6 mx-auto mt-5 m-3">
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
              todos.map(todo => (
                <div key={todo.id}>
                  <Todo
                    text={todo.text}
                    id={todo.id}
                    complete={todo.completed}
                  />
                  <hr />
                </div>
              ))
            )}
          </main>
        </div>
      </div>
    </TodoContext.Provider>
  );
};
