import React from 'react';
import {StyleSheet,FlatList } from 'react-native';

import ListItem from '../ListItem/ListItems';

const placeList = props => {

        
    return (
        <FlatList 
        style={styles.listContainer}
        data = {props.places}
        renderItem = {(info)=>(
            <ListItem 
             placeName = {info.item.name} 
             placeImage = {info.item.image}
             onItemPressed = {() => props.onItemSeleted(info.item.key.toString())}
        />
        )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default placeList;