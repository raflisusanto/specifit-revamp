import { textStyles } from "@/styles/typography";
import { Text, View, StyleSheet } from "react-native";

export function OnBoardNextButton() {
  return (
    <View>
      <Text style={styles.textStyle}>Lanjut</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 12,
    marginRight: 20,
    ...textStyles.smallBold,
  },
});
