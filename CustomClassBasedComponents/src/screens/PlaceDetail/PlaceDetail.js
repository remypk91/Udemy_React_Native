import React, {Component} from 'react';
import {View, Image, Text,Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import  Icon from "react-native-vector-icons/Ionicons";
import  {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index'

class PlaceDetailScreen extends Component {

    placeDeletedHandler = () =>{
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop()
    }

    render(){
        return (<View style={styles.container}>
            <View>
                <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={this.placeDeletedHandler}>
                    <View style ={styles.deleteButton}>
                        <Icon size={30} name = {Platform.OS === "ios" ? "ios-trash" : "md-trash"} color="red"/>
                    </View>
                </TouchableOpacity>
                {/*<Button title="Delete" color="red" onPress={props.onItemDeleted}/>*/}
            </View>
        </View>);
    }
};



const styles = StyleSheet.create({
    container: {
        marginTop:22
    },
    placeImage: {
        width:"100%",
        height:200
    },
    placeName:{
        fontWeight:"bold",
        textAlign:"center"
    },
    deleteButton: {
        alignItems: 'center'
    }
});

const mapDispatchToProps = dispatch => {

    return {
        onDeletePlace : key => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetailScreen);



