import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useState } from "react";
import { COLORS } from "@/styles/colors";
import { textStyles } from "@/styles/typography";
import { Ionicons } from "@expo/vector-icons";
import { Control, FieldError, Path, PathValue, useController } from "react-hook-form";

type InputFieldProps<T extends Record<string, any>> = {
  name: Path<T>;
  control: Control<T>;
  defaultValue: PathValue<T, Path<T>>;
  style?: StyleProp<ViewStyle>;
  placeholder: string;
  isPassword: boolean;
  error?: FieldError;
  iconName: keyof typeof Ionicons.glyphMap;
};

const InputField = <T extends Record<string, any>>({
  name,
  control,
  defaultValue,
  style,
  placeholder,
  isPassword,
  error,
  iconName,
}: InputFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { field } = useController<T>({
    control,
    name,
    defaultValue: defaultValue,
  });

  return (
    <>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedContainer,
          error && styles.invalidContainer,
          style,
        ]}
      >
        <Ionicons
          name={iconName}
          size={16}
          style={{
            marginRight: 10,
            color: error
              ? COLORS.red
              : isFocused
              ? COLORS.primary
              : COLORS.neutral300,
          }}
        />
        <TextInput
          maxLength={50}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
          style={[styles.input, !isFocused && styles.blurText]}
          onChangeText={field.onChange}
          value={field.value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && secureTextEntry}
        />
        {isPassword && (
          <Pressable
            onPress={() =>
              setSecureTextEntry((showPassword) => {
                return !showPassword;
              })
            }
            style={{ marginLeft: "auto" }}
          >
            <Ionicons
              name={"eye"}
              style={{ color: COLORS.neutral300 }}
              size={16}
            />
          </Pressable>
        )}
      </View>
      {error && (
        <Text style={styles.invalidText} adjustsFontSizeToFit numberOfLines={1}>
          {error.message}
        </Text>
      )}
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: COLORS.primary,
    borderWidth: 3,
    borderColor: "transparent",
    ...textStyles.normalRegular,
  },
  invalidText: {
    color: "red",
    marginTop: 6,
    ...textStyles.xSmallRegular,
  },
  blurText: {
    color: COLORS.neutral300,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.neutral300,
    borderBottomWidth: 1,
  },
  invalidContainer: {
    borderBottomColor: COLORS.red,
  },
  focusedContainer: {
    borderBottomColor: COLORS.primary,
  },
});
