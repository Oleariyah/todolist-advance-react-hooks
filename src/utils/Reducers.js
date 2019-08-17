export const appReducer = (state, action) => {
  switch (action.type) {
    case "fetchInitialData": {
      return action.payload;
    }
    case "addToList": {
      return [
        {
          id: Date.now(),
          text: action.text,
          deadline: action.deadline,
          time: action.time,
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
