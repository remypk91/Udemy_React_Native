import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceImage  from "./src/assets/beautiful-place.jpg";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";

export default class App extends Component {
  state = {
    places: [],
    selectedPlace : null
  };

  modalClosedHandler = () => {
    this.setState({
      selectedPlace : null
    }

    );
  };

  placeDeleteHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      };
    });
  }

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random().toString(),
          name: placeName,
          image: {
            uri:"http://www.city-data.com/forum/attachments/world/99894d1345310917-most-beautiful-place-world-altay4.jpg"
          }
        })
      };
    });
  };

  placeSeletedHandler = key => {

    this.setState(prevState =>{
      return{
        selectedPlace : prevState.places.find(place =>{
          return place.key === key;  
        })
      };
    });

    
  };

  render() {
    return (
      <View style={styles.container}>

        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.state.places}
          onItemSeleted={this.placeSeletedHandler}
        />
        <PlaceDetail selectedPlace= {this.state.selectedPlace} 
        onItemDeleted ={this.placeDeleteHandler} 
        onModalClosed={this.modalClosedHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
