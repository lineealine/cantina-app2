import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{color: '#fff'}}>Usuário</Text>
      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={(e) => setEmail(e)}
        style={{ borderWidth: 1, width: 250, padding: 8, marginBottom: 10, borderRadius: 10, backgroundColor: '#fff'}}
      />

      <Text style={{color: '#fff'}}>Senha</Text>
      <TextInput
        placeholder="Informe sua senha"
        secureTextEntry
        value={senha}
        onChangeText={(e) => setSenha(e)}
        style={{ borderWidth: 1, width: 250, padding: 8, marginBottom: 20, borderRadius: 10, backgroundColor: '#fff'}}
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
    backgroundColor: '#981f24',
    alignItems: 'center',
    justifyContent: 'center',
  },
});