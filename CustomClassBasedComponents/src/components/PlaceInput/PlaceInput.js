import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const PlaceInput = props => (
    <DefaultInput
        placeholder="place name"
        value ={props.placeName}
        onChangeText={props.onChangeText}/>
);



export default PlaceInput;
