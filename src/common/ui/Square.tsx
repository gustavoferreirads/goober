import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    square: {
        width: 20,
        height: 20,
        backgroundColor: 'black',
    },
});

interface SquareProps {
    size?: number;
}


export  const Square = ({size = 20}: SquareProps)=> <View style={{...styles.square, width: size, height: size}}/>