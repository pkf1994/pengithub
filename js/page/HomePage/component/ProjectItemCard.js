import React, {PureComponent} from 'react'
import {View,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Text,Button } from 'react-native-elements';
import AwesomeButton from "react-native-really-awesome-button";
import {Util_StarNumberFormat} from '../../../util';
import {TRENDING_LANGUAGE} from '../../../redux/module/trending/reducer';
var Color = require('color');

class ProjectItemCard extends PureComponent {
    constructor(props) {
        super(props)
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




    render() {
        const {repositoryModel,trendingStore} = this.props
        const {mainColor,descriptFontColor,subMainColor,metaFontColor} = this.state
        const {trendingLanguage} = trendingStore

        return (
                <View  style={{...styles.container,
                        backgroundColor:mainColor,
                        }}>

                   {/* {
                        trendingLanguage === TRENDING_LANGUAGE.ANY &&
                        <View style={styles.languageView}>
                            <View style={{...styles.languageCircle,
                                backgroundColor: repositoryModel.languageColor}}/>
                            <Text style={{...styles.languageText,color:descriptFontColor,marginRight: 10}}>
                                {repositoryModel.language ? repositoryModel.language : 'Unknow'}
                            </Text>
                        </View>
                    }
*/}
                    <View style={styles.languageView}>
                        <View style={{...styles.languageCircle,
                            backgroundColor: repositoryModel.languageColor}}/>
                        <Text style={{...styles.languageText,color:descriptFontColor,marginRight: 10}}>
                            {repositoryModel.language ? repositoryModel.language : 'Unknow'}
                        </Text>
                    </View>

                    <View style={{...styles.description}}>
                        <Text style={{...styles.descriptionText,color: descriptFontColor}}>
                            {repositoryModel.description}
                        </Text>
                    </View>

                    <View style={{...styles.meta,backgroundColor:subMainColor}}>
                        <View style={styles.basicInfoView}>
                            <Text style={{color: metaFontColor, ...styles.projectNameText}} numberOfLines={1}>{repositoryModel.author}/{repositoryModel.name}</Text>
                            <View style={{flexDirection:'row',alignItems: 'center'}}>
                                <Text style={{...styles.star, color: metaFontColor }}>★</Text>
                                <Text style={{color: metaFontColor, ...styles.projectAuthorText}}>{Util_StarNumberFormat(repositoryModel.stars)}</Text>
                                <Text style={{color: metaFontColor, ...styles.projectAuthorText}}>(+{Util_StarNumberFormat(repositoryModel.currentPeriodStars)})</Text>
                            </View>
                        </View>

                        {/*<AwesomeButton backgroundDarker="#C0C0C0"
                                       backgroundColor="white"
                                       borderRadius={8}
                                       raiseLevel={2}
                                       style={{marginRight:15}}
                                       height={40}>
                            <Text style={{...styles.star,marginLeft: 10}}>★</Text>
                            <Text style={{marginRight: 10}} includeFontPadding={false}>Star</Text>
                        </AwesomeButton>*/}

                        <Button title="★Star"
                                type="solid"
                                titleStyle={{includeFontPadding:false,color:'black'}}
                                buttonStyle={{borderRadius: 8,backgroundColor:'white',elevation:10}}/>
                    </View>
                </View>
        )
    }
}

const mapState = (state) => ({
    trendingStore: state.trending
})

export default connect(mapState,null)(ProjectItemCard)

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
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    basicInfoView: {
        marginLeft: 0,
        marginRight: 10,
        flexShrink: 1

    },
    avatarContainer: {
        height: 50,
        width: 50,
        margin: 10,
        marginRight: 15
    },
    avatar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    projectAvatar: {
        //backgroundColor: '#A9E680',
        borderRadius: 12
    },
    projectNameText: {
        fontWeight: "bold",
        fontSize: 16
    },
    star: {
        fontSize:16,
        paddingBottom: 2,
    },
    projectAuthorText: {
        fontSize: 12
    },
    button: {
        alignItems: 'center',
        borderRadius: 50,
        height: 30,
        backgroundColor: 'white',
    }
})
