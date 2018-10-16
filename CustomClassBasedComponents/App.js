import  { Navigation } from 'react-native-navigation';


import  AuthScreen from './src/screens/Auth/Auth';
import  SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import  FindPlaceScreen from './src/screens/FindPlace/FindPlace';

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import  PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from "./src/screens/SideDrawer/SideDrawer"

const store = configureStore();

// Register Screens

Navigation.registerComponent("CustomClassBasedComponents.AuthScreen", ()=> AuthScreen, store, Provider);
Navigation.registerComponent("CustomClassBasedComponents.SharePlaceScreen", () => SharePlaceScreen, store,Provider);
Navigation.registerComponent("CustomClassBasedComponents.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("CustomClassBasedComponents.PlaceDetailScreen", ()=> PlaceDetailScreen, store, Provider);
Navigation.registerComponent("CustomClassBasedComponents.SideDrawer", ()=> SideDrawer,store,
Provider);

// Start A App

export default () => Navigation.startSingleScreenApp({
    screen: {
        screen: "CustomClassBasedComponents.AuthScreen",
        title:"Login"
    }
});

