import {ADD_PLACE,DELETE_PLACE,SELECT_PLACE,DESELECT_PLACE} from '../actions/actionTypes'

const initialState = {
    places: [],
    selectedPlace : null
};
const reducer = (state = initialState, action) =>{
    switch(action.type){
        default:
        return state;
    }
};

export default reducer;
