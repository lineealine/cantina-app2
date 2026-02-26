import React, { useState, useEffect } from 'react';
import {
View,
Text,
ScrollView,
SafeAreaView,
StyleSheet,
Image,
TouchableOpacity,
Alert,
Modal,
TextInput
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Pgna1() {

const navigation = useNavigation();

const [cart,setCart] = useState<any[]>([]);
const [cartOpen,setCartOpen] = useState(false);
const [saldo, setSaldo] = useState(0);
const [modalRecarga, setModalRecarga] = useState(false);
const [modalConfig, setModalConfig] = useState(false);
const [valorRecarga, setValorRecarga] = useState('');
const [isDarkMode, setIsDarkMode] = useState(false);

const menu = [
{ name:'Coxinha Vegana',price:5,img:require('../assets/coxinha-vegana.jpg')},
{ name:'Enroladinho',price:5,img:require('../assets/9ae5e0c4c6cc31faac49283836601c0e.jpg')},
{ name:'Assado de Frango',price:8,img:require('../assets/calzone-de-frango.jpg')},
{ name:'Assado de Carne',price:8,img:require('../assets/images.jpg')},
{ name:'Pastel de Queijo',price:8,img:require('../assets/images1.jpg')},
{ name:'Pão de Queijo',price:4,img:require('../assets/622052-pao-de-queijo-assado-forno_1.webp')},
{ name:'Refrigerante',price:7.5,img:require('../assets/refrigerante-lata.jpg')},
{ name:'Suco Natural',price:7,img:require('../assets/suco.jpg')},
{ name:'Água Mineral',price:3.5,img:require('../assets/agua-mineral.webp')},
{ name:'Café',price:4,img:require('../assets/cafe.jpg')},
];

useEffect(() => {
carregarDados();
}, []);

const carregarDados = async () => {
const usuarioSalvo = await AsyncStorage.getItem("usuarioLogado");
if (usuarioSalvo) {
const usuario = JSON.parse(usuarioSalvo);
setSaldo(usuario.saldo || 0);
setIsDarkMode(usuario.temaEscuro || false);
}
};

const alterarTema = async (escuro: boolean) => {
setIsDarkMode(escuro);
const usuarioSalvo = await AsyncStorage.getItem("usuarioLogado");
if (usuarioSalvo) {
const usuario = JSON.parse(usuarioSalvo);
usuario.temaEscuro = escuro;
await AsyncStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}
setModalConfig(false);
};

const salvarSaldo = async (novoSaldo: number) => {
const usuarioSalvo = await AsyncStorage.getItem("usuarioLogado");
if (usuarioSalvo) {
const usuario = JSON.parse(usuarioSalvo);
usuario.saldo = novoSaldo;
await AsyncStorage.setItem("usuarioLogado", JSON.stringify(usuario));
setSaldo(novoSaldo);
}
};

const handleRecarga = () => {
const valor = parseFloat(valorRecarga.replace(',', '.'));
if (isNaN(valor) || valor <= 0) {
Alert.alert("Erro", "Digite um valor válido.");
return;
}
const novoSaldo = saldo + valor;
salvarSaldo(novoSaldo);
setValorRecarga('');
setModalRecarga(false);
Alert.alert("Sucesso", `R$ ${valor.toFixed(2)} adicionados!`);
};

const addToCart=(item:any)=>{
const exist=cart.find(i=>i.name===item.name);
if(exist){
setCart(cart.map(i=>i.name===item.name ? {...i,qty:i.qty+1} : i));
}else{
setCart([...cart,{...item,qty:1}]);
}
};

const buySingleItem=(item:any)=>{
if (saldo < item.price) {
Alert.alert("Saldo Insuficiente", "Deseja recarregar?",);
return;
}
const novoSaldo = saldo - item.price;
salvarSaldo(novoSaldo);
Alert.alert("Sucesso", `Você comprou 1 ${item.name}`);
};

const increaseQty=(name:string)=>{
setCart(cart.map(i=>i.name===name ? {...i,qty:i.qty+1} : i));
};

const decreaseQty=(name:string)=>{
setCart(cart.map(i=>i.name===name ? {...i,qty:i.qty-1} : i).filter(i=>i.qty>0));
};

const removeItem=(name:string)=>{
setCart(cart.filter(i=>i.name!==name));
};

const totalPrice=cart.reduce((sum,item)=>sum+item.price*item.qty, 0);

const buyCart=()=>{
if(cart.length===0){
Alert.alert("Carrinho vazio");
return;
}
if (saldo < totalPrice) {
Alert.alert("Saldo Insuficiente", "Recarregue para finalizar.",);
return;
}
const novoSaldo = saldo - totalPrice;
salvarSaldo(novoSaldo);
Alert.alert("Sucesso", `Total pago: R$ ${totalPrice.toFixed(2)}`);
setCart([]);
setCartOpen(false);
};

const themeStyles = {
backgroundColor: isDarkMode ? '#121212' : '#fff',
textColor: isDarkMode ? '#fff' : '#000',
cardColor: isDarkMode ? '#1e1e1e' : '#f5f5f5'
};

return(
<SafeAreaView style={{flex:1, backgroundColor: themeStyles.backgroundColor}}>
<ScrollView>
<View style={styles.topBar}>
<Image source={require('../assets/cantinaLogo.png')} style={styles.logo}/>

<TouchableOpacity style={styles.saldoContainer} onPress={() => setModalRecarga(true)}>
<Text style={styles.saldoTexto}>Saldo: R$ {saldo.toFixed(2)}</Text>
<Ionicons name="add-circle" size={18} color="#fff" style={{marginLeft: 5}} />
</TouchableOpacity>

<TouchableOpacity style={styles.settingsButton} onPress={() => setModalConfig(true)}>
<Ionicons name="settings-outline" size={26} color="#fff" />
</TouchableOpacity>

<TouchableOpacity style={styles.profileButton} onPress={()=>navigation.navigate("usuarioPerfil")}>
<Ionicons name="person-outline" size={26} color="#fff" />
</TouchableOpacity>
</View>

<View style={styles.section}>
{menu.map((item,index)=>(
<View key={index} style={[styles.card, {backgroundColor: themeStyles.cardColor}]}>
<Image source={item.img} style={styles.image}/>
<Text style={[styles.name, {color: themeStyles.textColor}]}>{item.name}</Text>
<Text style={[styles.price, {color: themeStyles.textColor}]}>R$ {item.price.toFixed(2)}</Text>
<TouchableOpacity style={styles.addButton} onPress={()=>addToCart(item)}>
<Text style={styles.buttonText}>Adicionar</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.buySingleButton} onPress={()=>buySingleItem(item)}>
<Text style={styles.buttonText}>Comprar</Text>
</TouchableOpacity>
</View>
))}
</View>
</ScrollView>

<TouchableOpacity style={styles.cartButton} onPress={()=>setCartOpen(true)}>
<Ionicons name="cart" size={28} color="#fff" />
<View style={styles.badge}>
<Text style={{color:"#fff",fontWeight:"bold"}}>{cart.reduce((sum,i)=>sum+i.qty,0)}</Text>
</View>
</TouchableOpacity>

<Modal visible={modalRecarga} transparent animationType="fade">
<View style={styles.modalOverlay}>
<View style={[styles.modalContent, {backgroundColor: themeStyles.backgroundColor}]}>
<Text style={[styles.modalTitle, {color: themeStyles.textColor}]}>Adicionar Saldo</Text>
<TextInput 
style={[styles.inputRecarga, {color: themeStyles.textColor, borderColor: themeStyles.textColor}]}
placeholder="R$ 0,00"
placeholderTextColor="#999"
keyboardType="numeric"
value={valorRecarga}
onChangeText={setValorRecarga}
/>
<View style={styles.modalButtons}>
<TouchableOpacity style={[styles.btnModal, {backgroundColor: '#ccc'}]} onPress={() => setModalRecarga(false)}>
<Text style={styles.btnModalText}>Sair</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.btnModal, {backgroundColor: 'green'}]} onPress={handleRecarga}>
<Text style={styles.btnModalText}>OK</Text>
</TouchableOpacity>
</View>
</View>
</View>
</Modal>

<Modal visible={modalConfig} transparent animationType="slide">
<View style={styles.modalOverlay}>
<View style={[styles.modalContent, {backgroundColor: themeStyles.backgroundColor}]}>
<Text style={[styles.modalTitle, {color: themeStyles.textColor}]}>Configurações</Text>
<Text style={{color: themeStyles.textColor, marginBottom: 20}}>Selecione o tema do App:</Text>

<TouchableOpacity 
style={[styles.btnTema, {backgroundColor: isDarkMode ? '#333' : '#eee'}]} 
onPress={() => alterarTema(false)}
>
<Ionicons name="sunny" size={20} color={isDarkMode ? "#aaa" : "#ffcc00"} />
<Text style={[styles.btnTemaTexto, {color: themeStyles.textColor}]}> Tema Claro</Text>
</TouchableOpacity>

<TouchableOpacity 
style={[styles.btnTema, {backgroundColor: isDarkMode ? '#444' : '#eee', marginTop: 10}]} 
onPress={() => alterarTema(true)}
>
<Ionicons name="moon" size={20} color={isDarkMode ? "#99ccff" : "#333"} />
<Text style={[styles.btnTemaTexto, {color: themeStyles.textColor}]}> Tema Escuro</Text>
</TouchableOpacity>

<TouchableOpacity style={{marginTop: 30}} onPress={() => setModalConfig(false)}>
<Text style={{color: 'red', fontWeight: 'bold'}}>Fechar</Text>
</TouchableOpacity>
</View>
</View>
</Modal>

{cartOpen &&(
<View style={[styles.cartPanel, {backgroundColor: themeStyles.backgroundColor}]}>
<View style={styles.cartHeader}>
<Text style={[styles.cartTitle, {color: themeStyles.textColor}]}>Carrinho</Text>
<TouchableOpacity onPress={()=>setCartOpen(false)}><Ionicons name="close" size={26} color={themeStyles.textColor}/></TouchableOpacity>
</View>
<ScrollView>
{cart.map((item,index)=>(
<View key={index} style={styles.cartItem}>
<Image source={item.img} style={styles.cartImage}/>
<View style={{flex:1}}>
<Text style={[styles.cartName, {color: themeStyles.textColor}]}>{item.name}</Text>
<Text style={[styles.cartPrice, {color: themeStyles.textColor}]}>R$ {item.price.toFixed(2)}</Text>
<View style={styles.qtyRow}>
<TouchableOpacity style={styles.qtyButton} onPress={()=>decreaseQty(item.name)}><Text style={styles.qtyText}>-</Text></TouchableOpacity>
<Text style={[styles.qtyNumber, {color: themeStyles.textColor}]}>{item.qty}</Text>
<TouchableOpacity style={styles.qtyButton} onPress={()=>increaseQty(item.name)}><Text style={styles.qtyText}>+</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>removeItem(item.name)} style={styles.trashButton}><Ionicons name="trash" size={26} color="#fff" /></TouchableOpacity>
</View>
</View>
</View>
))}
</ScrollView>
<View style={styles.totalBox}>
<Text style={[styles.total, {color: themeStyles.textColor}]}>Total: R$ {totalPrice.toFixed(2)}</Text>
<TouchableOpacity style={styles.buyButton} onPress={buyCart}><Text style={styles.buyText}>Finalizar</Text></TouchableOpacity>
</View>
</View>
)}
</SafeAreaView>
);
}

const styles=StyleSheet.create({
topBar:{ 
height: 185, 
backgroundColor: "#9d1c23", 
justifyContent: "center", 
alignItems: "center",
paddingTop: 10
},
logo:{ 
width: 160, 
height: 100,
resizeMode: 'contain',
marginBottom: 10
},
saldoContainer: { 
position: 'absolute', 
left: 20, 
bottom: 12, 
backgroundColor: 'rgba(0,0,0,0.4)', 
paddingHorizontal: 12, 
paddingVertical: 5, 
borderRadius: 12, 
flexDirection: 'row', 
alignItems: 'center',
borderWidth: 1,
borderColor: 'rgba(255,255,255,0.2)'
},
saldoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
settingsButton: { position: "absolute", right: 20, bottom: 65, backgroundColor: "#ffffff20", width: 45, height: 45, borderRadius: 25, justifyContent: "center", alignItems: "center" },
profileButton:{ position:"absolute", right:20, bottom:10, backgroundColor:"#ffffff20", width:45, height:45, borderRadius:25, justifyContent:"center", alignItems:"center" },
section:{ padding:15, flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between" },
card:{ width:"48%", borderRadius:12, padding:10, marginBottom:15, elevation:3 },
image:{ width:"100%", height:130, borderRadius:10 },
name:{ fontWeight:"bold", marginTop:6, fontSize:14 },
price:{ marginVertical:5, fontSize:14 },
addButton:{ backgroundColor:"#9d1c23", padding:8, borderRadius:8, marginTop:5 },
buySingleButton:{ backgroundColor:"green", padding:8, borderRadius:8, marginTop:5 },
buttonText:{ color:"#fff", textAlign:"center", fontWeight:"bold" },
cartButton:{ position:"absolute", bottom:20, right:20, backgroundColor:"#9d1c23", padding:15, borderRadius:50, elevation:5 },
badge:{ position:"absolute", top:-5, right:-5, backgroundColor:"green", borderRadius:10, paddingHorizontal:6 },
cartPanel:{ position:"absolute", right:0, top:0, bottom:0, width:"85%", padding:15, elevation:10 },
cartHeader:{ flexDirection:"row", justifyContent:"space-between", marginBottom:10 },
cartTitle:{ fontSize:22, fontWeight:"bold" },
cartItem:{ flexDirection:"row", marginBottom:18, alignItems:"center" },
cartImage:{ width:75, height:75, borderRadius:10, marginRight:10 },
cartName:{ fontWeight:"bold", fontSize:16 },
cartPrice:{ marginTop:2, fontSize:14 },
qtyRow:{ flexDirection:"row", alignItems:"center", marginTop:8 },
qtyButton:{ backgroundColor:"#e0e0e0", width:30, height:30, borderRadius:6, justifyContent:"center", alignItems:"center" },
qtyText:{ fontSize:18, fontWeight:"bold" },
qtyNumber:{ marginHorizontal:12, fontSize:16 },
trashButton:{ marginLeft:12, backgroundColor:"#9d1c23", width:36, height:36, borderRadius:8, justifyContent:"center", alignItems:"center" },
totalBox:{ borderTopWidth:1, borderColor:"#ddd", paddingTop:10 },
total:{ fontSize:20, fontWeight:"bold", marginBottom:10 },
buyButton:{ backgroundColor:"#9d1c23", padding:14, borderRadius:10, alignItems:"center" },
buyText:{ color:"#fff", fontSize:16, fontWeight:"bold" },
modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
modalContent: { width: '80%', borderRadius: 20, padding: 25, alignItems: 'center' },
modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
inputRecarga: { width: '100%', borderWidth: 1, borderRadius: 10, padding: 15, fontSize: 18, textAlign: 'center', marginBottom: 20 },
modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
btnModal: { flex: 1, padding: 12, borderRadius: 10, marginHorizontal: 5 },
btnModalText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
btnTema: { flexDirection: 'row', width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
btnTemaTexto: { fontWeight: 'bold', fontSize: 16 }
});
