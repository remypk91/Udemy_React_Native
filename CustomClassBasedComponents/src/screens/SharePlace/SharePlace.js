import  React, {Component} from 'react';
import {View, Text, Button, TextInput, ScrollView, StyleSheet,KeyboardAvoidingView} from 'react-native';
import  {connect} from 'react-redux';
import  PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";

import {addPlace} from '../../store/actions/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import validate from "../../utility/validation";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";

class SharePlaceScreen extends  Component{

    static navigatorStyle = {
        navBarButtonColor : "orange"
    }

    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
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
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

    placeAddedHandler = () => {
        if (this.state.controls.placeName.value.trim() !== ""){
            this.props.onAddPlace(this.state.controls.placeName.value);
        }

    }

    render(){
        return(
            <KeyboardAwareScrollView>
                <View  style = {styles.container}>
                    <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
                    <PickImage/>
                    <PickLocation/>
                <PlaceInput

                    placeData={this.state.controls.placeName}
                    onChangeText={this.placeNameChangedHandler}
                />
                {/*<PlaceInput onPlaceAdded = {this.placeAddedHandler}/>*/}
                <View style={styles.button}>
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.placeAddedHandler}
                        disabled={
                            !this.state.controls.placeName.valid
                        }
                    >
                        Share the place!
                    </ButtonWithBackground>
                {/*<Button title = "Share the place!" onPress={this.placeAddedHandler} style={this.state.controls.placeName.valid ? null : styles.disabled}/>*/}
                </View>
                </View>
            </KeyboardAwareScrollView>
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
    },
    disabled:{
        borderColor: "#aaa",
        backgroundColor: "#eee"

    }
});


 export  default connect(null,mapDispatchToProps)(SharePlaceScreen);