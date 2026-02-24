import React, { useState } from 'react';
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

export default function UsuarioPerfil() {

  const [name, setName] = useState('Usuário');
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [password, setPassword] = useState('123456');
  const [showPasswordEditor, setShowPasswordEditor] = useState(false);

  const purchaseHistory = [
    { id: 1, item: 'Coxinha Vegana', price: 'R$ 5,00' },
    { id: 2, item: 'Refrigerante', price: 'R$ 7,50' },
    { id: 3, item: 'Pastel de Queijo', price: 'R$ 8,00' },
  ];

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
    <ScrollView style={styles.container}>

      {/* FOTO + NOME */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.name}>{name}</Text>
      </View>

      {/* BOTÕES */}
      <View style={styles.buttonsContainer}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowPasswordEditor(!showPasswordEditor)}
        >
          <Text style={styles.buttonText}>Privacidade</Text>
        </TouchableOpacity>

      </View>

      {/* EDITAR NOME */}
      {editing && (
        <View style={styles.editSection}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
          />
        </View>
      )}

      {/* PRIVACIDADE / SENHA */}
      {showPasswordEditor && (
        <View style={styles.editSection}>
          <Text style={styles.sectionTitle}>Alterar Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      )}

      {/* HISTÓRICO */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Histórico de Compras</Text>

        {purchaseHistory.map((purchase) => (
          <View key={purchase.id} style={styles.historyItem}>
            <Text>{purchase.item}</Text>
            <Text>{purchase.price}</Text>
          </View>
        ))}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#8B0000',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#8B0000',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonsContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#8B0000',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  historyContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});