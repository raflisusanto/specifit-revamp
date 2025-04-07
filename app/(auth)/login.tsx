import { View, StyleSheet, Image, Text, Pressable, Alert } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonTransparent from "@/components/buttons/ButtonTransparent";
import { router } from "expo-router";
import Button from "@/components/buttons/Button";
import InputField from "@/components/inputs/InputField";
import Card from "@/components/cards/Card";
import { COLORS } from "@/styles/colors";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/validations/login";
import { textStyles } from "@/styles/typography";

const LoginScreen = () => {
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onLoginHandler: SubmitHandler<LoginSchemaType> = (data) => {
    login({ email: data.email, password: data.password });
  }

  return (
    <>
      <Image
        source={require("@/assets/images/login/element_1.png")}
        style={styles.cornerImage}
      />
      <View style={styles.screen}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logoIcon}
        />
        <Card style={{ marginHorizontal: 20 }}>
          <Text style={styles.pageTitle} adjustsFontSizeToFit numberOfLines={1}>
            Masuk
          </Text>
          <InputField
            name="email"
            control={control}
            defaultValue={""}
            iconName="mail"
            isPassword={false}
            error={errors.email}
            placeholder="E-mail"
            style={{ marginTop: 16 }}
          />
          <InputField
            name="password"
            control={control}
            defaultValue={""}
            iconName="lock-closed"
            isPassword={true}
            error={errors.password}
            placeholder="Password"
            style={{ marginTop: 16 }}
          />
          <Button
            style={{ marginVertical: 40 }}
            text="Masuk"
            onPress={handleSubmit(onLoginHandler)}
          />
          <View>
            <Text style={{ textAlign: "center", color: "#999999" }}>
              atau masuk dengan
            </Text>
            <Pressable>
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Image
                  source={require("@/assets/images/login/google_icon.png")}
                  style={styles.googleImgStyle}
                ></Image>
              </View>
            </Pressable>
          </View>
        </Card>
        <View style={styles.bottomNav}>
          <Text style={{ marginRight: 6 }}>Belum punya akun Specifit?</Text>
          <ButtonTransparent
            text="DAFTAR"
            onPress={() => router.replace("/(auth)/register")}
          />
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.neutral300,
    borderBottomWidth: 1,
    marginVertical: 14,
  },
  pageTitle: {
    textAlign: "center",
    ...textStyles.normalBold,
  },
  logoIcon: {
    resizeMode: "contain",
    height: 120,
    width: 120,
    marginLeft: 5,
  },
  cornerImage: {
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginTop: -5,
    position: "absolute",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  googleImgStyle: {
    resizeMode: "contain",
    height: 40,
    width: 40,
  },
  invalidContainer: {
    borderBottomColor: COLORS.red,
  },
  focusedContainer: {
    borderBottomColor: COLORS.primary,
  },
});
