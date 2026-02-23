import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

export default function Pgna1() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Cantina App</Text>
          <Text style={styles.subtitle}>
            Sabores caseiros e lanches
          </Text>
        </View>

        {/* SALGADOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Salgados e Assados
          </Text>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Coxinha Vegana
                <Text style={styles.badge}> VEGANO</Text>
              </Text>
              <Text style={styles.itemDesc}>
                Massa crocante com recheio de palmito
              </Text>
            </View>
            <Text style={styles.price}>R$ 12,00</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Enroladinho de Salsicha
              </Text>
              <Text style={styles.itemDesc}>
                Massa leve e salsicha
              </Text>
            </View>
            <Text style={styles.price}>R$ 8,00</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Assado de Frango
              </Text>
              <Text style={styles.itemDesc}>
                Frango desfiado caseiro
              </Text>
            </View>
            <Text style={styles.price}>R$ 14,00</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Assado de Carne
              </Text>
              <Text style={styles.itemDesc}>
                Carne moída com palmito
              </Text>
            </View>
            <Text style={styles.price}>R$ 15,00</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Pastel de Queijo
              </Text>
              <Text style={styles.itemDesc}>
                Fritura crocante
              </Text>
            </View>
            <Text style={styles.price}>R$ 10,00</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Pão de Queijo
              </Text>
              <Text style={styles.itemDesc}>
                Tradicional mineiro
              </Text>
            </View>
            <Text style={styles.price}>R$ 6,00</Text>
          </View>
        </View>

        {/* BEBIDAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Bebidas
          </Text>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Refrigerante Lata
              </Text>
              <Text style={styles.itemDesc}>
                Coca, Guaraná, Fanta
              </Text>
            </View>
            <Text style={styles.price}>R$ 5,00</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Suco Natural
              </Text>
              <Text style={styles.itemDesc}>
                Laranja, Uva, Limão
              </Text>
            </View>
            <Text style={styles.price}>R$ 7,00</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Água Mineral
              </Text>
              <Text style={styles.itemDesc}>
                Com ou sem gás
              </Text>
            </View>
            <Text style={styles.price}>R$ 3,50</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Cerveja Artesanal
              </Text>
              <Text style={styles.itemDesc}>
                Lata 350ml
              </Text>
            </View>
            <Text style={styles.price}>R$ 10,00</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemName}>
                Café
              </Text>
              <Text style={styles.itemDesc}>
                Expresso ou Pingado
              </Text>
            </View>
            <Text style={styles.price}>R$ 4,00</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Aceitamos cartões de crédito e débito
          </Text>
          <Text style={styles.footerText}>
            Bom apetite!
          </Text>
        </View>

      </ScrollView>
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
    marginBottom: 12,
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
  },
  price: {
    fontWeight: 'bold',
  },
  badge: {
    color: 'green',
    fontSize: 12,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});