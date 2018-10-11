import {DELETE_PLACE,SELECT_PLACE,DESELECT_PLACE,SET_PLACES} from './actionTypes'
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
            alert("Something went wrong, Please try again!! ")
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

export const getPlaces = () => {

    return dispatch => {
        fetch("https://reactnativecrash-1538034208806.firebaseio.com/places.json")
        .catch(err =>{
            alert("Something went wrong, Please try later!");
            console.log(err);
        }).then(res => res.json())
        .then(parsedResp =>{
            
            const places = [];
            for (let key in parsedResp){
                places.push({
                    ...parsedResp[key],
                    image: {uri:parsedResp[key].image},
                    key: key
                });
            }
            dispatch(setPlaces(places));
        });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
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