import React, {useState} from "react";
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    Button,
    ButtonGroup,
    ButtonText,
    CloseIcon,
    Heading,
    Icon,
    Text
} from "@gluestack-ui/themed";


interface CancelRideProps {
    onCancel: ()=> void;
}
export const CancelRide = ({onCancel}: CancelRideProps) => {
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    return (
        <>
            <Button onPress={() => setShowAlertDialog(true)} variant="outline" action="secondary" borderRadius="$full" >
                <ButtonText>Cancel Ride</ButtonText>
            </Button>

            <AlertDialog
                isOpen={showAlertDialog}
                onClose={() => {
                    setShowAlertDialog(false)
                }}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading size="lg">Are you sure you want to cancel your trip?</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="sm">
                            Cancelling now may incur a small fee to compensate the driver for their time and effort.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <ButtonGroup space="lg">
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={() => { setShowAlertDialog(false); onCancel(); }}
                            >
                                <ButtonText>Yes</ButtonText>
                            </Button>
                            <Button
                                bg="black"
                                action="negative"
                                onPress={() => { setShowAlertDialog(false) }}
                            >
                                <ButtonText>No, Keep Trip</ButtonText>
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
