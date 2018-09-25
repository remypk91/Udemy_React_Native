import  React, {Component} from 'react';
import {View, Text, Button, TextInput, ScrollView, StyleSheet,Image} from 'react-native';
import  {connect} from 'react-redux';
import  PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";

import {addPlace} from '../../store/actions/index';
import imagePlaceholder  from "../../assets/beautiful-place.jpg";

class SharePlaceScreen extends  Component{

    state = {
        placeName: ""
    };

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


    placeNameChangedHandler = val => {
        this.setState({
            placeName: val
        });
    };

    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== ""){
            this.props.onAddPlace(this.state.placeName);
        }

    }

    render(){
        return(
            <ScrollView>
                <View style = {styles.container}>
                    <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
                    <PickImage/>
                    <PickLocation/>
                <PlaceInput
                    placeName = {this.state.placeName}
                    onChangeText = {this.placeNameChangedHandler}
                />
                {/*<PlaceInput onPlaceAdded = {this.placeAddedHandler}/>*/}
                <View style={styles.button}>
                <Button title = "Share the place!" onPress={this.placeAddedHandler}/>
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