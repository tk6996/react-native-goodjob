import React, { useEffect, useState } from "react";
import SettingProfile from "./component/SettingProfile";
import CreateJob from "./component/CreateJob";
import SettingScreen from "./component/SettingScreen";
import { View, Text, Keyboard, Modal } from "react-native";
export default function App() {
  const [footer, setFooter] = useState(true);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setFooter(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setFooter(true);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* <Modal>
        <CreateJob />
      </Modal> */}
      {/* <SettingProfile /> */}
      <SettingScreen />
      {footer && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 42,
            backgroundColor: "red",
          }}
        >
          <Text>My fixed footer</Text>
        </View>
      )}
    </View>
  );
}
