import {REMOVE_PLACE,SELECT_PLACE,DESELECT_PLACE, SET_PLACES, PLACE_ADDED, START_ADD_PLACE} from '../actions/actionTypes'


const initialState = {
    places: [],
    placeAdded: false
};
const reducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_PLACES:
        return {
            ...state,
            places: action.places
          };
        case REMOVE_PLACE:
        return {
            ...state,
            places: state.places.filter(place => {

                return place.key !== action.key;
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
        case START_ADD_PLACE:
        return{
            ...state,
            placeAdded: false
        };
        case PLACE_ADDED:
        return{
            ...state,
            placeAdded: true
        }
        default:
        return state;
    }
};

export default reducer;
