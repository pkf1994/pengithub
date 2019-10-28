import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Picker,
    TouchableNativeFeedback,
} from 'react-native';
import {Button} from 'react-native-elements';
export default class IconMaskedPicker extends Component{


    render() {

        const {pickerItemList,icon,enabled} = this.props

        return (
            <TouchableNativeFeedback useForeground={enabled}>
                <View>
                    <Picker {...this.props} style={styles.picker}>
                        {
                            pickerItemList.map((item,index) => {
                                return (
                                    <Picker.Item key={index} label={item} value={item}/>
                                )
                            })
                        }
                    </Picker>
                    <View pointerEvents="none" style={{
                        flexDirection:'row',
                        justifyContent: 'flex-end',
                        position:'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0
                    }}>
                        <Button icon={icon}
                                type="clear"
                                onPress={() => {}}
                                containerStyle={{ borderRadius: 50}}
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.buttonContainer}/>

                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

}

const styles = StyleSheet.create({
    buttonContainer: {
        borderColor: '#EEEEEE',
        borderRadius: 50,
        minWidth: 60
    },
    buttonTitle: {
        color: 'black',
        fontSize: 18
    },
    picker: {
        backgroundColor: 'transparent',
        width: 60,
        color: 'transparent'
    }
})

