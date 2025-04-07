import { COLORS } from "@/styles/colors";
import { Pressable, View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const ButtonTransparent: React.FC<Props> = ({
  text,
  onPress,
  style,
  containerStyle,
  textStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <View style={style}>
        <Text style={[styles.textStyles, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonTransparent;

const styles = StyleSheet.create({
  textStyles: {
    color: COLORS.primary,
  },
});
