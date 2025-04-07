import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/styles/colors";
import { textStyles } from "@/styles/typography";

type Props = {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  iconStyle?: StyleProp<TextStyle>;
};

const Button: React.FC<Props> = ({
  text,
  onPress,
  style,
  textStyle,
  iconName,
  iconStyle,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.buttonStyle, style]}>
        {iconName && (
          <MaterialIcons
            name={iconName}
            style={[styles.iconStyle, iconStyle]}
            size={16}
          />
        )}
        <Text style={[styles.textStyle, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  textStyle: {
    color: COLORS.white,
    ...textStyles.normalSemiBold,
  },
  iconStyle: {
    marginRight: 10,
    color: COLORS.white,
  },
});
