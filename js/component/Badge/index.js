import React, {PureComponent} from 'react'
import {Text, View, StyleSheet} from 'react-native';

export default class Badge extends PureComponent{

    render() {
        const {containerStyle,textStyle,children} = this.props
        return (
            <View style={{...styles.container,...containerStyle}}>
                    {children}
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
        paddingHorizontal: 8,
        elevation: 10,
    },
    text: {
        includeFontPadding: false
    }
})
