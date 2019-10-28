import React, {Component} from 'react'
import {Text, ViewPropTypes, StatusBar, View, Platform,StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import {AnimatedBackgroundColorView} from '../index';
var Color = require('color');
export const NAVBAR_HEIGHT_IOS = 44
export const NAVBAR_HEIGHT_ANDROID = 56

const StatusBarPropsShape = {
    barStyle: PropTypes.oneOf(['light-content','default','dark-content']),
    backgroundColor: PropTypes.string,
    translucent: PropTypes.bool,
}

const defaultStatusBarProps = {
    backgroundColor: 'transparent',
    barStyle: 'dark-content',
    translucent: true
}


export default class CommonHeader extends Component{

    static propTypes = {
        containerStyle: ViewPropTypes.style,
        hidden: PropTypes.bool,
        statusBarProps: PropTypes.shape(StatusBarPropsShape),
        backgroundColor: PropTypes.string,
        leftComponent: PropTypes.element,
        rightComponent: PropTypes.element,
        centerComponent: PropTypes.element,
        comprehensiveComponent: PropTypes.element,
        hideStatusBar: PropTypes.bool
    }

    static defaultProps = {
        backgroundColor: 'white',
        barStyle: 'dark-content',
        translucent: true
    }

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount(): void {
        this._processStatusbar()
    }

    _processStatusbar = () => {
        const {statusBarProps,hideStatusBar,backgroundColor} = this.props
        const realStatusBarProps = {...defaultStatusBarProps,...statusBarProps}
        let backgroundColorLumia = (new Color(backgroundColor)).luminosity()

        if(backgroundColorLumia > 0.5) {
            StatusBar.setBarStyle('dark-content',true)
        }else {
            StatusBar.setBarStyle('light-content',true)
        }
        realStatusBarProps.translucent && StatusBar.setTranslucent(realStatusBarProps.translucent)
        hideStatusBar && StatusBar.setHidden(hideStatusBar)
        realStatusBarProps.backgroundColor && StatusBar.setBackgroundColor(realStatusBarProps.backgroundColor)
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        const {backgroundColor} = this.props
        if(prevProps.backgroundColor !== backgroundColor) {
            let backgroundColorObj = new Color(backgroundColor)
            if(backgroundColorObj.luminosity() > 0.5) {
                StatusBar.setBarStyle('dark-content',true)
            }else {
                StatusBar.setBarStyle('light-content',true)
            }
        }
    }

    render(){

        const {backgroundColor,containerStyle,hidden,leftComponent,rightComponent,centerComponent,comprehensiveComponent} = this.props

        let statusBar = <StatusBar />

        let content = hidden ? null :
            (
                comprehensiveComponent ?
                    <View style={styles.navBar}>
                        {comprehensiveComponent}
                    </View>
                    :
                    <View style={styles.navBar}>
                        {leftComponent}
                        {centerComponent}
                        {rightComponent}
                    </View>
            )
        return (
            <AnimatedBackgroundColorView duration={500} style={{...styles.container,backgroundColor:backgroundColor}}>
                <View style={containerStyle}>
                    {statusBar}
                    {content}
                </View>
            </AnimatedBackgroundColorView>
        );
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: 'white'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID
    },
    container: {
        backgroundColor:'white',
        paddingTop: StatusBar.currentHeight,
    }
})



