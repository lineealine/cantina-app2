import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { 
  StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, 
  Animated, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  SignupScreen: undefined;
  Pgna1: undefined;
};

type NavigationProp = StackNavigationProp<
RootStackParamList,
'SignupScreen'
>;

export default function SignupScreen() {

const [nome,setNome]=useState('');
const [email,setEmail]=useState('');
const [senha,setSenha]=useState('');
const [loading,setLoading]=useState(false);

const [campoFocado,setCampoFocado]=useState<
'nome'|'email'|'senha'|null
>(null);

const navigation=
useNavigation<NavigationProp>();

const fadeAnim=
useRef(new Animated.Value(0)).current;

const slideAnim=
useRef(new Animated.Value(30)).current;



useEffect(()=>{

Animated.parallel([

Animated.timing(fadeAnim,{
toValue:1,
duration:800,
useNativeDriver:true
}),

Animated.timing(slideAnim,{
toValue:0,
duration:800,
useNativeDriver:true
})

]).start();

},[]);



const handleSignup=async()=>{

if(!nome || !email || !senha){

Alert.alert(
'Erro',
'Preencha todos os campos!'
);

return;

}

setLoading(true);


const usuario={

nome:nome,
email:email,
senha:senha,
foto:null

};


await AsyncStorage.setItem(
"usuarioLogado",
JSON.stringify(usuario)
);



setTimeout(()=>{

setLoading(false);

navigation.navigate("Pgna1");

},1000);

};



return(

<KeyboardAvoidingView
behavior={
Platform.OS==='ios'
?'padding'
:'height'
}
style={{flex:1}}
>

<ScrollView
contentContainerStyle={{flexGrow:1}}
keyboardShouldPersistTaps="handled"
>

<View style={styles.container}>

<Animated.View
style={{
opacity:fadeAnim,
transform:[
{translateY:slideAnim}
],
alignItems:'center',
width:'100%'
}}
>

<Image
source={require('../assets/cantinaLogo.png')}
style={styles.logo}
/>

<Text style={styles.titulo}>
Criar Conta
</Text>


<View style={styles.form}>

<Text style={styles.label}>
Nome Completo
</Text>

<TextInput
placeholder="Seu nome"
placeholderTextColor="#ccc"
value={nome}
onChangeText={setNome}
onFocus={()=>setCampoFocado('nome')}
onBlur={()=>setCampoFocado(null)}
style={[
styles.input,
campoFocado==='nome'
&& styles.inputFocado
]}
/>


<Text style={styles.label}>
E-mail
</Text>

<TextInput
placeholder="Digite seu e-mail"
placeholderTextColor="#ccc"
value={email}
onChangeText={setEmail}
onFocus={()=>setCampoFocado('email')}
onBlur={()=>setCampoFocado(null)}
style={[
styles.input,
campoFocado==='email'
&& styles.inputFocado
]}
keyboardType="email-address"
autoCapitalize="none"
/>


<Text style={styles.label}>
Senha
</Text>

<TextInput
placeholder="Crie uma senha"
placeholderTextColor="#ccc"
secureTextEntry
value={senha}
onChangeText={setSenha}
onFocus={()=>setCampoFocado('senha')}
onBlur={()=>setCampoFocado(null)}
style={[
styles.input,
campoFocado==='senha'
&& styles.inputFocado
]}
/>


<TouchableOpacity
style={styles.botao}
onPress={handleSignup}
disabled={loading}
>

{loading?

<ActivityIndicator
color="#981f24"
size="small"
/>

:

<Text style={styles.textoBotao}>
Cadastrar
</Text>

}

</TouchableOpacity>


<TouchableOpacity
onPress={()=>navigation.goBack()}
style={{marginTop:20}}
>

<Text style={{
color:'#fff',
fontWeight:'bold'
}}>

Já tenho conta. Voltar

</Text>

</TouchableOpacity>


</View>

</Animated.View>

</View>

</ScrollView>

</KeyboardAvoidingView>

);

}



const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:'#981f24',
alignItems:'center',
justifyContent:'center',
paddingHorizontal:20,
minHeight:700
},

logo:{
width:140,
height:140,
marginBottom:10,
resizeMode:'contain'
},

titulo:{
color:'#fff',
fontSize:26,
fontWeight:'bold',
marginBottom:20
},

form:{
width:'100%',
alignItems:'center'
},

label:{
color:'#fff',
alignSelf:'flex-start',
marginLeft:'15%',
marginBottom:4,
fontWeight:'600'
},

input:{
borderWidth:1.5,
borderColor:'transparent',
width:'70%',
padding:12,
marginBottom:15,
borderRadius:10,
backgroundColor:'#fff',
fontSize:16,
color:'#333'
},

inputFocado:{
borderColor:'#ffd700'
},

botao:{
backgroundColor:'#fff',
paddingVertical:14,
width:'70%',
borderRadius:10,
marginTop:20,
alignItems:'center',
justifyContent:'center',
height:50
},

textoBotao:{
color:'#981f24',
fontWeight:'bold',
fontSize:18
}

});