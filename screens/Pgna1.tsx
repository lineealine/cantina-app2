import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

export default function Pgna1() {
  const salgados = [
    {
      nome: "Coxinha Vegana",
      img: require('../assets/coxinha-vegana.jpg'),
      desc: "Massa crocante com recheio de palmito",
      preco: "R$ 5,00"
    },
    {
      nome: "Enroladinho de Salsicha",
      img: require('../assets/9ae5e0c4c6cc31faac49283836601c0e.jpg'),
      desc: "Massa leve e salsicha",
      preco: "R$ 5,00"
    },
    {
      nome: "Assado de Frango",
      img: require('../assets/calzone-de-frango.jpg'),
      desc: "Frango desfiado caseiro",
      preco: "R$ 8,00"
    },
    {
      nome: "Assado de Carne",
      img: require('../assets/images.jpg'),
      desc: "Carne moída com palmito",
      preco: "R$ 8,00"
    },
    {
      nome: "Pastel de Queijo",
      img: require('../assets/images1.jpg'),
      desc: "Fritura crocante",
      preco: "R$ 8,00"
    },
    {
      nome: "Pão de Queijo",
      img: require('../assets/622052-pao-de-queijo-assado-forno_1.webp'),
      desc: "Tradicional mineiro",
      preco: "R$ 4,00"
    }
  ];

  const bebidas = [
    {
      nome: "Refrigerante Lata",
      img: require('../assets/refrigerante-lata.jpg'),
      desc: "Coca, Guaraná, Fanta",
      preco: "R$ 7,50"
    },
    {
      nome: "Suco Natural",
      img: require('../assets/suco.jpg'),
      desc: "Laranja, Uva, Limão",
      preco: "R$ 7,00"
    },
    {
      nome: "Água Mineral",
      img: require('../assets/agua-mineral.webp'),
      desc: "Com ou sem gás",
      preco: "R$ 3,50"
    },
    {
      nome: "Café",
      img: require('../assets/cafe.jpg'),
      desc: "Expresso ou Pingado",
      preco: "R$ 4,00"
    }
  ];

  const renderItem = (item: any, index: number) => (
    <View key={index} style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemName}>{item.nome}</Text>

        <Image
          source={item.img}
          style={styles.image}
        />

        <Text style={styles.itemDesc}>{item.desc}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.buttonText}>🛒 Carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buttonText}>💳 Comprar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.price}>{item.preco}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>

        <View style={styles.header}>
          <Text style={styles.title}>Cantina App</Text>
          <Text style={styles.subtitle}>
            Sabores caseiros e lanches
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salgados e Assados</Text>
          {salgados.map(renderItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bebidas</Text>
          {bebidas.map(renderItem)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Aceitamos cartões de crédito e débito
          </Text>
          <Text style={styles.footerText}>
            Bom apetite!
          </Text>
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>🛒</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#8B0000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    marginTop: 5,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemDesc: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  price: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
  },
  cartButton: {
    backgroundColor: '#FFA500',
    padding: 6,
    borderRadius: 5,
  },
  buyButton: {
    backgroundColor: '#008000',
    padding: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#8B0000',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});