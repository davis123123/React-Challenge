import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,FlatList,ActivityIndicator,Animated} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import MiniCard from '../components/MiniCard'
import Constant from 'expo-constants'
import {useTheme} from '@react-navigation/native'
import {useSelector,useDispatch} from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component"
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyDtCWCduSedfthvh

const SearchScreen = ({navigation})=>{
    const {colors} =  useTheme()
    const mycolor = colors.iconColor
    var hasScrolled = false
    const [value,setValue] = useState("")
    // const [miniCardData,setMiniCard] = useState([])
    const [npToken, setNPToken] = useState("")
    let has = false
    let refresh = false
    const dispatch = useDispatch()
    const miniCardData = useSelector(state=>{
        return state.cardData
    })
    const favData = useSelector(state=>{
        return state.favReducer
    })
    const [loading,setLoading] = useState(false)
    const fetchData = () =>{
        has = false
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyCQuFRo5eTGIELKGq29KLp70CJuwetipbk`)
        .then(res=>res.json())
        .then(data=>{

            
            //console.log(data)
            setLoading(false)
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
            

            //setMiniCard(data.items)
        })
        has = true
        console.log("here33", favData)

    }
    const fetchData2 = () =>{
        //console.log("hasScrolled", hasScrolled)
        if(!has){ return null; }
        has = true/*
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&nextPageToken=${npToken}&q=${value}&type=video&key=AIzaSyCFg6FBEiL8Vebs8UPXRPjIyjYDHOQwRWE`)
        .then(res=>res.json())
        .then(data=>{
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
            //console.log("here22")
        })
*/
         console.log("here242")
         has = false
    }

  const onScroll = () => {
    hasScrolled = true
  }

  const renderFooter = () => {

     return loading ?<ActivityIndicator size="medium" color="red"/>:null 
  };


  return(
      <View style={{
          flex:1,
          marginTop:Constant.statusBarHeight,
          }}>
          <View style={{
              padding:5,
              flexDirection:"row",
              justifyContent:"space-around",
              elevation:5,
              backgroundColor:colors.headerColor
        
          }}>
             <Ionicons
             style={{color:mycolor}}
             name="md-arrow-back" size={32}
             onPress={()=>navigation.goBack()}
             />
             <TextInput
             style={{
                 width:"70%",
                 backgroundColor:"#e6e6e6"
                }}
             value={value}
             onChangeText={(text)=>setValue(text)}

             />
             <Ionicons
              style={{color:mycolor}}
             name="md-send"
             size={32}
             onPress={()=>fetchData()}
             />
             
          </View>
           {loading ?<ActivityIndicator style={{marginTop:10}} size="large" color="red"/>:null } 
          
          <FlatList
           data={miniCardData}
           renderItem={({item})=>{
              onScroll()
              
               return <MiniCard
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                item={item}
               />
           }}
           keyExtractor={item=>item.id.videoId}
           //onScroll={}
           //onEndReached={fetchData2()}
           //onEndReachedThreshold={0.1}
           //ListFooterComponent={<Text>Loading...</Text>}
          />
        
      </View>
  )
}

export default SearchScreen
