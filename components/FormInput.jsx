import { StyleSheet, Text, TextInput, View } from "react-native";

export default function FormInput({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  secureTextEntry,
  keyboardType,
  error,
}) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, error && styles.inputError]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 12, color: "#333", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
  },
  inputError: { borderColor: "#cc0000" },
  error: { color: "#cc0000", marginTop: 6 },
});
