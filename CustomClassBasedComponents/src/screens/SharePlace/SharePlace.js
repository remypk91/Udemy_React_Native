import  React, {Component} from 'react';
import {View, Text, Button, TextInput, ScrollView, StyleSheet,Image} from 'react-native';
import  {connect} from 'react-redux';
import  DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";

import {addPlace} from '../../store/actions/index';
import imagePlaceholder  from "../../assets/beautiful-place.jpg";

class SharePlaceScreen extends  Component{

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress"){
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });

            }
        }
    }

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName)
    }

    render(){
        return(
            <ScrollView>
                <View style = {styles.container}>
                    <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
                <View style={styles.placeholder}><Image source={imagePlaceholder} style={styles.previewImage}/></View>
                    <View style={styles.button}>
                    <Button title = "Pick Image"/>
                    </View>
                    <View style={styles.placeholder}><Text>Map</Text></View>
                    <View style={styles.button}>
                    <Button title = "Locate Me"/>
                    </View>
                <DefaultInput placeholder="place name" style={styles.input}/>
                {/*<PlaceInput onPlaceAdded = {this.placeAddedHandler}/>*/}
                <View style={styles.button}>
                <Button title = "Share the place!"/>
                </View>
                </View>
            </ScrollView>
        );
    }
}

const  mapDispatchToProps = dispatch => {
   return {
       onAddPlace : (placeName) => dispatch(addPlace(placeName))
   };
};


const styles = StyleSheet.create({
    container: {
       flex:1,
       alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor:"black",
        backgroundColor:"#eee",
        width: "80%",
        height: 150
    },
    input:{

        width: "90%"
    },
    button:{
        margin:10
    },
    previewImage:{
        width:"100%",
        height:"100%"
    }
});


 export  default connect(null,mapDispatchToProps)(SharePlaceScreen);