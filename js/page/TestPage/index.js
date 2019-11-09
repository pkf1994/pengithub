import React, { Component } from "react";
import { View, Image, Text, findNodeHandle, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

export default class TestPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount(): void {
        console.log('test page will un mount')
    }

    componentDidMount(): void {
        console.log('test page did mount')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HI!!!!!</Text>
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
