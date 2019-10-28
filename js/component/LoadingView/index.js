import React,{Component} from 'react'
import {Animated, LayoutAnimation, StyleSheet, View} from 'react-native';
var Spinner = require('react-native-spinkit');

export default class LoadingView extends Component{

    constructor(props) {
        super(props)
        const {loading} = props
        this.state = {
            loading
        }

    }

    static getDerivedStateFromProps(nextProps,preState) {
        if(nextProps.loading !== preState.loading ) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            return {
                loading: nextProps.loading
            }
        }
        return null
    }

    render() {
        const {children,style} = this.props
        const {loading} = this.state
        return (
            <View style={style}>
                {children}
                {
                    loading &&
                    <Animated.View  pointerEvents='none' style={styles.loadingContainer}>
                        <Spinner style={{margin:20}} isVisible={true} size={30} type='Bounce' color="black"/>
                    </Animated.View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
