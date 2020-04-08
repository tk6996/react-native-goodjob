import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
  VirtualizedList,
  Picker,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
//https://docs.expo.io/versions/latest/sdk/map-view/
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
// Constant Import
import { JOB_POSITION, MONTH_TH } from "../assets/constValue";
// Create Job Component
const CreateJob = ({ onClickBackArrow = null }) => {
  // Data Job
  const [jobName, setJobName] = useState("");
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  // Date
  const [datePick, setDatePick] = useState({
    show: false,
    value: null,
    mode: "date",
    onChange: null,
  });

  const [address, setAddress] = useState(null);
  //const [showMap, setShowMap] = useState(false);
  const [newPosition, setNewPosition] = useState({
    position: "",
    amount: "",
    cost: "",
  });
  const [description, setDescription] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectJob, setSelectJob] = useState([]);
  const [selectMode, setSelectMode] = useState("Manual Search");
  return (
    <View>
      <KeyboardAvoidingView
        behavior="padding"
        //https://github.com/facebook/react-native/issues/11681
        keyboardVerticalOffset={-500}
        enabled
      >
        <ScrollView stickyHeaderIndices={[0]}>
          <HeaderBack onClickBackArrow={onClickBackArrow} />
          <View style={styleSheet.container}>
            <Text style={[styleSheet.titleFont, styleSheet.childPadVer]}>
              ชื่องาน
            </Text>
            <TextInput
              style={[styleSheet.inputStyle, styleSheet.childPadVer]}
              value={jobName}
              onChangeText={setJobName}
              maxLength={40}
            />
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Text style={[styleSheet.titleFont, styleSheet.childPadVer]}>
              วันที่
            </Text>
            <TouchableOpacity
              onPress={() =>
                setDatePick({
                  show: true,
                  value: date,
                  mode: "date",
                  onChange: (value) => {
                    setDate(value);
                  },
                })
              }
            >
              <Text
                style={[
                  styleSheet.inputStyle,
                  styleSheet.childPadVer,
                  { textAlignVertical: "center" },
                ]}
              >
                {date &&
                  `${date.getDate()} ${MONTH_TH[date.getMonth()]} ${
                    date.getFullYear() + 543
                  }`}
              </Text>
              <AntDesign
                name="down"
                size={12}
                style={{ ...styleSheet.pickArrow, top: "25%" }}
              />
            </TouchableOpacity>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Text style={[styleSheet.titleFont, styleSheet.childPadVer]}>
              เวลา
            </Text>
            <View style={[{ flexDirection: "row" }, styleSheet.childPadVer]}>
              <View
                style={{
                  flexDirection: "row",
                  width: "47.5%",
                  marginRight: "5%",
                }}
              >
                <Text
                  style={[
                    styleSheet.titleFont,
                    {
                      textAlignVertical: "center",
                      width: "30%",
                      fontSize: 13,
                    },
                  ]}
                >
                  ตั้งแต่
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setDatePick({
                      show: true,
                      value: startDate || Date.now(),
                      mode: "time",
                      onChange: (value) => {
                        setStartDate(value);
                      },
                    })
                  }
                  style={{ width: "70%" }}
                >
                  <Text
                    style={[
                      styleSheet.inputStyle,
                      { textAlignVertical: "center", textAlign: "center" },
                    ]}
                  >
                    {startDate &&
                      `${((num) => (num < 10 ? "0" + num : num))(
                        startDate.getHours()
                      )}:${((num) => (num < 10 ? "0" + num : num))(
                        startDate.getMinutes()
                      )} `}
                  </Text>
                  <AntDesign
                    name="down"
                    size={12}
                    style={{ ...styleSheet.pickArrow, top: "33%" }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "47.5%",
                }}
              >
                <Text
                  style={[
                    styleSheet.titleFont,
                    {
                      textAlignVertical: "center",
                      width: "30%",
                      fontSize: 13,
                    },
                  ]}
                >
                  จนถึง
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setDatePick({
                      show: true,
                      value: finishDate || Date.now(),
                      mode: "time",
                      onChange: (value) => {
                        setFinishDate(value);
                      },
                    })
                  }
                  style={{ width: "70%" }}
                >
                  <Text
                    style={[
                      styleSheet.inputStyle,
                      { textAlignVertical: "center", textAlign: "center" },
                    ]}
                  >
                    {finishDate &&
                      `${((num) => (num < 10 ? "0" + num : num))(
                        finishDate.getHours()
                      )}:${((num) => (num < 10 ? "0" + num : num))(
                        finishDate.getMinutes()
                      )} `}
                  </Text>
                  <AntDesign
                    name="down"
                    size={12}
                    style={{ ...styleSheet.pickArrow, top: "33%" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {datePick.show && (
              <DateTimePicker
                value={datePick.value || Date.now()}
                mode={datePick.mode}
                is24Hour={true}
                display="default"
                onChange={(event, date) => {
                  setDatePick({ ...datePick, show: false });
                  date && datePick.onChange(date);
                }}
              />
            )}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Text style={[styleSheet.titleFont, styleSheet.childPadVer]}>
              สถานที่
            </Text>
            <TextInput
              style={[styleSheet.inputStyle, styleSheet.childPadVer]}
              value={address}
              onChangeText={setAddress}
              maxLength={40}
            />
            {/* <TouchableOpacity
              onPress={() => {
                setShowMap(true);
              }}
            >
              <Text
                style={[
                  styleSheet.inputStyle,
                  styleSheet.childPadVer,
                  { textAlignVertical: "center" },
                ]}
              ></Text>
              <Modal
                visible={showMap}
                onRequestClose={() => {
                  setShowMap(false);
                }}
              >
                <Map coordinate={address} onMark={setAddress} />
              </Modal>
            </TouchableOpacity> */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Text style={[styleSheet.childPadVer, styleSheet.titleFont]}>
              รายละเอียด
            </Text>
            <TextInput
              style={[
                styleSheet.inputStyle,
                styleSheet.childPadVer,
                { height: 140, textAlignVertical: "top" },
              ]}
              maxLength={500}
              multiline
              numberOfLines={8}
              value={description}
              onChangeText={setDescription}
            />
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Text style={[styleSheet.childPadVer, styleSheet.titleFont]}>
              ตำแหน่งงาน
            </Text>
            <View style={[styleSheet.childPadVer, { flexDirection: "row" }]}>
              <Text
                style={[
                  styleSheet.titleFont,
                  { width: "60%", fontSize: 13, paddingLeft: "7%" },
                ]}
              >
                ตำแหน่ง
              </Text>
              <Text
                style={[
                  styleSheet.titleFont,
                  { width: "20%", fontSize: 13, textAlign: "center" },
                ]}
              >
                จำนวน
              </Text>
              <Text
                style={[
                  styleSheet.titleFont,
                  { width: "20%", fontSize: 13, textAlign: "right" },
                ]}
              >
                ค่าจ้าง/คน
              </Text>
            </View>
            {positions.map((value, index) => (
              <View
                key={index}
                style={
                  ([styleSheet.childPadVer],
                  {
                    alignItems: "center",
                    flexDirection: "row",
                  })
                }
              >
                <TouchableOpacity
                  style={{
                    height: 18,
                    marginRight: "2%",
                    marginLeft: "0.5%",
                  }}
                  onPress={() => {
                    setPositions(positions.filter((_, i) => i !== index));
                    setSelectJob(selectJob.filter((_, i) => i !== index));
                  }}
                >
                  <Ionicons
                    name="md-trash"
                    size={20}
                    style={{
                      color: "#f3595a",
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    height: 35,
                    textAlignVertical: "center",
                    width: "50%",
                    marginRight: "2%",
                  }}
                >
                  {value.position}
                </Text>
                <Text
                  style={[
                    {
                      width: "19%",
                      marginRight: "1%",
                      textAlign: "right",
                      paddingHorizontal: "2%",
                    },
                  ]}
                >
                  {value.amount}
                </Text>
                <Text
                  style={[
                    {
                      width: "19%",
                      marginLeft: "1%",
                      textAlign: "right",
                      paddingHorizontal: "1%",
                    },
                  ]}
                >
                  {value.cost}฿
                </Text>
              </View>
            ))}
            <View
              style={[
                styleSheet.childPadVer,
                { alignItems: "center", flexDirection: "row" },
              ]}
            >
              <TouchableOpacity
                style={{
                  height: 16,
                  marginRight: "2%",
                }}
                onPress={() => {
                  let msg = "";
                  msg +=
                    newPosition.position == "" ? "ตำแหน่งไม่ถูกต้อง\n" : "";
                  msg +=
                    Number(newPosition.amount) > 0 ? "" : "จำนวนไม่ถูกต้อง\n";
                  msg +=
                    newPosition != "" && Number(newPosition.cost) >= 0
                      ? ""
                      : "ค่าจ้างไม่ถูกต้อง\n";
                  if (msg == "") {
                    setPositions([
                      ...positions,
                      {
                        position: newPosition.position,
                        amount: Number(newPosition.amount),
                        cost: Number(newPosition.cost),
                      },
                    ]);
                    setSelectJob([...selectJob, newPosition.position]);
                    setNewPosition({
                      position: "",
                      amount: "",
                      cost: "",
                    });
                  } else {
                    alert(msg);
                  }
                }}
              >
                <AntDesign
                  name="pluscircle"
                  size={16}
                  style={{
                    color: "#13b319",
                  }}
                />
              </TouchableOpacity>
              <View
                style={[
                  styleSheet.pickerBorder,
                  { width: "50%", marginRight: "2%" },
                ]}
              >
                <Picker
                  selectedValue={newPosition.position}
                  style={styleSheet.pickerInBox}
                  onValueChange={(itemValue, itemIndex) => {
                    setNewPosition({ ...newPosition, position: itemValue });
                  }}
                >
                  <Picker.Item
                    key={0}
                    label={"          "}
                    value={""}
                    color="gray"
                  />
                  {JOB_POSITION.filter(
                    (value) => selectJob.indexOf(value) == -1
                  ).map((value, index) => (
                    <Picker.Item key={index + 1} label={value} value={value} />
                  ))}
                </Picker>
                <AntDesign name="down" size={12} style={styleSheet.pickArrow} />
              </View>
              <TextInput
                style={[
                  styleSheet.inputStyle,
                  { width: "19%", marginRight: "1%", textAlign: "right" },
                ]}
                value={newPosition.amount}
                onChangeText={(v) => {
                  setNewPosition({ ...newPosition, amount: v });
                }}
                maxLength={5}
                keyboardType="numeric"
              />
              <TextInput
                style={[
                  styleSheet.inputStyle,
                  { width: "19%", marginLeft: "1%", textAlign: "right" },
                ]}
                value={newPosition.cost}
                onChangeText={(v) => {
                  setNewPosition({ ...newPosition, cost: v });
                }}
                maxLength={5}
                keyboardType="numeric"
              />
            </View>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Text style={[styleSheet.titleFont, styleSheet.childPadVer]}>
              รูปแบบการค้นหาลูกจ้าง
            </Text>
            <View style={[{ flexDirection: "row" }, styleSheet.childPadVer]}>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectMode == "Manual Search" ? "#567091" : "white",
                  borderColor:
                    selectMode == "Manual Search" ? "#567091" : "black",
                  marginRight: "1%",
                  ...styleSheet.selectMode,
                }}
                onPress={() => {
                  setSelectMode("Manual Search");
                }}
              >
                <Text
                  style={[
                    styleSheet.textMode,
                    {
                      color: selectMode == "Manual Search" ? "white" : "black",
                    },
                  ]}
                >
                  Manual Search
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectMode == "Auto Search" ? "#567091" : "white",
                  borderColor:
                    selectMode == "Auto Search" ? "#567091" : "black",
                  marginLeft: "1%",
                  ...styleSheet.selectMode,
                }}
                onPress={() => {
                  setSelectMode("Auto Search");
                }}
              >
                <Text
                  style={[
                    styleSheet.textMode,
                    ,
                    {
                      color: selectMode == "Auto Search" ? "white" : "black",
                    },
                  ]}
                >
                  Auto Search
                </Text>
              </TouchableOpacity>
            </View>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <TextList></TextList>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// const Map = (props) => {
//   const { width, height } = Dimensions.get("window");
//   const [region, setRegion] = useState({
//     latitude: 13.7563,
//     longitude: 100.5018,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0922 * (width / height),
//   });
//   const [marker, setMarker] = useState(null);

//   React.useEffect(() => {
//     let mounted = true;
//     if (props.coordinate == null) {
//       (async () => {
//         if (
//           (await Permissions.askAsync(Permissions.LOCATION)).status == "granted"
//         ) {
//           let location = await Location.getCurrentPositionAsync({});
//           if (mounted)
//             setRegion({
//               ...region,
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             });
//         }
//       })();
//     } else {
//       setRegion({
//         ...region,
//         latitude: props.coordinate.latitude,
//         longitude: props.coordinate.longitude,
//       });
//     }
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <View
//       style={{
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: "flex-end",
//         alignItems: "center",
//       }}
//     >
//       <MapView
//         provider={props.provider}
//         style={{
//           ...StyleSheet.absoluteFillObject,
//         }}
//         region={region}
//         onRegionChangeComplete={setRegion}
//         onPress={(e) => {
//           setMarker({ coordinate: e.nativeEvent.coordinate });
//           props.onMark({
//             latitude: e.nativeEvent.coordinate.latitude,
//             longitude: e.nativeEvent.coordinate.longitude,
//           });
//         }}
//       >
//         {marker && <Marker coordinate={marker.coordinate} />}
//       </MapView>
//       <Text>{JSON.stringify(region)}</Text>
//     </View>
//   );
// };

const HeaderBack = ({ onClickBackArrow }) => {
  return (
    <View style={{ ...styleSheet.header, alignItems: "flex-start" }}>
      <TouchableOpacity onPress={onClickBackArrow}>
        <Ionicons name="ios-arrow-round-back" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const TextList = () => (
  <View>
    <Text>dsdsdsds</Text>
  </View>
);

const styleSheet = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 50,
  },
  header: {
    height: 40,
    width: "100%",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "flex-end",
  },
  titleFont: {
    color: "#567091",
  },
  childPadVer: {
    marginBottom: 10,
  },
  inputStyle: {
    borderWidth: 0.5,
    height: 35,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  pickerBorder: { borderWidth: 0.5, borderRadius: 5 },
  pickerInBox: {
    height: 35,
    width: "109%",
    backgroundColor: "transparent",
    color: "black",
    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
    left: "-3%",
  },
  selectMode: {
    width: "49%",
    paddingVertical: 7,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  textMode: {
    textAlign: "center",
  },
  pickArrow: { position: "absolute", right: 5, top: "33%" },
});
export default CreateJob;
