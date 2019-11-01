import React, {Component} from 'react'
import {Animated} from 'react-native'


class ZoomInTransition extends Component {
    constructor(props) {
        super(props)
        this.zoomInAnimatedValue = new Animated.Value(0)
        this.state = {
            children: props.children,
            newChildren: props.children
        }
    }

    componentDidMount(): void {
        const duration = this.props.duration ? this.props.duration : 1000
        if(this.state.children) {
            Animated.spring(this.zoomInAnimatedValue, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
                //delay: delay ? delay : 0
            }).start()
        }
    }

    static getDerivedStateFromProps(nextProps,preState) {
        if(nextProps.children !== preState.children) {
            return {
                newChildren: nextProps.children
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        const duration = this.props.duration ? this.props.duration : 400
        if(this.state.children !== this.state.newChildren) {
            if(!this.state.newChildren) {
                Animated.spring(this.zoomInAnimatedValue, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                    //delay: delay ? delay : 0
                }).start()
                setTimeout(() => {
                    this.setState({
                        children: this.state.newChildren
                    })
                },duration)
            }

            if(!this.state.children && this.state.newChildren) {
                this.setState({
                    children: this.state.newChildren
                })
                Animated.spring(this.zoomInAnimatedValue, {
                    toValue: 1,
                    duration: duration,
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
        const {children} = this.state

        return (
            <Animated.View  style={{
                opacity: this.zoomInAnimatedValue,
                transform: [
                    {
                        scale: this.zoomInAnimatedValue.interpolate({
                            inputRange:[0,1],
                            outputRange: [0.8,1]
                        })
                    }
                ]}}>
                {children}
            </Animated.View>
        )
    }
}


export default ZoomInTransition
