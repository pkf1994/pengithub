import {StatusBar} from "react-native";
import {Util_DeepCopy} from "../util";

class ComprehensiveNavigationActionsBuilder{

    static ComprehensiveNavigationActions

    static getComprehensiveNavigationActions = () => {
        if(this.ComprehensiveNavigationActions) return this.ComprehensiveNavigationActions
        return this.ComprehensiveNavigationActions = new ComprehensiveNavigationActions()
    }
}

class ComprehensiveNavigationActions{

    preStatusBar = undefined

    navigate = (navigation,next,params,statusBarCurrentValue) => {
        this.preStatusBar = Util_DeepCopy(statusBarCurrentValue)
        navigation.navigate(next,{...params})
    }

    goBack = (navigation) => {
        console.log(this.preStatusBar)
        if(this.preStatusBar) processStatusBar(this.preStatusBar)
        navigation.goBack()
    }
}

function processStatusBar(preStatusBar) {
    StatusBar.setBarStyle(preStatusBar.barStyle.value)
}

export default ComprehensiveNavigationActionsBuilder
