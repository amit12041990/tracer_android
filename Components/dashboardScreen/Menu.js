import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Menu = ( { startDate, endDate }) => {
    
   

    const navigation = useNavigation();
    const [activeItem, setActiveItem] = useState(null);

    const handlePress = (item) => {
        // Handle press event for the menu item
        const params = {
            startDate: startDate,
            endDate: endDate
        };
        
        if (item === 'WordCloud') {
           // navigation.navigate('WordCloud',params);
           
        } else if (item === 'ProgressChart') {
           // navigation.navigate('ProgressChart',params);
        } else if (item === 'EmotionScreen') {
           // navigation.navigate('EmotionChart',params);
        } else if (item === 'ScreenChart') {
            navigation.navigate('ScreenChart',params);
        }
        else if(item==='SearchQueryChart'){
           // navigation.navigate('SearchQueryChart',params)
        }
        else {
            return;
        }
    };

    const handleItemPressIn = (item) => {
        setActiveItem(item);
    };

    const handleItemPressOut = () => {
        setActiveItem(null);
    };

    const getItemColor = (item) => {
        if (item === activeItem) {
            return '#FF6347'; // Set hover color
        }
        return '#3498db'; // Set default color
    };

    return (
        <View style={styles.container}>

            <TouchableWithoutFeedback onPress={() => handlePress('WordCloud')} onPressIn={() => handleItemPressIn('WordCloud')} onPressOut={handleItemPressOut}>
                <View style={styles.menuItem}>
                    <MaterialIcons name="cloud" size={24} color={getItemColor('WordCloud')} />
                    <Text style={[styles.menuText, { color: getItemColor('WordCloud') }]}>Word Cloud</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handlePress('ProgressChart')} onPressIn={() => handleItemPressIn('ProgressChart')} onPressOut={handleItemPressOut}>
                <View style={styles.menuItem}>
                    <MaterialIcons name="insert-chart" size={24} color={getItemColor('ProgressChart')} />
                    <Text style={[styles.menuText, { color: getItemColor('ProgressChart') }]}>Grammar Analysis</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handlePress('EmotionScreen')} onPressIn={() => handleItemPressIn('EmotionScreen')} onPressOut={handleItemPressOut}>
                <View style={styles.menuItem}>
                    <MaterialIcons name="mood" size={24} color={getItemColor('EmotionScreen')} />
                    <Text style={[styles.menuText, { color: getItemColor('EmotionScreen') }]}>Tonality</Text>
                </View>
            </TouchableWithoutFeedback>
           

            <TouchableWithoutFeedback onPress={() => handlePress('ScreenChart')} onPressIn={() => handleItemPressIn('ScreenChart')} onPressOut={handleItemPressOut}>
                <View style={styles.menuItem}>
                    <MaterialIcons name="schedule" size={24} color={getItemColor('ScreenChart')} />
                    <Text style={[styles.menuText, { color: getItemColor('ScreenChart') }]}>Screen Time</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePress('SearchQueryChart')} onPressIn={() => handleItemPressIn('ScreenChart')} onPressOut={handleItemPressOut}>
                <View style={styles.menuItem}>
                    <MaterialIcons name="schedule" size={24} color={getItemColor('ScreenChart')} />
                    <Text style={[styles.menuText, { color: getItemColor('ScreenChart') }]}>search query</Text>
                </View>
            </TouchableWithoutFeedback> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: 'space-evenly', // Align items evenly horizontally
    },
    menuItem: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    menuText: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
});

export default Menu;
