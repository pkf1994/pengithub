import React, {PureComponent} from 'react'
import {Animated,findNodeHandle, UIManager} from 'react-native'

export default class FadeChangeText extends PureComponent{
    constructor(props) {
        super(props)
        this.fadeAnimatedValue = new Animated.Value(1)
        this.fontColorAnimatedValue = new Animated.Value(0)
        this.textWidthAnimatedValue = new Animated.Value(0)
        this.fontSizeAnimatedValue = new Animated.Value(0)
        const {children,style} = props
        this.state = {
            children: children,
            newChildren: children,
            color: style.color,
            newColor: style.color,
            fontSize: style.fontSize,
            newFontSize: style.fontSize,
            textWidth: undefined,
            newTextWidth: 0,
            animatedTextWidth: "auto",
            animatedFontColor: this.fontColorAnimatedValue.interpolate({
                inputRange: [0,1],
                outputRange: [style.color,style.color]
            }),
            animatedFontSize: this.fontSizeAnimatedValue.interpolate({
                inputRange: [0,1],
                outputRange: [style.fontSize,style.fontSize]
            })
        }
    }

    static getDerivedStateFromProps(nextProps,preState) {
        if(nextProps.children !== preState.children) {
            return {
                newChildren: nextProps.children
            }
        }
        if(nextProps.style.color !== preState.color) {
            return {
                newColor: nextProps.style.color
            }
        }
        if(nextProps.style.fontSize !== preState.fontSize) {
            return {
                newFontSize: nextProps.style.fontSize
            }
        }
        return null
    }

    _getLayout(ref) {
        const handle = findNodeHandle(ref);

        return new Promise((resolve) => {
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                resolve({
                    x,
                    y,
                    width,
                    height,
                    pageX,
                    pageY
                });
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        const {delay,duration} = this.props

        if(this.state.newChildren !== this.state.children) {

            Animated.timing(this.fadeAnimatedValue,{
                toValue:0,
                duration:duration,
                useNativeDriver: true
            }).start()

            setTimeout(() => {
                this.setState({
                    children: this.state.newChildren
                })
                Animated.timing(this.fadeAnimatedValue,{
                    toValue:1,
                    duration:duration,
                    useNativeDriver: true
                }).start()
               if(!this.props.needToChangeWidth) return
                setTimeout(() => {
                    this._getLayout(this.textRef).then(({
                                                            x,
                                                            y,
                                                            width,
                                                            height,
                                                            pageX,
                                                            pageY
                                                        }) => {
                        this.setState({
                            animatedTextWidth: this.textWidthAnimatedValue.interpolate({
                                inputRange: [0,1],
                                outputRange: [this.state.textWidth,width]
                            }),
                            textWidth: width
                        })

                        Animated.timing(this.textWidthAnimatedValue,{
                            toValue: 1,
                            duration: 1500
                        }).start()
                        setTimeout(() => {
                            this.textWidthAnimatedValue = new Animated.Value(0)
                        },1500)

                    })
                },duration)
            },duration)
        }

        if(this.state.newColor !== this.state.color) {
            this.setState({
                color: this.state.newColor,
                animatedFontColor: this.fontColorAnimatedValue.interpolate({
                    inputRange: [0,1],
                    outputRange: [this.state.color,this.state.newColor]
                })
            })
            Animated.timing(this.fontColorAnimatedValue,{
                toValue: 1,
                duration: duration,
                delay: delay ? delay : 0
            }).start()
            setTimeout(() => {
                this.fontColorAnimatedValue = new Animated.Value(0)
            },duration)
        }

        if(this.state.newFontSize !== this.state.fontSize) {
            this.setState({
                fontSize: this.state.newFontSize,
                animatedFontSize: this.fontSizeAnimatedValue.interpolate({
                    inputRange: [0,1],
                    outputRange: [this.state.fontSize,this.state.newFontSize]
                })
            })
            Animated.timing(this.fontSizeAnimatedValue,{
                toValue: 1,
                duration: duration,
                delay: delay ? delay : 0
            }).start()
            setTimeout(() => {
                this.fontSizeAnimatedValue = new Animated.Value(0)
            },duration)
        }
    }


    _onLayout = ({nativeEvent}) => {
        let {width} = nativeEvent.layout
        if(this.state.animatedTextWidth === 'auto') {
            this.setState({
                animatedTextWidth: width,
                textWidth: width
            })
        }
    }

    render() {
        const {children,animatedFontColor,animatedTextWidth,animatedFontSize} = this.state
        const {containerStyle,style,needToChangeWidth} = this.props
        return (
                needToChangeWidth ?
                    <Animated.View style={{...containerStyle,width:animatedTextWidth,overflow:'hidden'}}>
                        <Animated.View style={{opacity: this.fadeAnimatedValue,position:'absolute'}}>
                            <Animated.Text onLayout={this._onLayout} ref={ref => this.textRef = ref} {...this.props} style={{...style,color:animatedFontColor,fontSize: animatedFontSize,position:'absolute'}}>
                                {children}
                            </Animated.Text>
                        </Animated.View>
                    </Animated.View>
                    :
                    <Animated.View style={{...containerStyle,opacity: this.fadeAnimatedValue}}>
                        <Animated.Text{...this.props} style={{...style,color:animatedFontColor,fontSize: animatedFontSize}}>
                            {children}
                        </Animated.Text>
                    </Animated.View>
        )
    }
}
