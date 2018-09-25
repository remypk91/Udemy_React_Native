import React, {Component} from 'react';
import {View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index'

class PlaceDetailScreen extends Component {

    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    }

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles)
    }

    updateStyles = (dims) => {

        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles)
    }

    placeDeletedHandler = () => {

        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop()
    }

    render() {
        return (
            <View style={this.state.viewMode === "portrait" ? styles.portraitContainer : styles.landscapeContainer}>
                <View style={this.state.viewMode === "landscape" ? styles.landscapePlaceImageContainer : []}>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View style={this.state.viewMode === "portrait" ? [] : styles.landscapeDeleteButtonContainer}>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} name={Platform.OS === "ios" ? "ios-trash" : "md-trash"} color="red"/>
                        </View>
                    </TouchableOpacity>
                    {/*<Button title="Delete" color="red" onPress={props.onItemDeleted}/>*/}
                </View>
            </View>);
    }
};


const styles = StyleSheet.create({

    portraitContainer: {
        marginTop: 22
    },
    landscapeContainer: {
        marginTop: 22,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    landscapePlaceImageContainer: {width: "90%", padding: 10},
    landscapeDeleteButtonContainer: {
        width: "10%",
        alignItems: "center"
    },
    placeImage: {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center"
    },
    deleteButton: {
        alignItems: 'center'
    }
});

const mapDispatchToProps = dispatch => {

    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetailScreen);



