import React, {PureComponent} from 'react'
import {View,Text,StyleSheet} from 'react-native'
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


    _generateIconByFileType = () => {
        const {file} = this.props
        const {type,name} = file
        if(type === 'dir') {
            return <Ionicons name='ios-folder' color="#6cb5fe"/>
        }

        else if(name === 'README.md' || name === 'LICENSE') {
            return <SimpleLineIcons name='book-open' color="#6a9fb5"/>
        }

        else if(name === 'package.json') {
            return  <MaterialCommunityIcons name='npm-variant-outline' color="#ac4142"/>
        }

        else if(name === 'manifest.json') {
            return  <Entypo name='database' color="#ee9e2e"/>
        }

        else if(name === '.babelrc') {
            return  <MaterialCommunityIcons name='babel' color="#ee9e2e"/>
        }

        else if(name === '.editorconfig') {
            return  <Text style={{fontFamily: "iconfont",color:'#d28445'}}>&#xe639;</Text>
        }

        else if(name === '.eslintignore') {
            return  <MaterialCommunityIcons name='eslint' color="#aa759f"/>
        }

        else if(name === '.eslintrc.js') {
            return  <MaterialCommunityIcons name='eslint' color="#c7a4c0"/>
        }

        else if(name === '.gitattributes' || name === '.gitignore' || name === '.mailmap') {
            return  <MaterialCommunityIcons name='git' color="#ac4142"/>
        }

        else if(name === '.nvmrc') {
            return  <MaterialCommunityIcons name='nodejs' color="#90a959"/>
        }

        else if(name === '.prettierignore') {
            return  <Text style={{fontFamily: "iconfont",color:"#6a9fb5"}}>&#xe710;</Text>
        }

        else if(name === 'AUTHORS') {
            return  <Feather name='at-sign' color="#ac4542"/>
        }

        else if(name === 'appveyor.yml') {
            return   <Text style={{fontFamily: "iconfont",color:"#6a9fb5"}}>&#xe745;</Text>
        }

        else if(name === 'netlify.toml') {
            return   <Text style={{fontFamily: "iconfont",color:"#6a9fb5"}}>&#xe6c9;</Text>
        }

        else if(name === 'yarn.lock') {
            return <Text style={{fontFamily: "iconfont",color:"#6a9fb5"}}>&#xe73e;</Text>
        }

        else if(name === '.watchmanconfig') {
            return   <Text style={{fontFamily: "iconfont", color:"#6a9fb5"}}>&#xe74d;</Text>
        }

        // =====================================后缀类型

        else if(name.endWith('.sh')) {
            return  <Octicons name='terminal' color="#aa759f"/>
        }

        else if(name.endWith('.cmd')) {
            return  <AntDesign name='windows' color="#aa759f"/>
        }

        else if(name.endWith('.yml')) {
            return  <Entypo name='database' color="#c97071"/>
        }


        else if(name.endWith('.gif')) {
            return  <Ionicons name='gif' color="#6a9fb5"/>
        }

        else if(name.endWith('.svg')) {
            return  <Ionicons name='svg' color="#6a9fb5"/>
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
            return  <Ionicons name='image' color="#d28445"/>
        }

        // ===================编程语言
        else if(name.endWith('.js')) {
            return  <MaterialCommunityIcons name='language-javascript' color="#ee9e2e"/>
        }

        else if(name.endWith('.md')) {
            return  <Ionicons name='markdown' color="#6a9fb5"/>
        }

        else if(name.endWith('.css')) {
            return  <Ionicons name='language-css3' color="#6a9fb5"/>
        }

        else if(name.endWith('.dart')) {
            return  <Text style={{fontFamily: "iconfont", color:'#75b5aa'}}>&#xe74d;</Text>
        }

        else if(name.endWith('.java')) {
            return  <FontAwesome5 name='java' color="#aa759f"/>
        }

        else if(name.endWith('.c')) {
            return  <MaterialCommunityIcons name='language-c' color="#6a9fb5"/>
        }

        else if(name.endWith('.cs')) {
            return  <MaterialCommunityIcons name='language-csharp' color="#6a9fb5"/>
        }

        else if(name.endWith('.m')) {
            return <Text style={{fontFamily: "iconfont", color:'#6a9fb5'}}>&#xe60c;</Text>
        }

        else if(name.endWith('.cc')) {
            return  <Text style={{fontFamily: "iconfont", color:'#6a9fb5'}}>&#xe62f;</Text>
        }

        else if(name.endWith('.go')) {
            return  <MaterialCommunityIcons name='language-go' color="#6a9fb5"/>
        }

        else if(name.endWith('.r')) {
            return  <MaterialCommunityIcons name='language-r' color="#6a9fb5"/>
        }

        else if(name.endWith('.ts')) {
            return  <MaterialCommunityIcons name='language-typescript' color="#6a9fb5"/>
        }

        else if(name.endWith('.vb')) {
            return  <Fontisto name='visual-studio' color="#6a9fb5"/>
        }

        else if(name.endWith('.swift')) {
            return  <MaterialCommunityIcons name='language-swift' color="#90a959"/>
        }

        else if(name.endWith('.rb')) {
            return  <Octicons name='ruby' color="#ac4142"/>
        }

        else if(name.endWith('.php')) {
            return  <Text style={{fontFamily: "iconfont", color:'#46788d'}}>&#xe671;</Text>
        }

        else if(name.endWith('.groovy')) {
            return  <Text style={{fontFamily: "iconfont", color:'#6098b0'}}>&#xe600;</Text>
        }

        else if(name.endWith('.py')) {
            return  <FontAwesome5 name='python' color="#46788d"/>
        }

        else if(name.endWith('.html')) {
            return  <MaterialCommunityIcons name='language-html5' color="#d28445"/>
        }

        return <Octicons name="file" color="#6a737d"/>

    }

    render() {
        const {file} = this.props
        const fileIcon = this._generateIconByFileType()
        return (
            <View style={S.container}>
                {fileIcon}
                <Text>
                    {file.name}
                </Text>
            </View>
        )
    }
}

export default FileListItem

const S = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    }
})
