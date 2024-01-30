import { Fab, FabIcon} from "@gluestack-ui/themed";
import React from "react";

interface FloatButtonProps {
    onPress?: ()=> void
    isVisible: boolean
    Icon: any
}

export const FloatButton = ({onPress, isVisible = true, Icon }: FloatButtonProps) => {
    if(!isVisible) return;
    return (
        <Fab
            size="lg"
            bg="$white"
            zIndex={99999999}
            marginTop={"$8"}
            sx={{":active": { bg: "$warmGray200" }}}
            placement="top left"
            onPress={onPress}>

            <FabIcon as={Icon} color="black" size="xl" />

        </Fab>
    )
}