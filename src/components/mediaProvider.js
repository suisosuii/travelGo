import { useMedia } from "react-use";

export const UseIsWide = () => {
  const isWide = useMedia("(min-width: 800px)");
  return isWide;
};
