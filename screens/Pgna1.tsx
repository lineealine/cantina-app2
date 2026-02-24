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

const [cart,setCart] = useState<any[]>([]);
const [cartOpen,setCartOpen] = useState(false);

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


// ADICIONAR
const addToCart=(item:any)=>{

const exist=cart.find(i=>i.name===item.name);

if(exist){
setCart(cart.map(i=>
i.name===item.name
? {...i,qty:i.qty+1}
: i
));
}else{
setCart([...cart,{...item,qty:1}]);
}

};


// COMPRAR DIRETO
const buySingleItem=(item:any)=>{

Alert.alert(
"Compra realizada",
`Você comprou 1 ${item.name}`
);

};


// CONTROLES

const increaseQty=(name:string)=>{
setCart(cart.map(i=>
i.name===name
? {...i,qty:i.qty+1}
: i
));
};

const decreaseQty=(name:string)=>{

setCart(
cart.map(i=>
i.name===name
? {...i,qty:i.qty-1}
: i
).filter(i=>i.qty>0)
);

};

const removeItem=(name:string)=>{
setCart(cart.filter(i=>i.name!==name));
};


const totalPrice=cart.reduce(
(sum,item)=>sum+item.price*item.qty,
0
);


const buyCart=()=>{

if(cart.length===0){
Alert.alert("Carrinho vazio");
return;
}

Alert.alert(
"Compra realizada",
`Total pago: R$ ${totalPrice.toFixed(2)}`
);

setCart([]);
setCartOpen(false);

};



return(

<SafeAreaView style={{flex:1}}>

<ScrollView>

<View style={styles.topBar}>

<Image
source={require('../assets/cantinaLogo.png')}
style={styles.logo}
/>

<TouchableOpacity
style={styles.profileButton}
onPress={()=>navigation.navigate("usuarioPerfil")}
>
<Ionicons name="person-outline" size={26} color="#fff"/>
</TouchableOpacity>

</View>



<View style={styles.section}>

{menu.map((item,index)=>(

<View key={index} style={styles.card}>

<Image source={item.img} style={styles.image}/>

<Text style={styles.name}>
{item.name}
</Text>

<Text style={styles.price}>
R$ {item.price.toFixed(2)}
</Text>


<TouchableOpacity
style={styles.addButton}
onPress={()=>addToCart(item)}
>
<Text style={styles.buttonText}>
Adicionar ao Carrinho
</Text>
</TouchableOpacity>


<TouchableOpacity
style={styles.buySingleButton}
onPress={()=>buySingleItem(item)}
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
onPress={()=>setCartOpen(true)}
>

<Ionicons name="cart" size={28} color="#fff"/>

<View style={styles.badge}>
<Text style={{color:"#fff",fontWeight:"bold"}}>
{cart.reduce((sum,i)=>sum+i.qty,0)}
</Text>
</View>

</TouchableOpacity>




{cartOpen &&(

<View style={styles.cartPanel}>

<View style={styles.cartHeader}>

<Text style={styles.cartTitle}>
Carrinho
</Text>

<TouchableOpacity
onPress={()=>setCartOpen(false)}
>
<Ionicons name="close" size={26}/>
</TouchableOpacity>

</View>


<ScrollView>

{cart.map((item,index)=>(

<View key={index} style={styles.cartItem}>

<Image
source={item.img}
style={styles.cartImage}
/>

<View style={{flex:1}}>

<Text style={styles.cartName}>
{item.name}
</Text>

<Text style={styles.cartPrice}>
R$ {item.price.toFixed(2)}
</Text>


<View style={styles.qtyRow}>

<TouchableOpacity
style={styles.qtyButton}
onPress={()=>decreaseQty(item.name)}
>
<Text style={styles.qtyText}>-</Text>
</TouchableOpacity>


<Text style={styles.qtyNumber}>
{item.qty}
</Text>


<TouchableOpacity
style={styles.qtyButton}
onPress={()=>increaseQty(item.name)}
>
<Text style={styles.qtyText}>+</Text>
</TouchableOpacity>


<TouchableOpacity
onPress={()=>removeItem(item.name)}
style={styles.trashButton}
>
<Ionicons name="trash" size={26} color="#fff"/>
</TouchableOpacity>

</View>

</View>

</View>

))}

</ScrollView>


<View style={styles.totalBox}>

<Text style={styles.total}>
Total: R$ {totalPrice.toFixed(2)}
</Text>


<TouchableOpacity
style={styles.buyButton}
onPress={buyCart}
>

<Text style={styles.buyText}>
Finalizar Compra
</Text>

</TouchableOpacity>

</View>

</View>

)}

</SafeAreaView>

);
}



const styles=StyleSheet.create({

topBar:{
height:155,
backgroundColor:"#9d1c23",
justifyContent:"center",
alignItems:"center"
},

logo:{
width:220,
height:155
},

profileButton:{
position:"absolute",
right:20,
bottom:25,
backgroundColor:"#ffffff20",
width:45,
height:45,
borderRadius:25,
justifyContent:"center",
alignItems:"center"
},


section:{
padding:15,
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
},

card:{
width:"48%",
backgroundColor:"#f5f5f5",
borderRadius:12,
padding:10,
marginBottom:15,
elevation:3
},

image:{
width:"100%",
height:130,
borderRadius:10
},

name:{
fontWeight:"bold",
marginTop:6,
fontSize:14
},

price:{
marginVertical:5,
fontSize:14
},


addButton:{
backgroundColor:"#9d1c23",
padding:8,
borderRadius:8,
marginTop:5
},

buySingleButton:{
backgroundColor:"green",
padding:8,
borderRadius:8,
marginTop:5
},

buttonText:{
color:"#fff",
textAlign:"center",
fontWeight:"bold"
},



cartButton:{
position:"absolute",
bottom:20,
right:20,
backgroundColor:"#9d1c23",
padding:15,
borderRadius:50,
elevation:5
},

badge:{
position:"absolute",
top:-5,
right:-5,
backgroundColor:"green",
borderRadius:10,
paddingHorizontal:6
},



cartPanel:{
position:"absolute",
right:0,
top:0,
bottom:0,
width:"85%",
backgroundColor:"#fff",
padding:15,
elevation:10
},

cartHeader:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

cartTitle:{
fontSize:22,
fontWeight:"bold"
},

cartItem:{
flexDirection:"row",
marginBottom:18,
alignItems:"center"
},

cartImage:{
width:75,
height:75,
borderRadius:10,
marginRight:10
},

cartName:{
fontWeight:"bold",
fontSize:16
},

cartPrice:{
marginTop:2,
fontSize:14
},

qtyRow:{
flexDirection:"row",
alignItems:"center",
marginTop:8
},

qtyButton:{
backgroundColor:"#e0e0e0",
width:30,
height:30,
borderRadius:6,
justifyContent:"center",
alignItems:"center"
},

qtyText:{
fontSize:18,
fontWeight:"bold"
},

qtyNumber:{
marginHorizontal:12,
fontSize:16
},

trashButton:{
marginLeft:12,
backgroundColor:"#9d1c23",
width:36,
height:36,
borderRadius:8,
justifyContent:"center",
alignItems:"center"
},


totalBox:{
borderTopWidth:1,
borderColor:"#ddd",
paddingTop:10
},

total:{
fontSize:20,
fontWeight:"bold",
marginBottom:10
},

buyButton:{
backgroundColor:"#9d1c23",
padding:14,
borderRadius:10,
alignItems:"center"
},

buyText:{
color:"#fff",
fontSize:16,
fontWeight:"bold"
}

});