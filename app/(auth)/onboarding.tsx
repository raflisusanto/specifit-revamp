import { OnBoardDoneButton } from "@/components/buttons/OnBoardDoneButton";
import { OnBoardNextButton } from "@/components/buttons/OnBoardNextButton";
import { useStorage } from "@/hooks/useStorage";
import { COLORS } from "@/styles/colors";
import { textStyles } from "@/styles/typography";
import { SLIDES } from "@/utils/constants";
import { StorageKeys } from "@/utils/storage-keys";
import { router } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const OnBoarding = () => {
  const [_, setHasOnboarded] = useStorage(StorageKeys.HasOnboarded, false);

  return (
    <AppIntroSlider
      style={{ flex: 1 }}
      data={SLIDES}
      activeDotStyle={styles.activeDotStyle}
      renderNextButton={OnBoardNextButton}
      renderDoneButton={OnBoardDoneButton}
      onDone={() => {
        setHasOnboarded(true)
        router.replace('/(auth)/login');
      }}
      renderItem={({ item }) => {
        return (
          <View style={styles.listContainer}>
            <Image source={item.image} style={styles.imageStyle}></Image>
            <Text style={styles.titleStyle}>{item.title}</Text>
            <Text style={styles.textStyle}>{item.text}</Text>
          </View>
        );
      }}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 150,
    marginHorizontal: "7%",
  },
  imageStyle: {
    marginBottom: 50,
  },
  titleStyle: {
    textAlign: "left",
    marginBottom: 14,
    ...textStyles.regularBold,
  },
  textStyle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    textAlign: "left",
  },
  activeDotStyle: {
    width: 30,
    backgroundColor: COLORS.primary,
  },
});
