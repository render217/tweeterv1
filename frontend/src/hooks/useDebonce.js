import { useEffect, useState } from "react";

export default function useDebonce(value, delay = 500) {
  // console.log("search value", value);
  const [debonceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debonceValue;
}
