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

    const [value,setValue] = useState("")
    // const [miniCardData,setMiniCard] = useState([])
    const [npToken, setNPToken] = useState("")

    const dispatch = useDispatch()
    const miniCardData = useSelector(state=>{
        return state.cardData
    })
    const [loading,setLoading] = useState(false)
    const fetchData = () =>{

        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${value}&type=video&key=AIzaSyCITZPIHPso6N4zC48oPfcz7OU6GsG6_H4`)
        .then(res=>res.json())
        .then(data=>{

            setLoading(false)
            //console.log(data)
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
            setSearched(true)
            //setMiniCard(data.items)
        })
        console.log("here")

    }
    const fetchData2 = () =>{



        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&nextPageToken=${npToken}&q=${value}&type=video&key=AIzaSyCITZPIHPso6N4zC48oPfcz7OU6GsG6_H4`)
        .then(res=>res.json())
        .then(data=>{

            setLoading(false)
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
            console.log("here22")
            //setMiniCard(data.items)
        })
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
           data={miniCardData}
           renderItem={({item})=>{
               return <MiniCard
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
               />
           }}
           keyExtractor={item=>item.id.videoId}
           onEndReached={miniCardData.length > 0 ? fetchData2() : null}
           onEndReachedThreshold={0.1}
           ListFooterComponent={renderFooter()}
          />
        
      </View>
  )
}

export default SearchScreen
