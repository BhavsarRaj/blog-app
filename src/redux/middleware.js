const middleware = (store) => {
  return (next) => {
    return (action) => {
      if (action.type === "Register") {
        setTimeout(() => {
          next(action);
        }, 2000);
        return;
      }

      return next(action); // This will now go to reducer
    };
  };
};

export default middleware;
