import {DELETE_PLACE,SELECT_PLACE,DESELECT_PLACE, SET_PLACES} from '../actions/actionTypes'

const initialState = {
    places: []
};
const reducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_PLACES:
        return {
            ...state,
            places: action.places
          };
        case DELETE_PLACE:
        return {
            ...state,
            places: state.places.filter(place => {

                return place.key !== action.placeKey;
              }),

        };
        case SELECT_PLACE:
        return {
            ...state,
            selectedPlace : state.places.find(place =>{
                return place.key === action.placeKey;
              })
        };
        case DESELECT_PLACE:
        return {
            ...state,
            selectedPlace : null
        };
        default:
        return state;
    }
};

export default reducer;
