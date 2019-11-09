import React, {Component} from 'react'
import {Animated} from 'react-native'


class ZoomInTransition extends Component {
    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
        this.duration = props.duration ?props.duration : 400
        this.delay = props.delay ? props.delay : 0
            this.state = {
            children: props.children,
            newChildren: props.children
        }
    }

    componentDidMount(): void {
        if(this.state.children) {
            Animated.spring(this.animatedValue, {
                toValue: 1,
                duration: this.duration,
                useNativeDriver: true,
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
        if(this.state.children === this.state.newChildren) return
        const equality = JSON.stringify(prevProps.equalityKey) === JSON.stringify(this.props.equalityKey)
        if(!equality) {
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
                return
            }

            if(!this.state.children && this.state.newChildren) {
                this.setState({
                    children: this.state.newChildren
                })
                Animated.timing(this.animatedValue, {
                    toValue: 1,
                    duration: this.duration,
                    useNativeDriver: true,
                    //delay: delay ? delay : 0
                }).start()
                return
            }

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
                Animated.timing(this.animatedValue, {
                    toValue: 1,
                    duration: this.duration,
                    useNativeDriver: true,
                    //delay: delay ? delay : 0
                }).start()
            },this.duration)
        }else {
            this.setState({
                children: this.state.newChildren
            })
        }
    }

    render() {
        const {children} = this.state

        return (
            <Animated.View  style={{
                opacity: this.animatedValue,
                transform: [
                    {
                        scale: this.animatedValue.interpolate({
                            inputRange:[0,1],
                            outputRange: [0.3,1]
                        })
                    }
                ]}}>
                {children}
            </Animated.View>
        )
    }
}


export default ZoomInTransition
