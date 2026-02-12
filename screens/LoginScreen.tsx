import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{color: '#fff'}}>Usuário</Text>
      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Text style={{color: '#fff'}}>Senha</Text>
      <TextInput
        placeholder="Informe sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />

      {/* Botão com animação nativa de clique */}
      <TouchableOpacity 
        style={styles.botao} 
        onPress={() => Alert.alert(`Usuário: ${email}`)}
        activeOpacity={0.7} // Controla o quanto ele "some" ao clicar
      >
        <Text style={styles.textoBotao}>Confirmar</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1, 
    width: 250, 
    padding: 8, 
    marginBottom: 10, 
    borderRadius: 10, 
    backgroundColor: '#fff'
  },
  botao: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotao: {
    color: '#981f24',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
