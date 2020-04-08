// Module Import
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Picker,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import MultipleSelect from "./MultipleSelect";
import { AntDesign } from "@expo/vector-icons";
// Constant Import
import { PROVINCE_TH, GENDER, BANK, JOB_POSITION } from "../assets/constValue";
// Setting Page Components
const SettingProfile = () => {
  // User State Data
  const [avatar, setAvatar] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/Prayut_Chan-o-cha_%28cropped%29_2016.jpg"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idCard, setIdCard] = useState("");
  const [currentProvince, setCurrentProvince] = useState("");
  const [gender, setGender] = useState("");
  const [introduceText, setIntroduceText] = useState("");
  const [titleInterestJob, setTitleInterestJob] = useState("");
  const [interestJob, setInterestJob] = useState([]);
  const [currentRole, setCurrentRole] = useState("Employer");
  // แสดงหน้าจอ
  return (
    <View>
      <KeyboardAvoidingView
        behavior="padding"
        //https://github.com/facebook/react-native/issues/11681
        keyboardVerticalOffset={-500}
        enabled
      >
        <ScrollView stickyHeaderIndices={[0]}>
          <View style={styleSheet.header}>
            <TouchableOpacity
              onPress={() => {
                // Vaildation & Save
                let firstNameValid = /^[ก-ํ]{2,20}$/.exec(firstName);
                let lastNameValid = /^[ก-ํ]{2,20}$/.exec(lastName);
                let ageValid = /^\d{1,2}$/.exec(age) && Number(age) >= 15;
                let phoneNumberValid = /^\d{9,10}$/.exec(phoneNumber);
                let idCardValid = /^\d{13}$/.exec(idCard);
                let msgwarning = "";
                if (!firstNameValid) msgwarning += "FirstName incorrect.\n";
                if (!lastNameValid) msgwarning += "LastName incorrect.\n";
                if (!ageValid) msgwarning += "Age incorrect.\n";
                if (!phoneNumberValid) msgwarning += "Phonenumber incorrect.\n";
                if (!idCardValid) msgwarning += "Id Card Number incorrect.\n";
                if (gender == "") msgwarning += "Sex doesn't select.\n";
                if (msgwarning != "") alert(msgwarning);
                // saving
                else {
                  let user_update = {
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    current_role: currentRole,
                    current_province: currentProvince,
                    interested: interestJob,
                    introduce_text: introduceText,
                    phone_number: phoneNumber,
                    id_card: idCard,
                    age: age,
                  };
                  console.log(JSON.stringify(user_update));
                }
              }}
            >
              <Text
                style={{
                  marginVertical: 5,
                  color: "#b2d9fe",
                }}
              >
                บันทึก
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styleSheet.container]}>
            <View style={styleSheet.titleHeader}>
              <Text style={[styleSheet.childPadVer, styleSheet.titleFont]}>
                แก้ไขข้อมูลส่วนตัว
              </Text>
              <Avatar
                containerStyle={styleSheet.childPadVer}
                rounded
                source={{ uri: avatar }}
                size="large"
                showEditButton
                onEditPress={async () => {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                    quality: 1,
                  });
                  console.log(result);
                  if (!result.cancelled) {
                    setAvatar(result.uri);
                  }
                }}
                editButton={{
                  name: "plus",
                  type: "font-awesome",
                  iconStyle: {
                    fontSize: 16,
                  },
                  size: 26,
                  style: {
                    backgroundColor: "#b2d9fe",
                  },
                  underlayColor: "#c3eaff",
                }}
              />
            </View>
            <TextRequired msg="ชื่อจริง" style={styleSheet.childPadVer} />
            <TextInput
              style={[styleSheet.inputStyle, styleSheet.childPadVer]}
              value={firstName}
              onChangeText={setFirstName}
              maxLength={20}
            />
            <TextRequired msg="นามสกุล" style={styleSheet.childPadVer} />

            <TextInput
              style={[styleSheet.inputStyle, styleSheet.childPadVer]}
              value={lastName}
              onChangeText={setLastName}
              maxLength={20}
            />
            <TextRequired msg="อายุ" style={styleSheet.childPadVer} />
            <TextInput
              style={[styleSheet.inputStyle, styleSheet.childPadVer]}
              value={age}
              keyboardType={"numeric"}
              onChangeText={setAge}
              maxLength={2}
            />
            <TextRequired
              msg="หมายเลขโทรศัพท์"
              style={styleSheet.childPadVer}
            />
            <TextInput
              style={[styleSheet.inputStyle, styleSheet.childPadVer]}
              value={phoneNumber}
              keyboardType={"numeric"}
              onChangeText={setPhoneNumber}
              maxLength={10}
            />
            <TextRequired
              msg="เลขประจำตัวประชาชน"
              style={styleSheet.childPadVer}
            />
            <TextInput
              style={[styleSheet.inputStyle, styleSheet.childPadVer]}
              value={idCard}
              keyboardType={"numeric"}
              onChangeText={setIdCard}
              maxLength={13}
            />
            <TextRequired
              msg="จังหวัดปัจจุบัน"
              style={styleSheet.childPadVer}
            />
            <View style={[styleSheet.pickerBorder, styleSheet.childPadVer]}>
              <Picker
                selectedValue={currentProvince}
                style={styleSheet.pickerInBox}
                onValueChange={(itemValue, itemIndex) =>
                  setCurrentProvince(itemValue)
                }
              >
                <Picker.Item
                  key={0}
                  label={"          "}
                  value={""}
                  color="gray"
                />
                {PROVINCE_TH.map((value, index) => (
                  <Picker.Item key={index + 1} label={value} value={value} />
                ))}
              </Picker>
              <AntDesign name="down" size={12} style={styleSheet.pickArrow} />
            </View>
            <TextRequired msg="เพศ" style={styleSheet.childPadVer} />
            <View style={[styleSheet.pickerBorder, styleSheet.childPadVer]}>
              <Picker
                selectedValue={gender}
                style={styleSheet.pickerInBox}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              >
                <Picker.Item
                  key={0}
                  label={"          "}
                  value={""}
                  color="gray"
                />
                {GENDER.map((value, index) => (
                  <Picker.Item key={index + 1} label={value} value={value} />
                ))}
              </Picker>
              <AntDesign name="down" size={12} style={styleSheet.pickArrow} />
            </View>
            <Text style={[styleSheet.childPadVer, styleSheet.titleFont]}>
              ตำแหน่งงานที่สนใจ
            </Text>
            <MultipleSelect
              values={interestJob}
              onChange={(value) => {
                setInterestJob(value);
                changeTitlte(value, setTitleInterestJob);
              }}
              items={JOB_POSITION}
            >
              <Text
                style={[
                  styleSheet.inputStyle,
                  styleSheet.childPadVer,
                  { textAlignVertical: "center" },
                ]}
              >
                {titleInterestJob}
              </Text>
              <AntDesign
                name="down"
                size={12}
                style={{ ...styleSheet.pickArrow, top: "25%" }}
              />
            </MultipleSelect>
            <Text style={[styleSheet.childPadVer, styleSheet.titleFont]}>
              แนะนำตัวเอง
            </Text>
            <TextInput
              style={[
                styleSheet.inputStyle,
                styleSheet.childPadVer,
                { height: 100, textAlignVertical: "top" },
              ]}
              maxLength={200}
              multiline
              numberOfLines={5}
              value={introduceText}
              onChangeText={setIntroduceText}
            />

            <View style={[styleSheet.childPadVer, { flexDirection: "row" }]}>
              <Text
                style={{
                  marginRight: 10,
                  marginVertical: 7,
                  ...styleSheet.titleFont,
                }}
              >
                บทบาท
              </Text>
              <TouchableOpacity onPress={() => setCurrentRole("Employer")}>
                <Text
                  style={[
                    styleSheet.roleSpace,
                    {
                      backgroundColor:
                        currentRole == "Employer" ? "#567091" : "white",
                      borderColor:
                        currentRole == "Employer" ? "#567091" : "black",
                      color: currentRole == "Employer" ? "white" : "black",
                    },
                  ]}
                >
                  นายจ้าง
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentRole("Job Seeker")}>
                <Text
                  style={[
                    styleSheet.roleSpace,
                    {
                      backgroundColor:
                        currentRole == "Job Seeker" ? "#567091" : "white",
                      borderColor:
                        currentRole == "Job Seeker" ? "#567091" : "black",
                      color: currentRole == "Job Seeker" ? "white" : "black",
                    },
                  ]}
                >
                  ลูกจ้าง
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const TextRequired = (props) => (
  <View style={[{ flexDirection: "row" }, props.style]}>
    <Text style={styleSheet.titleFont}>{props.msg}</Text>
    <Text style={{ paddingHorizontal: 5, color: "red" }}>*</Text>
  </View>
);

const changeTitlte = (title, setTitle) => {
  let str = "";
  for (let i = 0; i < title.length; i++) {
    if (str.length + title[i].length > 39) {
      str += "...";
      break;
    }
    str += title[i];
    if (i + 1 < title.length) str += " , ";
  }
  setTitle(str);
};

const styleSheet = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 50,
  },
  header: {
    height: 64,
    width: "100%",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 30,
    alignItems: "flex-end",
  },
  titleHeader: {
    alignItems: "center",
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
  roleSpace: {
    marginHorizontal: 10,
    paddingVertical: 7,
    width: 97,
    textAlign: "center",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  selectRole: {
    backgroundColor: "skyblue",
  },
  pickArrow: { position: "absolute", right: 5, top: "33%" },
});
export default SettingProfile;
