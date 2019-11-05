import React, {Component} from 'react'
import {View,Text} from 'react-native'

class FilesTopTabItemScreen extends Component{
    componentWillUnmount(): void {
        console.log("FilesTopTabItemScreen: unmount")
    }

    render() {
        return <View style={{flex:1}}>
            <Text>
                FilesTopTabItemScreen
            </Text>
        </View>
    }
}

export default FilesTopTabItemScreen
