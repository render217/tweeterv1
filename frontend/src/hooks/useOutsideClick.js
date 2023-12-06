import { useRef, useEffect } from "react";

export default function useOutsideClick(callbackHandler) {
  let ref = useRef();

  useEffect(() => {
    const handleFun = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackHandler();
      }
    };
    document.addEventListener("mousedown", handleFun);
    return () => {
      document.removeEventListener("mousedown", handleFun);
    };
  }, [ref, callbackHandler]);
  return ref;
}
