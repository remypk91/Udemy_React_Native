import  React, {Component} from 'react';
import {View, Image, Button, StyleSheet, Text,Dimensions, Platform} from 'react-native';
import imagePlaceholder from "../../assets/beautiful-place.jpg";
import MapView from "react-native-maps";

class PickLocation extends Component{

    state = {
        focusedLocation :{
            latitude:37.7900352,
            longitude:-122.4013726,
            latitudeDelta:0.0122,
            longitudeDelta:Dimensions.get("window").width /
            Dimensions.get("window").height * 0.0122
        },
        locationChoosen: false
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos =>{
            const coordsEvent ={
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
        err => {
            console.log(err);
            alert("fetching the position failed, Please picked manually.");
        })
    }

    pickLocationHandler = event => {
        // console.log(event.nativeEvent)
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude:coords.longitude
        });
        this.setState(prevState => {
            return{
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChoosen: true
            };
        });
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    };

    render() {
        let content = null;
        let marker = null;
        if(this.state.locationChoosen){
            marker = <MapView.Marker coordinate = {this.state.focusedLocation}/>
        }
        content =(<MapView
            initialRegion={this.state.focusedLocation}
            style={styles.map}
            onPress = {this.pickLocationHandler}
            ref = {ref => this.map = ref}
            >
            {marker}
            </MapView>
            );
            
        return (
            <View style={styles.container}>
            {content}
                
                <View style={styles.button}>
                    <Button title = "Locate Me" onPress={this.getLocationHandler}/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: 250
    },
    button:{
        margin:10
    },
    placeholder: {
        borderWidth: 1,
        borderColor:"black",
        backgroundColor:"#eee",
        width: "80%",
        height: 150
    }
});


export  default PickLocation;