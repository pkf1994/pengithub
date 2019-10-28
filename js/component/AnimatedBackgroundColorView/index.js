import React, {Component} from 'react'
import {Animated} from 'react-native'

export default class AnimatedBackgroundColorView extends Component{
    constructor(props) {
        super(props)
        const {style} = props
        this.state = {
            backgroundColor: style.backgroundColor,
            newBackgroundColor: style.backgroundColor,
            animatedValue: new Animated.Value(0),
            animatedBackgroundColor: style.backgroundColor
        }
    }

    static getDerivedStateFromProps(nextProps,preState) {
        if(nextProps.style.backgroundColor !== preState.backgroundColor) {
            console.log()
            return {
                newBackgroundColor: nextProps.style.backgroundColor,
                animatedBackgroundColor: preState.animatedValue.interpolate({
                    inputRange:[0,1],
                    outputRange: [preState.backgroundColor,nextProps.style.backgroundColor]
                })
            }
        }
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {

        if(this.state.newBackgroundColor !== this.state.backgroundColor) {
            Animated.timing(this.state.animatedValue,{
                toValue:1,
                duration:this.props.duration
            }).start()
            this.setState({
                backgroundColor: this.state.newBackgroundColor,
                animatedValue: new Animated.Value(0)
            })
        }

    }

    render() {
        const {animatedBackgroundColor} = this.state
        const {style,children} = this.props
        return (
            <Animated.View {...this.props} style={{...style,backgroundColor: animatedBackgroundColor}}>
                {children}
            </Animated.View>
        )
    }
}
