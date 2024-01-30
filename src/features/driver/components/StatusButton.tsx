import {Box, Fab, HStack, Icon, MenuIcon, SettingsIcon, Text} from "@gluestack-ui/themed";
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {Status} from "types/dto/status";
import {scale} from "react-native-size-matters";


interface StatusButtonProps {
    onPress: () => void
    isVisible: boolean
    status: Status
}

export const StatusButton = ({status, onPress, isVisible = true}: StatusButtonProps) => {
    if (!isVisible) return;

    return (
        <>
            <Fab
                bg={status === Status.ONLINE ? "$red500" : "$blue500"}
                width={scale(70)}
                height={scale(70)}
                zIndex={9999}
                sx={{":active": {bg: "$warmGray200"}}}
                placement="bottom center"
                mb={scale(80)}

                onPress={onPress}>

                <Box borderColor="white" borderWidth={0.5} p="$2" borderRadius={"$full"} width={scale(50)}
                     justifyContent="center"
                     alignItems="center"
                     height={scale(50)}>
                    {status === Status.ONLINE && (<IconAwesome name="power-off" size={30} color="white" key="power"/>)}
                    {status === Status.OFFLINE && (<Text size="2xl" color="white" bold> GO </Text>)}
                </Box>
            </Fab>

            {status === Status.OFFLINE && (
                <HStack bg="white"
                        width="100%"
                        position="absolute"
                        px={"$4"} pt="$5" pb="$8"
                        justifyContent={"space-between"}
                        alignItems="center">
                    <Icon as={MenuIcon} m="$2" w="$6" h="$6"/>
                    <Text size="2xl" bold>
                        You're offline
                    </Text>
                    <Icon as={SettingsIcon} m="$2" w="$6" h="$6"/>
                </HStack>
            )}
        </>
    )
}