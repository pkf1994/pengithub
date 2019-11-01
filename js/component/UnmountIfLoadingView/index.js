import React,{Component} from 'react'
import {Animated, LayoutAnimation, StyleSheet, View,ActivityIndicator} from 'react-native';

export default class UnmountIfLoadingView extends Component{

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
        const {children,style,indicatorSize} = this.props
        const {loading} = this.state
        return (
            <View style={style}>
                {
                    loading ?
                    <Animated.View  pointerEvents='none' style={styles.loadingContainer}>
                        <ActivityIndicator size={indicatorSize ? indicatorSize : 'small'} color="black" />
                    </Animated.View>
                        :
                    children
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
