import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer,DefaultTheme,DarkTheme,useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import VideoPlayer from './src/screens/VideoPlayer';
import Explore from './src/screens/Explore';
import Favorite from './src/screens/Favorite';
import {reducer} from './src/reducers/reducer';
import {themeReducer} from './src/reducers/themeReducer';
import {favReducer} from './src/reducers/favReducer';
import {Provider,useSelector, useDispatch} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {createLogger} from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/es/integration/react';


const customDefaultTheme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    headerColor:"white",
    iconColor:"black",
    tabIcon:"red"
  }
}

const rooReducer = combineReducers({
  cardData:reducer, //[],
  myDarMode:themeReducer,//false
  favReducer:favReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist:['favReducer']
}

const persistedReducer = persistReducer(persistConfig, rooReducer)

const store2 = createStore(
  persistedReducer, applyMiddleware(createLogger())
);

const persistedStore = persistStore(store2)

const customDarkTheme={
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    headerColor:"#404040",
    iconColor:"white",
    tabIcon:"white"
  }
}


const store = createStore(rooReducer)


const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const RootHome = ()=>{

     const dispatch = useDispatch()
    const [npToken, setNPToken] = useState("")
    const fetchData = () =>{

//        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=AIzaSyCITZPIHPso6N4zC48oPfcz7OU6GsG6_H4`)
        .then(res=>res.json())
        .then(data=>{

            
            console.log("here")
            dispatch({type:"add",payload:data.items})
            setNPToken(data.nextPageToken)
          //  setLoading(false)

            //setMiniCard(data.items)
        })
        console.log("here33")

    }
    fetchData()
  const {colors} = useTheme()
  return(
    <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        //persistedStore.purge()
        if (route.name === 'home') {
          iconName = 'home';
        } else if (route.name === 'search') {
          iconName = 'search';
        }else if(route.name === 'favorite'){
          iconName = 'favorite'
        }

        // You can return any component that you like here!
        return <MaterialIcons name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.tabIcon,
      inactiveTintColor: 'gray',
    }}
    >
      <Tabs.Screen name="home" component={Home} />
      <Tabs.Screen name="search" component={Search} />
      <Tabs.Screen name="favorite" component={Favorite} />
    </Tabs.Navigator>
  )
}

export default App = ()=>{
  return(
     <Provider store={store2}>
      <PersistGate persistor={persistedStore} loading = {null} >
        <Navigation />
      </PersistGate>
      
    </Provider>
  )
 
}

export function Navigation() {

  let currentTheme = useSelector(state=>{
    return state.myDarMode
  })
  return (
 
      <NavigationContainer theme={currentTheme?customDarkTheme:customDefaultTheme}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="rootHome" component={RootHome} />
          <Stack.Screen name="search" component={Search} />
          <Stack.Screen name="videoplayer" component={VideoPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

