import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'black',
    },
});

interface CircleProps {
    size?: number;
}

export const Circle = ({size = 20}: CircleProps) => <View style={{...styles.circle, width: size, height: size}}/>