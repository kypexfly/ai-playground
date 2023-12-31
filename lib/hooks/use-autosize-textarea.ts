import { useEffect } from "react";

// FROM: https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848

export const useAutosizeTextarea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
