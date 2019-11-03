import React, {PureComponent} from 'react'
import {View, StyleSheet, TouchableWithoutFeedback,TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux'
import {Text,Avatar} from 'react-native-elements';
import AwesomeButton from "react-native-really-awesome-button";
import {Util_StarNumberFormat,Util_DateFormat} from '../../../util';
import {SINCE_TYPE, TRENDING_LANGUAGE} from '../../../redux/module/trending/reducer';
import {withNavigation} from 'react-navigation'
var Color = require('color');

class ProjectItemCardEX extends PureComponent {
    constructor(props) {
        super(props)
        this.animatePressValue = new Animated.Value(1)
        this.state = {
            dominanColor: '#e6e6e6',
            mainColor: '#EEEEEE',
            subMainColor: '#E6E6E6',
            metaFontColor: 'black',
            descriptFontColor: 'black',
            buttonColor: 'white',
            lumia: 0,
            oldlumia: 0.0002
        }
    }

    componentDidMount(): void {
        const { trendingStore,repositoryModel} = this.props;
        const {trendingLanguage} = trendingStore
        if(trendingLanguage === TRENDING_LANGUAGE.ANY) {
            this._handleMainColor(repositoryModel.languageColor)
        }
    }

    _handleMainColor = (mainColorStr) => {
        let dominanColor = Color(mainColorStr)
        var mainColor =  Color('#e6e6e6')
        var subMainColor =  Color('#EEEEEE')
        if(!(dominanColor.luminosity() < 0.01 || dominanColor.luminosity() > 0.99)){
            if(dominanColor.luminosity() < 0.1) {
                subMainColor = dominanColor.lighten(0.2).lighten(0.05)
                while(subMainColor.luminosity() < 0.5) {
                    subMainColor = subMainColor.lighten(0.05)
                }
                mainColor = subMainColor.lighten(0.2)
            }else if(0.1 <= dominanColor.luminosity() && dominanColor.luminosity() < 0.2){
                subMainColor = dominanColor.lighten(0.1).lighten(0.05)
                while(subMainColor.luminosity() < 0.3) {
                    subMainColor = subMainColor.lighten(0.05)
                }
                mainColor = subMainColor.lighten(0.1)
            }else if(0.2 <= dominanColor.luminosity() && dominanColor.luminosity()  < 0.3){
                subMainColor = dominanColor.lighten(0.05).lighten(0.05)
                while(subMainColor.luminosity() < 0.6) {
                    subMainColor = subMainColor.lighten(0.05)
                }
                mainColor = subMainColor.lighten(0.05)
            } else if( 0.5 < dominanColor.luminosity() && dominanColor.luminosity()  <= 0.6){
                mainColor = dominanColor.darken(0.01)
                while(mainColor.luminosity() > 0.5) {
                    mainColor = mainColor.darken(0.01)
                }
                subMainColor = mainColor.darken(0.05)
            } else if(dominanColor.luminosity() > 0.6){
                mainColor = dominanColor.darken(0.02)
                while(mainColor.luminosity() > 0.5) {
                    mainColor = mainColor.darken(0.02)
                }
                subMainColor = mainColor.darken(0.05)
            } else {
                mainColor = dominanColor.lighten(0.45).lighten(0.1)
                subMainColor = dominanColor.lighten(0.45)
            }
        }
        let mainColorHex = mainColor.hex()
        let subMainColorHex = subMainColor.hex()
        const metaFontColor = mainColor.luminosity() < 0.5 ? 'white' : dominanColor.darken(1.2).hex()
        const descriptFontColor = mainColor.luminosity() < 0.5 ? 'white' : dominanColor.darken(1.2).hex()
        this.setState({
            dominanColor: dominanColor.hex(),
            mainColor: mainColorHex,
            subMainColor: subMainColorHex,
            metaFontColor: metaFontColor,
            descriptFontColor: descriptFontColor,
            oldlumia: dominanColor.luminosity(),
            lumia: subMainColor.luminosity()
        })
    }

    _navigateToRepositoryDetailPage = () => {
        const {navigation,repositoryModel} = this.props
        navigation.navigate(
            'RepositoryDetailPage',
            {
                repositoryModel:{
                    name: repositoryModel.name,
                    owner: repositoryModel.author,
                    avatar: repositoryModel.avatar,
                    language: repositoryModel.language,
                    languageColor: repositoryModel.languageColor
                }
            }
        )
    }

    _animateIn = () => {
        Animated.timing(
            this.animatePressValue, {
                toValue: 0.95,
                duration: 200,
                useNativeDriver: true
            }
        ).start();
    }

    _animateOut = () => {
        Animated.timing(this.animatePressValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    render() {
        const {repositoryModel,trendingStore} = this.props
        const {mainColor,descriptFontColor,subMainColor,metaFontColor} = this.state
        const {since} = trendingStore
        var sinceStr
        switch (since) {
            case SINCE_TYPE.DAILY:
                sinceStr = 'today'
                break
            case SINCE_TYPE.WEEKLY:
                sinceStr = 'this week'
                break
            case SINCE_TYPE.MONTHLY:
                sinceStr = 'this month'
                break
            default:
                sinceStr = Util_DateFormat()
        }
        return (
            <TouchableOpacity  onLongPress={this._animateIn}
                                       onPress={this._navigateToRepositoryDetailPage}
                                       onPressOut={this._animateOut}>
                <Animated.View  style={{...styles.container,
                    backgroundColor:mainColor,
                    transform: [
                        {
                            scale: this.animatePressValue
                        }
                    ]
                }} >

                    <View style={styles.languageView}>
                        <View style={{flexDirection: 'row',flexShrink:-1}}>
                            <View style={{...styles.languageCircle,
                                backgroundColor: repositoryModel.languageColor}}/>
                            <Text style={{...styles.languageText,color:descriptFontColor,marginRight: 10}}>
                                {repositoryModel.language ? repositoryModel.language : 'Unknow'}
                            </Text>
                        </View>


                        <View style={styles.starStatus}>
                            <View style={styles.starNumber}>
                                <Text style={styles.star}>★&nbsp;</Text>
                                <Text style={styles.starNumberText}>{Util_StarNumberFormat(repositoryModel.stars)}</Text>
                            </View>
                            <View style={styles.newStar}>
                                <Text style={[styles.starNumberText]}>+{Util_StarNumberFormat(repositoryModel.currentPeriodStars)}&nbsp;</Text>
                                <Text style={[styles.starNumberText,{fontWeight: 'bold'}]}>{sinceStr}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{...styles.description}}>
                        <Text style={{...styles.descriptionText,color: descriptFontColor}}>
                            {repositoryModel.description}
                        </Text>
                    </View>

                    <View style={{...styles.meta,backgroundColor:subMainColor}}>
                        <View style={styles.basicInfoView}>
                            <Avatar rounded
                                    containerStyle={styles.avatarContainer}
                                    source={{uri:repositoryModel.avatar}}
                                    size="small"/>
                            <View style={{flexShrink:-1}}>
                                <Text style={{ ...styles.projectNameText,color: metaFontColor}}
                                      ellipsizeMode="tail"
                                      numberOfLines={1}>{repositoryModel.name}</Text>
                                <Text style={{color: metaFontColor, ...styles.projectAuthorText}}
                                      ellipsizeMode="tail"
                                      numberOfLines={1}>{repositoryModel.author}</Text>
                            </View>
                        </View>

                        <AwesomeButton backgroundDarker="#C0C0C0"
                                       backgroundColor="white"
                                       borderRadius={8}
                                       raiseLevel={2}
                                       height={40}>
                            <Text style={{...styles.star,marginLeft: 10}}>★&nbsp;</Text>
                            <Text style={{marginRight: 10,includeFontPadding: false}} includeFontPadding={false}>Star</Text>
                        </AwesomeButton>

                        {/*   <Button title="★Star"
                                type="solid"
                                titleStyle={{includeFontPadding:false,color:'black'}}
                                buttonStyle={{borderRadius: 8,backgroundColor:'white'}}/>*/}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}

const mapState = (state) => ({
    trendingStore: state.trending
})

export default connect(mapState,null)(withNavigation(ProjectItemCardEX))

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 20,
        marginRight: 15,
        marginLeft: 15,
        borderRadius: 18,
    },
    languageView: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    languageCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        elevation: 20,
        marginRight: 5
    },
    languageText: {
        fontSize: 14,
        fontStyle: 'italic'
    },
    description: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingTop: 0,
        minHeight: 90,
        justifyContent: 'center'
    },
    descriptionText: {
        fontSize: 18,
        lineHeight: 25
    },
    meta: {
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    basicInfoView: {
        marginLeft: 0,
        marginRight: 10,
        flexShrink: -1,
        flexDirection:'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 10
    },
    projectAvatar: {
        //backgroundColor: '#A9E680',
        borderRadius: 12
    },
    projectNameText: {
        flexShrink: -1,
        fontWeight: "bold",
        fontSize: 20,
        includeFontPadding:false
    },
    starStatus: {
        flexDirection:'row',
        alignItems:'stretch',
        borderRadius: 8,
        backgroundColor: '#DDDDDD',
    },
    starNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 3,
        paddingRight: 8,
        paddingLeft: 8,
        paddingTop: 3,
        paddingBottom: 3,
        //elevation: 5,
    },
    newStar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 6,
        paddingRight: 8,
        paddingLeft: 8,
        margin: 3
        //elevation: 5
    },
    star: {
        fontSize:16,
        paddingBottom: 2,
        color: '#24292e',
        includeFontPadding:false
    },
    starNumberText: {
        fontSize: 12,
        color: '#24292e',
        includeFontPadding:false
    },
    projectAuthorText: {
        fontSize: 12,
        includeFontPadding:false
    },
    button: {
        alignItems: 'center',
        borderRadius: 50,
        height: 30,
        backgroundColor: 'white',
    }
})
