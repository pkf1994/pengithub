import React, {PureComponent} from 'react'
import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
String.prototype.endWith = function(str){
    if(str==null||str===""||this.length===0||str.length>this.length)return false
    if(this.substring(this.length-str.length)===str){
        return true
    }else{
        return false;
    }
}

class FileListItem extends PureComponent{

    render() {
        const {file} = this.props
        const {type,name} = file
        const fileIcon = _generateIconByFileType(type,name)
        return (
            <TouchableNativeFeedback>
                <View style={S.container}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={S.fileIconContainer}>
                            {fileIcon}
                        </View>
                        <Text style={S.fileName}>
                            {file.name}
                        </Text>
                    </View>
                    <Fontisto name="caret-down" color="gray"/>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

export default FileListItem

const S = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingRight : 10,
        paddingVertical: 15,
        backgroundColor: 'white'
    },
    fileIconContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: "center"
    },
    fileName: {
        paddingLeft: 5,
        fontSize: 18
    }
})

function _generateIconByFileType(type,name){

    const size = 24

    if(type === 'dir') {
        return <Ionicons name='ios-folder' size={size} color="#6cb5fe"/>
    }

    else if(name === 'README.md' || name === 'LICENSE') {
        return <SimpleLineIcons name='book-open' size={size-4} color="#6a9fb5"/>
    }

    else if(name === 'package.json') {
        return  <MaterialCommunityIcons name='npm-variant-outline' size={size} color="#ac4142"/>
    }

    else if(name === 'manifest.json') {
        return  <Entypo name='database' size={size} color="#ee9e2e"/>
    }

    else if(name === '.babelrc') {
        return  <MaterialCommunityIcons name='babel' size={size} color="#ee9e2e"/>
    }

    else if(name === '.editorconfig') {
        return  <Text style={{fontFamily: "iconfont",color:'#d28445', fontSize:size}}>&#xe639;</Text>
    }

    else if(name === '.eslintignore') {
        return  <MaterialCommunityIcons name='eslint' size={size} color="#aa759f"/>
    }

    else if(name === '.eslintrc.js') {
        return  <MaterialCommunityIcons name='eslint' size={size} color="#c7a4c0"/>
    }

    else if(name === '.gitattributes' || name === '.gitignore' || name === '.mailmap') {
        return  <MaterialCommunityIcons name='git' size={size} color="#ac4142"/>
    }

    else if(name === '.nvmrc') {
        return  <MaterialCommunityIcons name='nodejs' size={size} color="#90a959"/>
    }

    else if(name === '.prettierignore') {
        return  <Text style={{fontFamily: "iconfont",color:"#6a9fb5",fontSize:size}}>&#xe710;</Text>
    }

    else if(name === 'AUTHORS') {
        return  <Feather name='at-sign' size={size} color="#ac4542"/>
    }

    else if(name === 'appveyor.yml') {
        return   <Text style={{fontFamily: "iconfont",color:"#6a9fb5",fontSize:size}}>&#xe745;</Text>
    }

    else if(name === 'netlify.toml') {
        return   <Text style={{fontFamily: "iconfont",color:"#6a9fb5",fontSize:size}}>&#xe6c9;</Text>
    }

    else if(name === 'yarn.lock') {
        return <Text style={{fontFamily: "iconfont",color:"#6a9fb5",fontSize:size}}>&#xe73e;</Text>
    }

    else if(name === '.watchmanconfig') {
        return   <Text style={{fontFamily: "iconfont", color:"#6a9fb5",fontSize:size}}>&#xe74d;</Text>
    }

    // =====================================后缀类型

    else if(name.endWith('.sh')) {
        return  <Octicons name='terminal' size={size} color="#aa759f"/>
    }

    else if(name.endWith('.cmd')) {
        return  <AntDesign name='windows' size={size} color="#aa759f"/>
    }

    else if(name.endWith('.yml')) {
        return  <Entypo name='database' size={size} color="#c97071"/>
    }


    else if(name.endWith('.gif')) {
        return  <Ionicons name='gif' size={size} color="#6a9fb5"/>
    }

    else if(name.endWith('.svg')) {
        return  <Ionicons name='svg' size={size} color="#6a9fb5"/>
    }

    else if(name.endWith('.png')
        || name.endWith('.jpg')
        || name.endWith('.bmp')
        || name.endWith('.tif')
        || name.endWith('.pcx')
        || name.endWith('.tga')
        || name.endWith('.exif')
        || name.endWith('.fpx')
        || name.endWith('.psd')
        || name.endWith('.cdr')
        || name.endWith('.pcd')
        || name.endWith('.dxf')
        || name.endWith('.ufo')
        || name.endWith('.eps')
        || name.endWith('.ai')
        || name.endWith('.raw')
        || name.endWith('.WMF')
        || name.endWith('.webp')
    ) {
        return  <Ionicons name='image' size={size} color="#d28445"/>
    }

    // ===================编程语言
    else if(name.endWith('.js')) {
        return  <MaterialCommunityIcons size={size} name='language-javascript' color="#ee9e2e"/>
    }

    else if(name.endWith('.md')) {
        return  <Ionicons name='logo-markdown' size={size} color="#6a9fb5"/>
    }

    else if(name.endWith('.css')) {
        return  <Ionicons name='language-css3' size={size} color="#6a9fb5"/>
    }

    else if(name.endWith('.dart')) {
        return  <Text style={{fontFamily: "iconfont", color:'#75b5aa',fontSize:size}}>&#xe74d;</Text>
    }

    else if(name.endWith('.java')) {
        return  <FontAwesome5 name='java' size={size} color="#aa759f"/>
    }

    else if(name.endWith('.c')) {
        return  <MaterialCommunityIcons name='language-c' size={size} color="#6a9fb5"/>
    }

    else if(name.endWith('.cs')) {
        return  <MaterialCommunityIcons name='language-csharp' size={size} color="#6a9fb5"/>
    }

    else if(name.endWith('.m')) {
        return <Text style={{fontFamily: "iconfont", color:'#6a9fb5',fontSize:size}}>&#xe60c;</Text>
    }

    else if(name.endWith('.cc')) {
        return  <Text style={{fontFamily: "iconfont", color:'#6a9fb5',fontSize:size}}>&#xe62f;</Text>
    }

    else if(name.endWith('.go')) {
        return  <MaterialCommunityIcons size={size} name='language-go' color="#6a9fb5"/>
    }

    else if(name.endWith('.r')) {
        return  <MaterialCommunityIcons size={size} name='language-r' color="#6a9fb5"/>
    }

    else if(name.endWith('.ts')) {
        return  <MaterialCommunityIcons size={size} name='language-typescript' color="#6a9fb5"/>
    }

    else if(name.endWith('.vb')) {
        return  <Fontisto size={size} name='visual-studio' color="#6a9fb5"/>
    }

    else if(name.endWith('.swift')) {
        return  <MaterialCommunityIcons name='language-swift' size={size} color="#90a959"/>
    }

    else if(name.endWith('.rb')) {
        return  <Octicons size={size} name='ruby' color="#ac4142"/>
    }

    else if(name.endWith('.php')) {
        return  <Text style={{fontFamily: "iconfont", color:'#46788d',fontSize:size}}>&#xe671;</Text>
    }

    else if(name.endWith('.groovy')) {
        return  <Text style={{fontFamily: "iconfont", color:'#6098b0',fontSize:size}}>&#xe600;</Text>
    }

    else if(name.endWith('.py')) {
        return  <FontAwesome5 size={size} name='python' color="#46788d"/>
    }

    else if(name.endWith('.html')) {
        return  <MaterialCommunityIcons size={size} name='language-html5' color="#d28445"/>
    }

    return <Octicons size={size} name="file" color="#6a737d"/>

}
