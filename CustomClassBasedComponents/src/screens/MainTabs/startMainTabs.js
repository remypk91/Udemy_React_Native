import  {Navigation} from 'react-native-navigation'
import {Platform} from 'react-native'
import  Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === "ios" ? "ios-share" : "md-share-alt",30),
        Icon.getImageSource(Platform.OS === "ios" ? "ios-menu" : "md-menu",30)
    ]).then(sources => {
        Navigation.startTabBasedApp({

            tabs:[
                {
                    screen: "CustomClassBasedComponents.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons:[
                            {
                                icon:sources[2],
                                title: "Menu",
                                id:"sideDrawerToggle"
                            }
                        ]
                    }

                },
                {
                    screen: "CustomClassBasedComponents.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons:[
                            {
                                icon:sources[2],
                                title: "Menu",
                                id:"sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabsStyle:{
                tabBarSelectedButtonColor:"orange"
            },
            drawer: {
                left:{
                    screen:"CustomClassBasedComponents.SideDrawer"
                }
            },
            appStyle:{
                tabBarSelectedButtonColor:"orange"
            },
        });
    });

};


export  default startTabs;
