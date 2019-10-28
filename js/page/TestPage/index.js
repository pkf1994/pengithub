import React, { Component } from "react";
import { View, Image, Text, findNodeHandle, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

export default class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = { viewRef: null };
    }

    imageLoaded = () => {
        console.log('loaded')
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {
        return (
            <View style={styles.container}>

                <Image
                    ref={img => {
                        this.backgroundImage = img;
                    }}
                    source={{uri: 'http://b-ssl.duitang.com/uploads/item/201512/07/20151207231724_UwXSH.thumb.700_0.jpeg'}}
                    style={styles.absolute}
                    onLoadEnd={this.imageLoaded}
                />

                {
                    this.state.viewRef ?
                        <BlurView
                            style={styles.absolute}
                            viewRef={this.state.viewRef}
                            blurType="light"
                            blurAmount={5}
                        />
                        :
                        null
                }
                <Text>Hi, I am some unblurred text</Text>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff'
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});
