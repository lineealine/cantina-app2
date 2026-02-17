import { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  Animated,
  Image
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Animação
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          alignItems: 'center'
        }}
      >
        {/* LOGO (quando tiver a imagem é só descomentar) */}
        {/*
        <Image 
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        */}

        <Text style={styles.titulo}>Bem-vindo</Text>

        <Text style={styles.label}>Usuário</Text>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Informe sua senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
        />

        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => Alert.alert(`Usuário: ${email}`)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#981f24', // NÃO MEXI
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  titulo: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1, 
    borderColor: '#ddd',
    width: 260, 
    padding: 10, 
    marginBottom: 12, 
    borderRadius: 10, 
    backgroundColor: '#fff'
  },

  botao: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 15,
    elevation: 4, // sombra no Android
  },

  textoBotao: {
    color: '#981f24',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
