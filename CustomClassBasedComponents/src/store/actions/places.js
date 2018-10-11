import {ADD_PLACE,DELETE_PLACE,SELECT_PLACE,DESELECT_PLACE} from './actionTypes'
import {uiStartLoading, uiStopLoading} from './ui'

export const addPlace = (placeName,location,image) => {

    return dispatch => {
        dispatch(uiStartLoading());
        const placeData = {
            name : placeName,
            location: location
        };
        fetch("https://reactnativecrash-1538034208806.firebaseio.com/places.json",{
            method: "POST",
            body: JSON.stringify(placeData)
        }).catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => console.log(res))
        .then(parsedResp => {
            console.log(parsedResp)
            dispatch(uiStopLoading());
        });
    }

   
    
    // return dispatch => {
    //     fetch("https://us-central1-reactnativecrash-1538034208806.cloudfunctions.net/storeImage", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             image: image.base64
    //         })
    //     })
    //     .catch(
    //         err => console.log(err))
    //     .then(res =>res.json())
    //     .then(parsedRes => {
    //         console.log(parsedRes)
    //     }) ; 
        
    // };
};

export const deletePlace = (key) => {
    return {
        type : DELETE_PLACE,
        placeKey: key
    };
};

export const selectPlace = (key) => {
    return {
        type : SELECT_PLACE,
        placeKey : key
    }
};

export const deselectPlace = () => {
    return {
        type : DESELECT_PLACE
    };
};