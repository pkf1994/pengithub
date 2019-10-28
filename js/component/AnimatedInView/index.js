import React, {Component} from 'react'
import {TouchableWithoutFeedback,Animated} from 'react-native'

class AnimatedInView extends Component {
    constructor(props) {
        super(props)
        this.animateItemMountValue = new Animated.Value(0)
    }

    componentDidMount(): void {
        //let delay = (index - (currentPage - 1)*pageScale) * 100
        const {delay} = this.props
        //console.log(delay)

        Animated.timing(this.animateItemMountValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            //delay: delay ? delay : 0
        }).start()
    }


    render() {
        const {children} = this.props

        return (
                <Animated.View  style={{
                    opacity: this.animateItemMountValue,
                    transform: [
                        {
                            translateY: this.animateItemMountValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [100, 0]
                            })
                        }
                    ]}}>

                    {children}
                </Animated.View>
        )
    }
}


export default AnimatedInView
