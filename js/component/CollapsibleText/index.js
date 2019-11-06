import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet,TouchableNativeFeedback,Text,View,TouchableWithoutFeedback,LayoutAnimation} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign'
import {FadeInTransition} from "../index";
export default class CollapsibleText extends PureComponent{

    static propsType = {
        fontSize: PropTypes.string
    }

    static defaultProps = {
        fontSize: 15
    }

    constructor(props) {
        super(props)
        this.state = {
            showAllText: false,
            showLinearCover: false,
            heightOfContainer: 30,
            lineHeight: 22,
            canBeCollapse: true
        }
    }

    _onContentLayout = ({nativeEvent}) => {
        const {height} = nativeEvent.layout
        this.setState({
            heightOfContainer: height

        })
    }

    _triggerShowAllText = () => {
        if(this.state.showAllText) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            this.setState({
                showAllText: !this.state.showAllText
            })
            setTimeout(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                this.setState({
                    showLinearCover: !this.state.showLinearCover
                })
            },300)
            return
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({
            showLinearCover: !this.state.showLinearCover
        })
        setTimeout(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            this.setState({
                showAllText: !this.state.showAllText
            })
        },300)
    }

    _countDefaultLine = (children) => {
        if(children.length < 100){
            return 1
        }else if(children.length > 100 && children.length < 200) {
            return 2
        }
        return 3
    }

    render() {
        const {children,containerStyle,fontSize,textStyle} = this.props
        const {showAllText,heightOfContainer,lineHeight,showLinearCover} = this.state
        const {backgroundColor} = containerStyle
        const defaultLine = this._countDefaultLine(children)
        const canBeCollapse = heightOfContainer >  defaultLine * lineHeight
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
                {
                    canBeCollapse &&
                    <LinearGradient start={{x: 0.5, y: 0}} end={{x: 0.9, y: 0}} style={[S.showAllButtonContainer,{height: lineHeight + 10}]} colors={['transparent', showLinearCover ? 'transparent' : backgroundColor ? backgroundColor :'#FFF']}>
                        <TouchableNativeFeedback  onPress={this._triggerShowAllText}>
                            <Icon name={showAllText ? 'up' : "down"} size={16} style={{opacity:0.5}}/>
                        </TouchableNativeFeedback>
                    </LinearGradient>
                }
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
        marginRight:10,
        marginBottom:5,
        padding: 3,
        borderRadius: 30,
        backgroundColor: '#eeeeee',
        elevation: 10
    },
    showAllButtonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom:3,
        left: 0,
        right:0
    }
})
