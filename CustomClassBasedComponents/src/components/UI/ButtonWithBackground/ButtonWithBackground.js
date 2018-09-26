import React from "React";
import {TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform} from "react-native";

const buttonWithbackground = props => {

    const content = (
        <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]}>
            <Text style={props.disabled ? styles.disabledText : null}>
                {props.children}
            </Text>
        </View>
    );

    if(props.disabled){
        return content;
    }

    if (Platform.OS === "ios") {
        return (
            <TouchableOpacity onPress={props.onPress}>
                {content}
            </TouchableOpacity>
        );

    }
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            {content}
        </TouchableNativeFeedback>

    );


};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black"
    },
    disabled:{
        borderColor: "#aaa",
        backgroundColor: "#eee"


    },
    disabledText:{
        color:"#aaa"
    }
});

export default buttonWithbackground;