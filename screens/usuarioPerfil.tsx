import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UsuarioPerfil() {

  const [name, setName] = useState('Usuário');
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      {/* FOTO */}
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
        <Text style={styles.changePhotoText}>
          {image ? 'Trocar foto' : 'Adicionar foto'}
        </Text>
      </TouchableOpacity>

      {/* NOME */}
      {editing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      ) : (
        <Text style={styles.name}>{name}</Text>
      )}

      {/* BOTÃO EDITAR */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setEditing(!editing)}
      >
        <Text style={styles.buttonText}>
          {editing ? 'Salvar Nome' : 'Editar Nome'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  placeholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  changePhotoText: {
    color: '#8B0000',
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 200,
    padding: 8,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});