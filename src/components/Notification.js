import React from "react";
import WebNotification from "react-web-notifications";

export default ({ todos }) => {
  const pendingTodos = todos.filter(todo => todo.item.completed !== true);

  return (
    <div>
      <WebNotification
        title="Pending Task" // the title prop is required
        icon="/images/todolist.png"
        body={`You have ${pendingTodos.length} pending task${
          pendingTodos.length > 1 ? "s" : ""
        }.`}
        timeout={15000}
        //onClickFn={() => window.open("https://www.google.com/", "_blank")} // open your own site on notification click
      />
    </div>
  );
};
