import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider';

const data = [
    {
        image: 'https://media.istockphoto.com/id/1308242093/photo/frozen-river.jpg?s=2048x2048&w=is&k=20&c=uQIir0ukA2b9Am1gafQn95oOqrN0V0rRUiM0YJ6O13U=',
        desc: 'Description 1',
    },
    {
        image: 'https://media.istockphoto.com/id/1308242093/photo/frozen-river.jpg?s=2048x2048&w=is&k=20&c=uQIir0ukA2b9Am1gafQn95oOqrN0V0rRUiM0YJ6O13U=',
        desc: 'Description 2',
    },
    {
        image: 'https://media.istockphoto.com/id/1308242093/photo/frozen-river.jpg?s=2048x2048&w=is&k=20&c=uQIir0ukA2b9Am1gafQn95oOqrN0V0rRUiM0YJ6O13U=',
        desc: 'Description 3',
    },
    // Add more items as needed
];
const windowWidth = Dimensions.get('window').width;
const SliderComponent = () => {
    return (
        <View style={styles.container}>
            <Text>Hello Amit</Text>
        
            <FlatListSlider
                data={data}
                width={windowWidth-20}
                height={200}
                timer={5000}
                indicatorActiveWidth={40}
                indicatorStyle={styles.indicator}
                indicatorInActiveColor="#ffffff"
                indicatorActiveColor="#000000"
                indicatorActivePosition="bottom"
                animation
            />
            
    </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        bottom: 10,
    },
});

export default SliderComponent;
