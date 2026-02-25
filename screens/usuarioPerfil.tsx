import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UsuarioPerfil({ navigation }: any) {

  const [name, setName] = useState('Usuário');
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPasswordEditor, setShowPasswordEditor] = useState(false);


  // CARREGAR USUARIO SALVO
  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {

    const usuarioSalvo =
    await AsyncStorage.getItem("usuarioLogado");

    if(usuarioSalvo){

      const usuario =
      JSON.parse(usuarioSalvo);

      setName(usuario.nome || "Usuário");
      setPassword(usuario.senha || "");
      setEmail(usuario.email || "");
      setImage(usuario.foto || null);

    }

  };


  // SALVAR USUARIO COMPLETO
  const salvarUsuario = async (
    novoNome = name,
    novaFoto = image,
    novaSenha = password
  ) => {

    const usuario = {

      nome:novoNome,
      email:email,
      senha:novaSenha,
      foto:novaFoto

    };

    await AsyncStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuario)
    );

  };



  const pickImage = async () => {

    const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {

      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à galeria.'
      );

      return;

    }

    const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {

      const novaFoto =
      result.assets[0].uri;

      setImage(novaFoto);

      salvarUsuario(name,novaFoto,password);

    }

  };


  // LOGOUT COM CONFIRMAÇÃO (SEM APAGAR LOGIN SALVO)
  const logout = () => {

    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        {
          text:'Cancelar',
          style:'cancel'
        },

        {
          text:'Sair',
          style:'destructive',

          onPress:()=>{

            navigation.navigate('Login');

          }

        }

      ]
    );

  };


  return (

<ScrollView style={styles.container}>

<View style={styles.header}>

<Text style={styles.headerTitle}>
Seu Perfil
</Text>


<TouchableOpacity onPress={pickImage}>

{image ? (

<Image
source={{ uri: image }}
style={styles.profileImage}
/>

) : (

<View style={styles.placeholder}>

<Text style={styles.placeholderText}>
{name.charAt(0).toUpperCase()}
</Text>

</View>

)}

</TouchableOpacity>


<Text style={styles.name}>
{name}
</Text>

</View>



<View style={styles.buttonsContainer}>

<TouchableOpacity
style={styles.button}
onPress={() => setEditing(!editing)}
>

<Text style={styles.buttonText}>
Editar Perfil
</Text>

</TouchableOpacity>



<TouchableOpacity
style={styles.button}
onPress={() =>
setShowPasswordEditor(
!showPasswordEditor
)}
>

<Text style={styles.buttonText}>
Privacidade
</Text>

</TouchableOpacity>



<TouchableOpacity
style={styles.logoutButton}
onPress={logout}
>

<Text style={styles.buttonText}>
Sair da Conta
</Text>

</TouchableOpacity>

</View>



{editing && (

<View style={styles.editSection}>

<TextInput
style={styles.input}
value={name}
onChangeText={(texto)=>{

setName(texto);
salvarUsuario(texto,image,password);

}}
placeholder="Digite seu nome"
/>

</View>

)}



{showPasswordEditor && (

<View style={styles.editSection}>

<Text style={styles.sectionTitle}>
Alterar Senha
</Text>

<TextInput
style={styles.input}
value={password}
onChangeText={(texto)=>{

setPassword(texto);
salvarUsuario(name,image,texto);

}}
secureTextEntry
/>

</View>

)}

</ScrollView>

);

}



const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:'#fff'
},

header:{
alignItems:'center',
padding:30,
backgroundColor:'#8B0000'
},

headerTitle:{
fontSize:20,
fontWeight:'bold',
color:'#fff',
marginBottom:15
},

profileImage:{
width:120,
height:120,
borderRadius:60,
marginBottom:10
},

placeholder:{
width:120,
height:120,
borderRadius:60,
backgroundColor:'#fff',
alignItems:'center',
justifyContent:'center',
marginBottom:10
},

placeholderText:{
fontSize:40,
fontWeight:'bold',
color:'#8B0000'
},

name:{
fontSize:22,
fontWeight:'bold',
color:'#fff'
},

buttonsContainer:{
padding:20
},

button:{
backgroundColor:'#8B0000',
padding:12,
borderRadius:8,
marginBottom:10
},

logoutButton:{
backgroundColor:'#B22222',
padding:12,
borderRadius:8,
marginBottom:10
},

buttonText:{
color:'#fff',
textAlign:'center',
fontWeight:'bold'
},

editSection:{
paddingHorizontal:20,
marginBottom:20
},

input:{
borderWidth:1,
borderColor:'#ccc',
padding:10,
borderRadius:8,
marginTop:10
},

sectionTitle:{
fontSize:18,
fontWeight:'bold',
marginBottom:10
}

});