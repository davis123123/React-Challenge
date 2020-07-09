import { persistStore } from 'redux-persist';
const initialState = []

export const favReducer =(state=initialState,action)=>{
switch (action.type) {
    // Increase Counter
    case 'PUT': {
      return [
        ...state,
        action.payload
      ]

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
