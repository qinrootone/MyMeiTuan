
import React,{PureComponent} from 'react'
import { StatusBar } from 'react-native'
import { TabNavigator,TabBarBottom,StackNavigator } from 'react-navigation'

import WebScene from './widget/WebScene'
import GroupPurchaseScene from './scene/GroupPurchase/GroupPurchaseScene'

import HomeScene from './scene/Home/HomeScene'
import MineScene from './scene/Mine/MineScene'
import NearbyScene from './scene/Nearby/NearbyScene'
import OrderScene from './scene/Order/OrderScene'

const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName( navigationState ) {
    if( !navigationState ){
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if(route.routes){
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

import TabBarItem from './widget/TabBarItem'

class RootScene extends PureComponent{
    constructor(){
        super()

        StatusBar.setBarStyle('light-content')
    }

    render() {
        return(
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if(previousScene != currentState ){
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content')
                            } else {
                                StatusBar.setBarStyle('dark-content')
                            }
                        }
                    }
                }
            />
        )
    }
}



const Tab = TabNavigator({
    Home: {
        screen: HomeScene,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '团购',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_homepage.png')}
                    selectImage={require('./img/tabbar/pfb_tabbar_homepage_selected.png')}
                />
            )
        })
    },
    Nearby: {
        screen: NearbyScene,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '附近',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_merchant.png')}
                    selectImage={require('./img/tabbar/pfb_tabbar_merchant_selected.png')}
                />
            )
        })
    },
    Order : {
        screen: OrderScene,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '订单',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_order.png')}
                    selectImage={require('./img/tabbar/pfb_tabbar_order_selected.png')}
                />
            )
        })
    },
    Mine : {
        screen: MineScene,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_mine.png')}
                    selectImage={require('./img/tabbar/pfb_tabbar_mine_selected.png')}
                />
            )
        })
    }
},{
    tabBarComponent: TabBarBottom,
    tabBarPosition:'bottom',
    swipeEnabled:true,
    animationEnabled:true,
    lazy:true,
    tabBarOptions: {
        activeTintColor:'#06C1AE',
        inactiveTintColor:'#979797',
        style:{ backgroundColor:'#ffffff'}
    }
})

const Navigator = StackNavigator(
    {
        Tab:{ screen:Tab },
        Web:{ screen:WebScene },
        GroupPurchase:{ screen: GroupPurchaseScene },
    },
    {
        navigationOptions:{
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        }
    }

)

export default RootScene;