import React, {PureComponent} from 'react'
import {Animated} from 'react-native'


class FadeInTransition extends PureComponent {
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
                duration: this.duration,
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
                    delay:this.delay
                }).start()
                setTimeout(() => {
                    this.setState({
                        children: this.state.newChildren
                    })
                },this.duration)
                return
            }else if(!this.state.children && this.state.newChildren) {
                this.setState({
                    children: this.state.newChildren
                })
                Animated.spring(this.animatedValue, {
                    toValue: 1,
                    duration: this.duration,
                    useNativeDriver: true,
                    delay:this.delay
                }).start()
                return
            }

            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: this.duration,
                useNativeDriver: true,
                delay:this.delay
            }).start()
            setTimeout(() => {
                this.setState({
                    children: this.state.newChildren
                })
                Animated.timing(this.animatedValue, {
                    toValue: 1,
                    duration: this.duration,
                    useNativeDriver: true,
                    delay:this.delay
                }).start()
            },this.duration)
        }
    }

    render() {
        const {children} = this.state

        return (
            <Animated.View  style={{
                opacity: this.animatedValue}}>
                {children}
            </Animated.View>
        )
    }
}


export default FadeInTransition
