import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";

//file import
import CalendarComponent from "../Components/dashboardScreen/CalenderPicker";
import Menu from "../Components/dashboardScreen/Menu";

import { fetchUserData } from "../redux/childSlice";
import { setLoading, setError } from "../redux/childSlice";
import { setData } from "../redux/wordCloudSlice";
import {fetchDataByArgsAction,setData as setRawData,} from "../redux/RawDataSearch";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AdminDashboard = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    data: childData,
    loading: childLoading,
    error: childError,
  } = useSelector((state) => state.child);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const startDate = selectedStartDate ? selectedStartDate.toString() : null;
  const endDate = selectedEndDate ? selectedEndDate.toString() : null;

  // hide Menu if get any error in data fetching
  const [showMenu,setShowMenu]=useState(true)
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        if (isLoggedIn === "true") {
          setIsUserLoggedIn(true);
          try {
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

            if (isLoggedIn === "true") {
              try {
                dispatch(setLoading(true));
                await dispatch(fetchUserData());
                dispatch(setLoading(false));

              } catch (error) {
                dispatch(setError(error.message));
                dispatch(setLoading(false));
              }
            }
          } catch (error) {
            console.error("Error Fetching status:", error.message);
          }
        } else {
          navigation.replace("Home");
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
      }
    };

    checkLoginStatus();
  }, []);
  useEffect(() => {
    if (userData && userData.data) {
      const childdropDownList = userData.data.map((el) => ({
        label: el.childName,
        value: el.app_id,
      }));
      setItems(childdropDownList);
    }
  }, [userData]);

  useEffect(() => {
    if (startDate !== null && endDate !== null && value !== null) {
      dispatch(fetchDataByArgsAction({ value, startDate, endDate }))
        .then((response) => {
          //console.log('Data fetched successfully:', response.meta);
          fetched_data = response.payload;
          child_id = value;
          search_date = [startDate, endDate];

          data_object = {
            chiild_id: child_id,
            search_date: search_date,
            fetched_data: fetched_data,
          };
          merge_all_data = [];
          merge_all_data.push(data_object);
          //console.log(dataStringfy)
          dispatch(setData(merge_all_data));
          setShowMenu(true);
        })
        .catch((error) => {
          // If there's an error during the action
          console.error("Error fetching data:", error);
          setShowMenu(false)
        });
    }
  }, [selectedStartDate, selectedEndDate, dispatch]);

  const handleDateChange = (date, type) => {
    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);

    if (type === "END_DATE") {
      // Set end date at 23:59:59
      date.setHours(23, 59, 59, 999);
      setSelectedEndDate(date);
      setIsCalendarVisible(false); // Hide the calendar after selecting end date
    } else {
      // Set start date at 12:00:00
      date.setHours(0, 0, 0, 0);
      setSelectedStartDate(date);
      // If end date is set and is before start date, reset it
      if (endDate && endDate < date) {
        setSelectedEndDate(null);
      }
    }
  };

  const showCalendar = () => {
    setIsCalendarVisible(true);
  };
  const handleLogout = async () => {
    try {
      // Clear user's login status in AsyncStorage
      await AsyncStorage.removeItem("isLoggedIn");

      // Navigate to the login screen
      navigation.replace("Home");
    } catch (error) {
      console.error("Error during logout:", error.message);
      
    }
  };

  if (isUserLoggedIn) {
    return (
      <SafeAreaView>
        <LinearGradient colors={["#3498db", "#ffffff"]}>
          <View style={styles.main}>
            {/* Header Section*/}
            <View style={styles.header}>
              <Text style={styles.viewTitle}>Dashboard</Text>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.logoutText}>logout</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[styles.dropdownContainer, open && styles.dropdownOpen]}
            >
            <Text style={styles.label}>Childs :</Text> 
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                min={1}
                max={2}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                dropDownStyle={styles.dropDownStyle}
                containerStyle={styles.dropDownContainer}
                labelStyle={styles.dropDownLabel}
                placeholder="Pick A Child"
                textStyle={styles.dropDownTextStyle}
              />
            </View>

            {/* Calender Section*/}
            <View style={styles.calendarContainer}>
              <TouchableOpacity
                onPress={showCalendar}
                style={styles.selectDateButton}
              >
                <Text style={styles.selectDateButtonText}>
                  Select Date Range
                </Text>
              </TouchableOpacity>

              {isCalendarVisible && (
                <View style={styles.calendar}>
                  <CalendarComponent
                    onDateChange={handleDateChange}
                    isVisible={isCalendarVisible}
                  />
                </View>
              )}

              <View style={styles.dateRange}>
                <Text style={styles.dateText}>From: {startDate}</Text>
                <Text style={styles.dateText}>To: {endDate}</Text>
              </View>
            </View>

            {/* Menu Section*/}
              {
                showMenu&&(
                  <Menu startDate={startDate} endDate={endDate} />
                )
              }
            

            
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  } else {
    null;
  }
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  menu: {
    width: windowWidth - 20,
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    backgroundColor: "#3498db",
  },
  main: {
    width: windowWidth,
    height: windowHeight,
  },
  header: {
    flexDirection: "row", // Arrange items horizontally
    justifyContent: "space-between", // Space between items
    alignItems: "center", // Center items vertically
    height: 120,
    marginTop: 10,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 20,
  },
  viewTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
  },

  logoutButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  logoutText: {
    color: "#3498db",
    fontWeight: "bold",
  },

  dropdownContainer: {
    width: windowWidth,
    position: "relative",
    zIndex: 1, // Ensure the dropdown appears above other components
    marginTop: 10, // Default margin
  },
  dropDownTextStyle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
  },
  label: {
    marginBottom: 5,
    color: "white",
    fontSize:15 ,
    fontWeight:'bold'
  },
  dropDownStyle: {
    backgroundColor: "#ffffff",
    borderColor: "#3498db", // Adjust border color as needed
    borderRadius: 10,
  },
  dropDownContainer: {
    borderWidth: 2,
    borderColor: "#3498db",
    borderRadius: 10,
    marginTop: 5,
  },
  dropDownLabel: {
    textAlign: "center",
    color: "#3498db",
  },
  // Style to adjust margin when the dropdown is open

  dropDownLabel: {
    textAlign: "center",
    color: "#3498db",
  },
  carousel: {
    display: "flex",
    justifyContent: "center",

    alignSelf: "center", // Center horizontally
    height: "25%",
    width: windowWidth - 20,
    marginTop: 50,
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 20,
  },

  calender: {
    width: windowWidth - 20,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    backgroundColor: "white",
  },
  selectDateButton: {
    padding: 10,
    backgroundColor: "#3498db",
    color: "#ffffff",
    marginBottom: 10,
    borderRadius: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: windowWidth,
    left: "50%",
    marginLeft: -0.5 * windowWidth,
    height: 50,
    backgroundColor: "#FFEDFF",

    backgroundColor: "#3498db",
  },
  

  //calender component
  calendarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  selectDateButton: {
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectDateButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  calendar: {
    marginTop: 10,
    marginBottom: 10,
  },
  dateRange: {
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    marginTop: 5,
  },
});
export default AdminDashboard;
