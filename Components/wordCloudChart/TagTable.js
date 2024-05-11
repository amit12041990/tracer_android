import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TagSummury = ({ tagValue }) => {
    const pages = tagValue[1];
    const videos = tagValue[2];
    const totalSeconds = tagValue[0];

    function secondsToHoursAndMinutes(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} hr ${minutes} min`;
    }

    const formattedTime = secondsToHoursAndMinutes(totalSeconds);

    return (
        <View style={{backgroundColor:'white',marginTop:5}} >
            <View style={styles.summaryItem}>
                <MaterialIcons name="timer" size={20} color="#3498db" />
                <Text style={styles.summaryText}>Time Spend: {formattedTime}</Text>
            </View>

            <View style={styles.summaryItem}>
                <MaterialIcons name="pages" size={20} color="#3498db" />
                <Text style={styles.summaryText}>URL Visits: {pages}</Text>
            </View>

            <View style={styles.summaryItem}>
                <MaterialIcons name="video-library" size={20} color="#3498db" />
                <Text style={styles.summaryText}>Videos Watched: {videos}</Text>
            </View>

          {/*   <View style={styles.summaryItem}>
                <MaterialIcons name="comment" size={20} color="#3498db" />
                <Text style={styles.summaryText}>Comments Made: 1</Text>
            </View> */}
        </View>
    );
};

const styles = {
    summaryItem: {
        
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        padding: 5,
        backgroundColor:'white',
        marginTop:5
    },
    summaryText: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 5,
        color: '#3498db',
    },
};

export default TagSummury;
