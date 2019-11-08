import React, {Component} from 'react'
import {Animated} from 'react-native'

export default class AnimatedBackgroundColorView extends Component{
    constructor(props) {
        super(props)
        const {style,duration} = props
        this.duration = duration ? duration : 500
        this.state = {
            backgroundColor: style.backgroundColor,
            newBackgroundColor: style.backgroundColor,
            animatedBackgroundColor: style.backgroundColor,
            animatedValue: new Animated.Value(0)
        }
    }

    static getDerivedStateFromProps(nextProps,preState) {
        if(nextProps.style.backgroundColor !== preState.backgroundColor) {
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
                duration:this.duration
            }).start()
            setTimeout(() => {
                this.setState({
                    backgroundColor: this.state.newBackgroundColor,
                    animatedValue: new Animated.Value(0)
                })
            },this.duration)

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
