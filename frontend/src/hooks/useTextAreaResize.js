import { useRef, useEffect } from "react";

export default function useTextAreaResize(textInput) {
  const textAreaRef = useRef();
  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef?.current.scrollHeight + "px";
  }, [textInput]);
  return textAreaRef;
}
