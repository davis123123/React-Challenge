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
    const [minCardData,setMiniCard] = useState([])
    const [npToken, setNPToken] = useState("")
    let has = false
    let onEndReachedCalledDuringMomentum = true
    let refresh = false
    let pewDiePieId = "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
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
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${value}&channelId=${pewDiePieId}&type=video&key=AIzaSyCITZPIHPso6N4zC48oPfcz7OU6GsG6_H4`)
        .then(res=>res.json())
        .then(data=>{

            
            //console.log(data)
            setLoading(false)
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
            

            setMiniCard(data.items)
        })
        has = true
        console.log("here33", favData)

    }
    const fetchData2 = () =>{
        //console.log("hasScrolled", hasScrolled)

        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&nextPageToken=${npToken}&q=${value}&channelId=${pewDiePieId}&type=video&key=AIzaSyCFg6FBEiL8Vebs8UPXRPjIyjYDHOQwRWE`)
        .then(res=>res.json())
        .then(data=>{
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)

            setMiniCard(data.items)
            //console.log("here22")
        })

         console.log("here242")
      
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
           data={minCardData}
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
           initalNumToRender = {50}
           onEndReached={() => {
            if(onEndReachedCalledDuringMomentum == false ) {
                  fetchData2();    // LOAD MORE DATA
                  onEndReachedCalledDuringMomentum = true;
                }
              }
           }
           onEndReachedThreshold={0.1}
           onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
           //ListFooterComponent={<Text>Loading...</Text>}
          />
        
      </View>
  )
}

export default SearchScreen
