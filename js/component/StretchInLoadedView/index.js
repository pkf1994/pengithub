import React,{Component} from 'react'
import {LayoutAnimation, StyleSheet, View} from 'react-native';

export default class StretchInLoadedView extends Component{

    constructor(props) {
        super(props)
        const {loading} = props
        this.state = {
            loading,
            height: 0
        }
    }

    static getDerivedStateFromProps(nextProps,preState) {
        if(nextProps.loading !== preState.loading ) {
            return {
                loading: nextProps.loading
            }
        }
        return null
    }


    _onLayout = ({nativeEvent}) => {
        const {loading} = this.state
        const {height} = nativeEvent.layout
        if(!loading) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            this.setState({
                height: height
            })
        }
    }

    render() {
        const {children,containerStyle} = this.props
        const {loading,height} = this.state
        return (
            <View style={[S.container,containerStyle]}>
              <View style={[S.collaptor,{height: height}]}>
                  <View style={S.content}
                        onLayout={this._onLayout}>
                      {!loading && children}
                  </View>
              </View>
            </View>
        )
    }
}

const S = StyleSheet.create({
    container: {
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
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
