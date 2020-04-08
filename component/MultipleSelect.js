import React, { useState } from "react";
import { View, Modal, TouchableOpacity, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";

const MultipleSelect = ({ values, onChange, items, children }) => {
  const Item = (props) => {
    const [state, setState] = useState(props.default);

    return (
      <View style={{ width: "100%" }}>
        <CheckBox
          title={props.label}
          checked={state}
          onPress={() => {
            setState(!state);
            if (!state == true) props.addList(props.value);
            else props.removeList(props.value);
          }}
          checkedIcon="check-square"
          checkedColor="#404040"
          uncheckedColor="#404040"
        />
      </View>
    );
  };

  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity onPress={() => setActive(true)}>
      <View>
        {children}
        <Modal
          transparent
          onRequestClose={() => {
            setActive(false);
          }}
          visible={active}
          animationType="fade"
        >
          <View
            style={{
              backgroundColor: "#00000099",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <ScrollView
              style={{
                marginHorizontal: 25,
                backgroundColor: "white",
                maxHeight: 56.5 * (items.length < 10 ? items.length : 10),
              }}
            >
              {items.map((value, index) => (
                <Item
                  key={index}
                  default={values.indexOf(value) > -1}
                  label={value}
                  value={value}
                  addList={(value) => {
                    onChange([...values, value]);
                  }}
                  removeList={(value) => {
                    let array = values;
                    array.splice(array.indexOf(value), 1);
                    onChange(array);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

export default MultipleSelect;
