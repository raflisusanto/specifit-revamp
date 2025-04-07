import { ImageSourcePropType } from "react-native";

export type Slide = {
  key: string,
  title: string,
  text: string,
  image: ImageSourcePropType,
}