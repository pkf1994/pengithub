import React, {Component} from 'react'
import {Animated} from 'react-native';

const duration = 500

class AnimatedIcons extends Component{

    constructor(props) {
        super(props)
        const {style} = props
        this.colorAnimatedValue = new Animated.Value(0)
        this.opacityAnimatedValue = new Animated.Value(0)
        this.state = {
            color: style.color,
            newColor: style.color,
            opacity: style.opacity,
            newOpacity: style.opacity,
            animatedColor: this.colorAnimatedValue.interpolate({
                inputRange:[0,1],
                outputRange: [style.color,style.color]
            }),
            animatedOpacity: this.opacityAnimatedValue.interpolate({
                inputRange:[0,1],
                outputRange: [style.opacity,style.opacity]
            })
        }
    }

    static getDerivedStateFromProps(nextProps,preState) {
        const {style} = nextProps
        if(style.color !== preState.color) {
           return {
               newColor: style.color
           }
        }
        if(style.opacity !== preState.opacity){
            return {
                newOpacity: style.opacity
            }
        }
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        const {color,newColor,opacity,newOpacity} = this.state
        if(color !== newColor) {
            this.setState({
                animatedColor: this.colorAnimatedValue.interpolate({
                    inputRange:[0,1],
                    outputRange: [color,newColor]
                }),
                color: newColor
            })
            Animated.timing(this.colorAnimatedValue,{
                toValue: 1,
                duration: duration,
            }).start()
            setTimeout(() => {
                this.colorAnimatedValue = new Animated.Value(0)
            },duration)
        }

        if(opacity !== newOpacity) {
            this.setState({
                animatedOpacity: this.opacityAnimatedValue.interpolate({
                    inputRange:[0,1],
                    outputRange: [opacity,newOpacity]
                }),
                opacity: newOpacity
            })
            Animated.timing(this.opacityAnimatedValue,{
                toValue: 1,
                duration: duration,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                this.opacityAnimatedValue = new Animated.Value(0)
            },duration)
        }
    }

    render() {
        const {animatedColor,animatedOpacity} = this.state
        const {iconSet,style} = this.props
        const AnimatedIconComponent = Animated.createAnimatedComponent(iconSet)
        return (
            <Animated.View style={{opacity: animatedOpacity}}>
                <AnimatedIconComponent {...this.props} style={{...style,color:animatedColor,opacity:1}}/>
            </Animated.View>
        )
    }
}

export default AnimatedIcons
