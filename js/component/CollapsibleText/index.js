import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet,Text,View,TouchableWithoutFeedback,LayoutAnimation} from "react-native";

export default class CollapsibleText extends PureComponent{

    static propsType = {
        fontSize: PropTypes.string
    }

    static defaultProps = {
        fontSize: 14
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
        const {children,containerStyle,fontSize} = this.props
        const {showAllText,heightOfContainer,lineHeight} = this.state
        const defaultLine = this._countDefaultLine(children)

        return (
            <View style={[S.container,containerStyle]}>
                <View style={[S.collaptor,{height: showAllText ? heightOfContainer : defaultLine * lineHeight}]}>
                    <TouchableWithoutFeedback onPress={this._triggerShowAllText}>
                        <View style={S.content}
                              onLayout={this._onContentLayout}>
                            <Text style={[S.text,{fontSize: fontSize,lineHeight:lineHeight}]}>
                                { children }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

        )
    }

}

const S = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#eeeeee',
        borderRadius: 20
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
})
