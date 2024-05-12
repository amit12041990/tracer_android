import React from "react";
import { View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

const CalendarComponent = ({ onDateChange, isVisible }) => {
    const minDate = new Date(); // Today
    minDate.setFullYear(minDate.getFullYear() - 5);
    const maxDate = new Date()

    return isVisible ? (
        <View>
        <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
        />
        </View>
    ) : null;
};

export default CalendarComponent;
