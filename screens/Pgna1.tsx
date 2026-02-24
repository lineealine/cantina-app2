import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Pgna1() {

  const navigation = useNavigation();

  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
    Alert.alert('Adicionado!', `${item.name} foi adicionado ao carrinho.`);
  };

  const buySingleItem = (item: any) => {
    Alert.alert('Compra realizada!', `Você comprou 1 ${item.name}`);
  };

  const buyCart = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens antes de comprar.');
      return;
    }

    Alert.alert(
      'Compra realizada!',
      `Você comprou ${cart.length} itens.`
    );

    setCart([]);
  };

  const menu = [
    { name: 'Coxinha Vegana', desc: 'Massa crocante com palmito', price: 'R$ 5,00', img: require('../assets/coxinha-vegana.jpg') },
    { name: 'Enroladinho', desc: 'Massa leve e salsicha', price: 'R$ 5,00', img: require('../assets/9ae5e0c4c6cc31faac49283836601c0e.jpg') },
    { name: 'Assado de Frango', desc: 'Frango desfiado caseiro', price: 'R$ 8,00', img: require('../assets/calzone-de-frango.jpg') },
    { name: 'Assado de Carne', desc: 'Carne moída com palmito', price: 'R$ 8,00', img: require('../assets/images.jpg') },
    { name: 'Pastel de Queijo', desc: 'Fritura crocante', price: 'R$ 8,00', img: require('../assets/images1.jpg') },
    { name: 'Pão de Queijo', desc: 'Tradicional mineiro', price: 'R$ 4,00', img: require('../assets/622052-pao-de-queijo-assado-forno_1.webp') },
    { name: 'Refrigerante', desc: 'Coca, Guaraná, Fanta', price: 'R$ 7,50', img: require('../assets/refrigerante-lata.jpg') },
    { name: 'Suco Natural', desc: 'Laranja, Uva, Limão', price: 'R$ 7,00', img: require('../assets/suco.jpg') },
    { name: 'Água Mineral', desc: 'Com ou sem gás', price: 'R$ 3,50', img: require('../assets/agua-mineral.webp') },
    { name: 'Café', desc: 'Expresso ou Pingado', price: 'R$ 4,00', img: require('../assets/cafe.jpg') },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <ScrollView style={styles.scrollView}>

        <View style={styles.topBar}>

          <Image
            source={require('../assets/cantinaLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('usuarioPerfil')}
          >
            <Ionicons name="person-outline" size={26} color="#fff" />
          </TouchableOpacity>

        </View>


        <View style={styles.section}>
          {menu.map((item, index) => (
            <View key={index} style={styles.card}>

              <Image source={item.img} style={styles.image} />

              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
              <Text style={styles.price}>{item.price}</Text>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.buttonText}>
                  Adicionar ao Carrinho
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buySingleButton}
                onPress={() => buySingleItem(item)}
              >
                <Text style={styles.buttonText}>
                  Comprar
                </Text>
              </TouchableOpacity>

            </View>
          ))}
        </View>

      </ScrollView>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={buyCart}
      >
        <Ionicons name="cart" size={28} color="#fff" />

        {cart.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {cart.length}
            </Text>
          </View>
        )}

      </TouchableOpacity>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  scrollView: {
    backgroundColor: '#fff',
  },

  section: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },

  itemName: {
    fontWeight: 'bold',
    marginTop: 5,
  },

  itemDesc: {
    fontSize: 12,
    color: '#666',
  },

  price: {
    fontWeight: 'bold',
    marginVertical: 5,
  },

  addButton: {
    backgroundColor: '#9d1c23',
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
  },

  buySingleButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },


  topBar: {
    height: 140,
    backgroundColor: '#9d1c23',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 220,
    height: 110,
  },

  profileButton: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    backgroundColor: '#ffffff15',
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },


  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9d1c23',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'green',
    borderRadius: 10,
    paddingHorizontal: 6,
  },

  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
  },

});