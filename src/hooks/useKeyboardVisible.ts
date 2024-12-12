import { Keyboard } from "react-native";
import { useState, useEffect } from "react";
function useKeyboardVisible() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return isKeyboardVisible;
}

export default useKeyboardVisible;