import React, {PureComponent} from 'react'
import {Text, View, StyleSheet} from 'react-native';

export default class Badge extends PureComponent{

    render() {
        const {containerStyle,textStyle,children} = this.props
        return (
            <View style={{...styles.container,...containerStyle}}>
                <Text style={{...styles.text,...textStyle}}>
                    {children}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        padding: 4,
        elevation: 10,
    }
})
