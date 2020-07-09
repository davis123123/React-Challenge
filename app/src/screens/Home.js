import React,{useState}  from 'react';
import { StyleSheet, Text, View,ScrollView,FlatList,Animated } from 'react-native';
import Header from '../components/Header'
import Card from '../components/Card'
import {useSelector,useDispatch} from 'react-redux'



export default function HomeScreen({navigation}) {

    const dispatch = useDispatch()
    const [npToken, setNPToken] = useState("")
    const fetchData = () =>{

//        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=AIzaSyAg6CXkno9V3urnkKJUR_leGMQuIp1hfZA`)
        .then(res=>res.json())
        .then(data=>{

            
            //console.log(data)
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
          //  setLoading(false)

            //setMiniCard(data.items)
        })
        console.log("here33")

    }
    try{
  fetchData()
}catch{
  console.log("error caught")
}
  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY,0,45)
  const translateY = diffClamp.interpolate({
    inputRange:[0,45],
    outputRange:[0,-45]
  })
  const cardData = useSelector(state=>{
    return state.cardData
  })
  return (
    <View style={{flex:1}}>
      <Animated.View
      style={{
        transform:[
          {translateY:translateY }
        ],
        elevation:4,
        zIndex:100,
      }}
      >
        <Header />
      </Animated.View>
         
       <FlatList
      data={cardData}
      renderItem={({item})=>{
        return <Card
        videoId={item.id.videoId}
        title={item.snippet.title}
        channel={item.snippet.channelTitle}
        item = {item}
        />
      }}
    
      keyExtractor={item=>item.id.videoId}

      />

    
      
      
    </View>
  );
}
