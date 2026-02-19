import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  Animated,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [campoFocado, setCampoFocado] = useState(null); 

 
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true })
    ]).start();
  }, []);

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
     
      navigation.navigate('Pgna1');
      
    }, 2000);
  };

  return (
    
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={styles.container}>
          <Animated.View 
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Image 
              source={require('../assets/cantinaLogo.png')}
              style={styles.logo}
            />

            <Text style={styles.titulo}>Bem-vindo</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Usuário</Text>
                <TextInput
                  placeholder="Digite seu email"
                  placeholderTextColor="#ccc"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setCampoFocado('email')}
                  onBlur={() => setCampoFocado(null)}
                  style={[styles.input, campoFocado === 'email' && styles.inputFocado]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                  placeholder="Informe sua senha"
                  placeholderTextColor="#ccc"
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                  onFocus={() => setCampoFocado('senha')}
                  onBlur={() => setCampoFocado(null)}
                  style={[styles.input, campoFocado === 'senha' && styles.inputFocado]}
                />
                <TouchableOpacity 
                  style={styles.botao} 
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  {loading ? (
                    <ActivityIndicator color="#981f24" size="small" />
                  ) : (
                    <Text style={styles.textoBotao}>Entrar</Text>
                  )}
                </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#981f24', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    minHeight: 600, 
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: '15%',
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1.5, 
    borderColor: 'transparent', 
    width: '70%', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 10, 
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333'
  },
  inputFocado: {
    borderColor: '#ffd700', 
  },
  botao: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    width: '70%',
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, 
  },
  textoBotao: {
    color: '#981f24',
    fontWeight: 'bold',
    fontSize: 18,
  }
});