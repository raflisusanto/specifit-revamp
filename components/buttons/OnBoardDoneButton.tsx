import { Text, View, StyleSheet } from "react-native";
import { textStyles } from "@/styles/typography";
import { COLORS } from "@/styles/colors";

export function OnBoardDoneButton() {
  return (
    <View style={styles.buttonStyle}>
      <Text style={styles.textStyle}>Mulai</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  textStyle: {
    color: "white",
    ...textStyles.xSmallBold,
  },
});
