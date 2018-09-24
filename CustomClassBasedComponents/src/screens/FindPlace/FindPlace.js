import  React, {Component} from 'react';
import {View, Text} from 'react-native';
import  PlaceList from '../../components/PlaceList/PlaceList';
import  {connect} from "react-redux";

class FindPlaceScreen extends  Component{

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
        return(

            <View>
                <PlaceList places = {this.props.places} onItemSeleted={this.itemSelectedHandler}/>
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



export  default connect(mapStateToProps)(FindPlaceScreen);
