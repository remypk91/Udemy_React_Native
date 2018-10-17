import {REMOVE_PLACE,SELECT_PLACE,DESELECT_PLACE,SET_PLACES, PLACE_ADDED, START_ADD_PLACE} from './actionTypes'
import {uiStartLoading, uiStopLoading, authGetToken} from './index'

export const startAddPlace = () => {
    return {
        type:START_ADD_PLACE
    };
};

export const addPlace = (placeName,location,image) => {

    return dispatch => {
        dispatch(uiStartLoading());
        const placeData = {
            name : placeName,
            location: location
        };
        dispatch(authGetToken())
        .then(token => {
            return  fetch("https://reactnativecrash-1538034208806.firebaseio.com/places.json?auth="+token,{
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(() => {
            alert(" invalid token!");
        })
        .then(res => {
            if (res.ok){
                return res.json()
            }else {
                throw(new Error());
            }
        })
        .then(parsedResp => {
            console.log(parsedResp)
            dispatch(uiStopLoading());
            dispatch(placeAdded());
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, Please try again!! ")
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
        dispatch(authGetToken())
        .then(token => {
            return  fetch("https://reactnativecrash-1538034208806.firebaseio.com/places.json?auth="+token);
        })
        .catch(() => {
            alert(" invalid token!");
        })
        .then(res => {
            if (res.ok){
                return res.json()
            }else {
                throw(new Error());
            }
        })
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
        }).catch(err =>{
            alert("Something went wrong, Please try later!");
            console.log(err);
        });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

export const deletePlace = key => {
    return dispatch => {
      dispatch(authGetToken())
        .catch(() => {
          alert("No valid token found!");
        })
        .then(token => {
          dispatch(removePlace(key));
          return fetch(
            "https://reactnativecrash-1538034208806.firebaseio.com/places/" +
              key +
              ".json?auth=" +
              token,
            {
              method: "DELETE"
            }
          );
        })
        .then(res => {
            if (res.ok){
                return res.json()
            }else {
                throw(new Error());
            }
        })
        .then(parsedRes => {
          console.log("Done Done!"+ JSON.stringify(parsedRes));
        })
        .catch(err => {
          alert("Something went wrong, sorry :/");
          console.log(err);
        });
    };
  };

  export const removePlace = key => {
    return {
      type: REMOVE_PLACE,
      key: key
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

export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    };
};

