import { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Card: React.FC<Props> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 20,
  },
});
