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
        removeAnimation: new Animated.Value(1),
        removeListAnim: new Animated.Value(0)

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

    placesLoadedHandler = () => {
        Animated.timing(this.state.removeListAnim,{
            toValue:1,
            duration: 500,
            useNativeDriver: true
        }).start();

    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnimation,{
            toValue: 0,
            duration:500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler()
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

            <Animated.View style={{
                opacity:this.state.removeAnimation,
                transform: [
                    {
                        scale: this.state.removeAnimation.interpolate({
                            inputRange: [0,1],
                            outputRange: [12,1]
                        })
                    }
                ]
            }}>
                <TouchableOpacity onPress = {this.placesSearchHandler}>
                    <View style={styles.buttonSearch}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>

        );

        if (this.state.placesLoaded){
            content = (
                <Animated.View style={{
                    opacity: this.state.removeListAnim
                }}>
                <PlaceList places = {this.props.places} onItemSeleted={this.itemSelectedHandler}/>
                </Animated.View>
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
