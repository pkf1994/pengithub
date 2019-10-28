import React, {Component} from 'react'
import {Animated} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export default class FadeChangeFlatList extends Component{

    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
        const {data} = props
        this.state = {
            data: data,
            newData: data
        }
    }

    static getDerivedStateFromProps(nextProps,preState) {
        if(nextProps.data.length === 0) {
            return {
                newData: nextProps.data
            }
        }
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        const {data,newData} = this.state
        const duration = 500
        if(newData === 0) {
            Animated.timing(this.animatedValue,{
                toValue: 1,
                duration: duration,
                useNativeDriver: true
            }).start()
            setTimeout(() => {
                this.setState({
                    data: newData
                })
            },duration)
            return
        }
        if(data !== newData) {
            this.setState({
                data: newData
            })
        }

    }

    scrollToOffset = (option) => {
        this.flatList.scrollToOffset(option)
    }


    _renderItem = (itemData) => {
        const {renderItem} = this.props
        return <Animated.View style={{transform: [{
                translateY: this.animatedValue.interpolate({
                    inputRange:[0,1],
                    outputRange:[0,100]
                })
            }
            ]}}>
            {renderItem(itemData)}
        </Animated.View>
    }

    render() {
        return (
            <FlatList {...this.props}  renderItem={this._renderItem} ref={ref => this.flatList = ref}/>
        )
    }

}
