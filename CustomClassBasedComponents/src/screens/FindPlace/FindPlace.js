import  React, {Component} from 'react';
import {View, Text, TouchableOpacity,StyleSheet, Animated} from 'react-native';
import  PlaceList from '../../components/PlaceList/PlaceList';
import  {connect} from "react-redux";

class FindPlaceScreen extends  Component{

    static navigatorStyle = {
        navBarButtonColor : "orange"
    }

    state = {
        placesLoaded : false,
        removeAnim: new Animated.valueOf(1)

    }

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

    placesSearchHandler = () => {
        this.setState ({
            placesLoaded : true
        });
    }

    itemSelectedHandler = key => {
        const selPlace  = this.props.places.find(place =>{
            return place.key === key;
        });

        this.props.navigator.push({
            screen: "CustomClassBasedComponents.PlaceDetailScreen",
            title: selPlace.name,
            passProps : {
                selectedPlace : selPlace
            }
        });
    }
    render(){

        let content = (
            <TouchableOpacity onPress = {this.placesSearchHandler}>
                <View style={styles.buttonSearch}>
                    <Text style={styles.searchButtonText}>Find Places</Text>
                </View>
            </TouchableOpacity>
        );

        if (this.state.placesLoaded){
            content = (
                <PlaceList places = {this.props.places} onItemSeleted={this.itemSelectedHandler}/>
            );
        }

        return(

            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
                {/*<Text>on Find Places Screen</Text>*/}
            </View>
        );
    }
}

const  mapStateToProps = state  => {
    return {
        places : state.places.places
    };
};

const styles = StyleSheet.create({
    buttonContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    listContainer:{

    },
    buttonSearch:{
        borderColor:"orange",
        borderWidth: 3,
        borderRadius:15,
        padding: 20
    },
    searchButtonText:{
        color:"orange",
        fontWeight: "bold",
        fontSize:26
    }
});



export  default connect(mapStateToProps)(FindPlaceScreen);
