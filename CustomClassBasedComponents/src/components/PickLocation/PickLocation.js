import  React, {Component} from 'react';
import {View, Image, Button, StyleSheet, Text,Dimensions} from 'react-native';
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
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                initialRegion={this.state.focusedLocation}
                style={styles.map}
                />
                <View style={styles.button}>
                    <Button title = "Locate Me" onPress={()=> alert("Pick Location")}/>
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
    }
});


export  default PickLocation;