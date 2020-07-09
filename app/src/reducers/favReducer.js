import { persistStore } from 'redux-persist';
const initialState = []

const quantityForItem = (list, newItem) => {
  const item = list.find(item => item.id === newItem.id)
  return item && item.quantity || 0
}

export const favReducer =(state=initialState,action)=>{
switch (action.type) {
    // Increase Counter

    case 'PUT': {
      if(payload => payload !== action.payload){
      return [
        ...state,
        action.payload
      ]
	}
	else{
		state.filter(payload => payload !== action.payload)
	}
    }

    // Decrease Counter
    case 'REMOVE': {
      return state.filter(payload => payload !== action.payload)
    }

    // Default
    default: {
      return state;
    }
  }
};

export default favReducer;
