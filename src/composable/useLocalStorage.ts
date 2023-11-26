import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (newValue: any) => {
    try {
      let valueToStore = newValue;
      if(typeof valueToStore !== 'string') {
        valueToStore = JSON.stringify(newValue);
      }
      window.localStorage.setItem(keyName, valueToStore);
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};