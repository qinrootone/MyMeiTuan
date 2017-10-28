import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList} from 'react-native'

import {Heading1, Heading2, Paragraph} from '../../widget/Text'
import {color, Button, NavigationItem, SearchBar, SpacingView} from '../../widget'

import {screen, system} from '../../common'
import api from '../../api'


// import HomeMenuView from './HomeMenuView'
// import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'


export default class HomeScene extends PureComponent<{}> {

    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../img/Home/search_icon.png')} style={styles.searchIcon}/>
                <Paragraph>一点点</Paragraph>
            </TouchableOpacity>
        ),
        headerRight: (
            <NavigationItem
                icon={require('../../img/Home/icon_navigationItem_message_white.png')}
                onPress={() => {

                }}
            />
        ),
        headerLeft: (
            <NavigationItem
                title='福州'
                titleStyle={{color: 'white'}}
                onPress={() => {

                }}
            />
        ),
        headerStyle: {backgroundColor: color.theme},
    })

    state: {
        discounts: Array<Object>,
        dataList: Array<Object>,
        refreshing: boolean,
    }

    constructor(props) {
        super(props)

        this.state = {
            discounts: [],
            dataList: [],
            refreshing: false
        }

        { (this: any).requestData = this.requestData.bind(this)  }
        { (this: any).renderCell = this.renderCell.bind(this)  }
        { (this: any).onCellSelected = this.onCellSelected.bind(this)  }
        { (this: any).keyExtractor = this.keyExtractor.bind(this)  }
        // { (this: any).renderHeader = this.renderHeader.bind(this)  }
        // { (this: any).onGridSelected = this.onGridSelected.bind(this)  }
        // { (this: any).onMenuSelected = this.onMenuSelected.bind(this)  }
    }

    componentDidMount(){
        this.requestData()
    }

    requestData() {
        this.setState({refreshing:true})

        this.requestDiscount()
        this.requestRecommend()
    }

    async requestRecommend() {
        try{
            let response = await fetch(api.recommend)
            let json = await response.json()
            debugger
            let dataList = json.map(
                (info) => {
                    return {
                        id:info.id,
                        imageUrl:info.squareimgurl,
                        title:info.mname,
                        subtitle: `[${info.range}]${info.title}`,
                        price: info.price
                    }
                }
            )

            this.setState({
                dataList:dataList,
                refreshing:false
            })
        } catch (error){
            this.setState({ refreshing:false})
        }

    }

    async requestDiscount() {
        try{
            let response = await fetch(api.discount)
            let json = await response.json()
            this.setState({ discount: json.data })
        } catch (error) {
            alert(error)
        }
    }

    renderCell(info:Object) {
        return (
            <GroupPurchaseCell
                info={info.item}
                onPress={this.onCellSelected}
            />
        )
    }

    onCellSelected(info:Object){
        StatusBar.setBarStyle('default',false)
        this.props.navigation.navigate('GroupPurchase',{info : info })
    }

    keyExtractor(item:Object, index:number){
        return item.id
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                    renderItem={this.renderCell}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    }
});
