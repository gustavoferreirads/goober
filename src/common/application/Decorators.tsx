import {VStack} from "@gluestack-ui/themed";
import {scale} from "react-native-size-matters";
import {Line} from "common/ui/Line";
import {Circle} from "common/ui/Circle";
import {Square} from "common/ui/Square";


interface DecoratorsProps{
    size?: number
}
export const Decorators = ({size = scale(80)}: DecoratorsProps) =>{
    return (
        <VStack alignItems="center" justifyContent="center" >
            <Circle size={12} />
            <Line size={size} />
            <Square size={12} />
        </VStack>
    )
}