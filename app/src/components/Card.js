import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation ,useTheme} from '@react-navigation/native';
import {useSelector,useDispatch} from 'react-redux'
const Card = (props)=>{
    const navigation = useNavigation();
    const {colors} = useTheme()
    const textcolor = colors.iconColor
    const dispatch = useDispatch()
    const onPress = () => dispatch({type:"REMOVE",payload:props.item});
  return(
      <TouchableOpacity
      onPress={()=>navigation.navigate("videoplayer",{videoId:props.videoId,title:props.title})}
      >
      <View style={{marginBottom:10}}
      
      >
          <Image 
           source={{uri:`https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`}}
           style={{
               width:"100%",
               height:200
           }}
           
     />
     <View style={{
         flexDirection:"row",
         margin:5
     }}>
          <MaterialIcons name="account-circle" size={40} color="#212121" />
         <View
         style={{
             marginLeft:10
         }}
         >
             <Text style={{
                 fontSize:20,
                 width:Dimensions.get("screen").width - 50,
                 color:textcolor

             }}
             ellipsizeMode="tail"
             numberOfLines={2}
             >{props.title}</Text>
            <Text style={{
                color:textcolor

            }}>{props.channel}</Text>
            <TouchableOpacity
                onPress={()=>dispatch({type:"PUT",payload:props.item})}
      >
               <Text style={{fontSize:12, color:textcolor}}>Favorite</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>dispatch({type:"REMOVE",payload:props.item})}
      >
               <Text style={{fontSize:12, color:textcolor}}>UnFavorite</Text>
                </TouchableOpacity>
         </View>
         
     </View>
     </View>
     </TouchableOpacity>

  )
}

export default Card