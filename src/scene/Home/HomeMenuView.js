import {PureComponent} from 'react'
import {View, Text} from 'react-native'

import {screen, system, tool} from '../../common'
import { color, PageControl } from '../../widget'

export default class HomeMenuView extends PureComponent {

    state :{
        currentPage: number
    }

    constructor(props) {
        super(props)

        this.state = {
            currentPage:0
        }
    }

    render() {
        let { menuInfos, onMenuSelected } = this.props;

        console.log(menuInfos)

    }
}