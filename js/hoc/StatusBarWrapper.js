import React, {Component, Fragment} from 'react';
import {StatusBar,View} from 'react-native'

export function StatusBarWrapper(WrappedComponent,options) {
    return class StatusBarProcessedComponent extends Component {
        render() {
            const barStyle = options ? options.barStyle ? options.barStyle : 'light-content' : 'light-content'
            return (
                <Fragment>
                    <StatusBar  backgroundColor={'transparent'}
                                barStyle={barStyle}
                                hidden={false}
                                translucent={true}/>
                    <WrappedComponent/>
                </Fragment>
            )
        }
    }
}
