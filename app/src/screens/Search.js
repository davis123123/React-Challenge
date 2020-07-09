import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,FlatList,ActivityIndicator,Animated} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import MiniCard from '../components/MiniCard'
import Constant from 'expo-constants'
import {useTheme} from '@react-navigation/native'
import {useSelector,useDispatch} from 'react-redux'
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyDtCWCduSedfthvh

const SearchScreen = ({navigation})=>{
    const {colors} =  useTheme()
    const mycolor = colors.iconColor
    var hasScrolled = false
    const [value,setValue] = useState("")
    // const [miniCardData,setMiniCard] = useState([])
    const [npToken, setNPToken] = useState("")

    const dispatch = useDispatch()
    const miniCardData = useSelector(state=>{
        return state.cardData
    })
    const favData = useSelector(state=>{
        return state.favReducer
    })
    const [loading,setLoading] = useState(false)
    const fetchData = () =>{

        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${value}&type=video&key=AIzaSyBsPw6V8EH0TyIolZC4VPevvHV0LufgY_U`)
        .then(res=>res.json())
        .then(data=>{

            
            //console.log(data)
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
            setLoading(false)
            //setMiniCard(data.items)
        })
        console.log("here22", favData)

    }
    const fetchData2 = () =>{
        console.log("hasScrolled", hasScrolled)
        if(!hasScrolled){ return null; }
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&nextPageToken=${npToken}&q=${value}&type=video&key=AIzaSyBsPw6V8EH0TyIolZC4VPevvHV0LufgY_U`)
        .then(res=>res.json())
        .then(data=>{
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
            //console.log("here22")
        })
         //console.log("here22")
    }

  const onScroll = () => {
    hasScrolled = true
  }

  const renderFooter = () => {

     return loading ?<ActivityIndicator size="medium" color="red"/>:null 
  };


const state = {
    items: Array.from({ length: 20 })
  };

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      
        items: state.items.concat(Array.from({ length: 20 }))

    }, 1500);
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
             onChangeText={
              (text)=>{
                setValue(text);
                fetchData();
              }
            }

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
           //onEndReachedThreshold={0}
           //ListFooterComponent={<Text>Loading...</Text>}
          />
        
      </View>
  )
}

export default SearchScreen
