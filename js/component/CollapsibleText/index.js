import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet,TouchableNativeFeedback,Text,View,TouchableWithoutFeedback,LayoutAnimation} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign'
export default class CollapsibleText extends PureComponent{

    static propsType = {
        fontSize: PropTypes.string
    }

    static defaultProps = {
        fontSize: 13
    }

    constructor(props) {
        super(props)
        const {fontSize} = props
        this.state = {
            showAllText: false,
            heightOfContainer: 30,
            lineHeight: fontSize * 1.7
        }
    }

    _onContentLayout = ({nativeEvent}) => {
        const {height} = nativeEvent.layout
        console.log(height)
        this.setState({
            heightOfContainer: height
        })
    }

    _triggerShowAllText = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({
            showAllText: !this.state.showAllText
        })
    }

    _countDefaultLine = (children) => {
        if(children.length < 50){
            return 1
        }else if(children.length > 50 && children.length < 90) {
            return 2
        }
        return 3
    }

    render() {
        const {children,containerStyle,fontSize,textStyle} = this.props
        const {showAllText,heightOfContainer,lineHeight} = this.state
        const defaultLine = this._countDefaultLine(children)

        return (
            <View style={[S.container,containerStyle]}>
                <View style={[S.collaptor,{height: showAllText ? heightOfContainer : defaultLine * lineHeight}]}>
                    <View style={S.content}
                          onLayout={this._onContentLayout}>
                        <Text style={[S.text,textStyle,{fontSize: fontSize,lineHeight:lineHeight}]}>
                            { children }
                        </Text>
                    </View>
                </View>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={[S.showAllButton,{height: lineHeight + 10}]} colors={['transparent', showAllText ? 'transparent' : '#FFF']}>
                        <TouchableNativeFeedback  onPress={this._triggerShowAllText}>
                            <View style={{marginRight:10,marginBottom:5}}>
                                <Icon name={showAllText ? 'up' : "down"} size={16} style={{opacity:0.5}}/>
                            </View>
                        </TouchableNativeFeedback>
                    </LinearGradient>
            </View>

        )
    }

}

const S = StyleSheet.create({
    container: {
        paddingVertical: 10
    },
    collaptor: {
        overflow: 'hidden'
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    showAllButton: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom:0,
        left: 0,
        right:0
    }
})
