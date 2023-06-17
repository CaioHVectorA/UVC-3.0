import React from "react";
type ReturnType = [string, React.Dispatch<React.SetStateAction<string>>];
const useLocalStorage = function (key: string, inicial: string): ReturnType {
  const [state, setState] = React.useState(() => {
    const local = window.localStorage.getItem(key);
    return local ? local : inicial;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
