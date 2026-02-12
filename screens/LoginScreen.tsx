import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text>Usuário</Text>
      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={(e) => setEmail(e)}
        style={{ borderWidth: 1, width: 250, padding: 8, marginBottom: 10 }}
      />

      <Text>Senha</Text>
      <TextInput
        placeholder="Informe sua senha"
        secureTextEntry
        value={senha}
        onChangeText={(e) => setSenha(e)}
        style={{ borderWidth: 1, width: 250, padding: 8, marginBottom: 20 }}
      />

      <Button
        title="Confirmar"
        onPress={() => Alert.alert(`Usuário: ${email}, senha: ${senha}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});