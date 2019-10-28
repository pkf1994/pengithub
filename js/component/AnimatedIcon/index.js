import React, {Component} from 'react'
import {Animated, LayoutAnimation} from 'react-native';

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
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            this.setState({
                color: newColor
            })
        }

        if(opacity !== newOpacity) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            this.setState({
                opacity: newOpacity
            })
        }
    }

    render() {
        const {color,opacity} = this.state
        const {iconSet,style} = this.props
        const AnimatedIconComponent = Animated.createAnimatedComponent(iconSet)
        return (
            <Animated.View style={{opacity: opacity}}>
                <AnimatedIconComponent {...this.props} style={{...style,color:color,opacity:1}}/>
            </Animated.View>
        )
    }
}

export default AnimatedIcons
