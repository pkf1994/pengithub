import React, {Component} from 'react'
import {TouchableWithoutFeedback,Animated} from 'react-native'

class SlideInTransition extends Component {
    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
        this.duration = props.duration ? props.duration : 400
        this.delay = props.delay ? props.delay : 0
        this.state = {
            children: props.children,
            newChildren: props.children
        }
    }

    componentDidMount(): void {
        if(this.state.children) {
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
                delay: this.delay
            }).start()
        }
    }

    static getDerivedStateFromProps(nextProps,preState) {
        if(nextProps.children !== preState.children) {
            return {
                newChildren: nextProps.children
            }
        }
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        if(this.state.children !== this.state.newChildren) {
            if(!this.state.newChildren) {
                Animated.timing(this.animatedValue, {
                    toValue: 0,
                    duration: this.duration,
                    useNativeDriver: true,
                    //delay: delay ? delay : 0
                }).start()
                setTimeout(() => {
                    this.setState({
                        children: this.state.newChildren
                    })
                },this.duration)
            }

            if(!this.state.children && this.state.newChildren) {
                this.setState({
                    children: this.state.newChildren
                })
                Animated.spring(this.animatedValue, {
                    toValue: 1,
                    duration: this.duration,
                    useNativeDriver: true,
                    //delay: delay ? delay : 0
                }).start()
            }

            this.setState({
                children: this.state.newChildren
            })
        }
    }

    render() {
        const {children} = this.props

        return (
                <Animated.View  style={{
                    opacity: this.animatedValue,
                    transform: [
                        {
                            translateY: this.animatedValue.interpolate({
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


export default SlideInTransition
