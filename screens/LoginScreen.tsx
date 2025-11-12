import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';


export default function LoginScreen() {
    const [email, setEmail ] = useState('')
    const [senha, setSenha ] = useState('')
    return(
        <View style={styles.container}>
            <Text>Usuário{email}</Text>
            <TextInput placeholder="Digite seu email" onChangeText={(e) => setEmail(e)}></TextInput>
            <Text>Senha {senha}</Text>
            <TextInput placeholder="Informe sua senha" onChangeText={(e) => setSenha(e)}></TextInput>
            <Button title="Confirmar" onPress={() => Alert.alert(`Usuário:  ${email}, senha: ${senha}`)}></Button>
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