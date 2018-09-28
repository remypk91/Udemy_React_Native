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
        }
    }

    render() {
        let content = null;
        if (Platform.OS === "android"){
            content =(<View style={styles.placeholder}><Text>Map</Text></View>); 
        }else {
            content =(<MapView
                initialRegion={this.state.focusedLocation}
                style={styles.map}
                />); 
            
        }
        return (
            <View style={styles.container}>
            {content}
                
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