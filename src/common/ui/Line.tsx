import {scale} from "react-native-size-matters";
import {VStack} from "@gluestack-ui/themed";

interface LineProps {
    size?: number;
}
export const Line = ({size = 20}: LineProps) => {
    return (<VStack width={scale(1)}  height={size} style={{ marginVertical: scale(1)}} bg={"$black"} />)

}