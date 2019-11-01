import {ToastAndroid} from "react-native";
import {CommonAction} from "./commonActionType";

export const CommonExceptionHandler = (e,dispatch,actionId) => {
    console.log(e)
    ToastAndroid.show("GET_DATA_FAIL:GET_CONTRIBUTORS_DATA", ToastAndroid.LONG);
    dispatch({
        type: CommonAction.GET_DATA_FAIL,
        payload: {
            id: actionId,
            error: e
        }
    })
}
