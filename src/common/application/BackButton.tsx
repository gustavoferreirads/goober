import {ArrowLeftIcon, Fab, FabIcon} from "@gluestack-ui/themed";
import {FloatButton} from "common/ui/FloatButton";

interface BackButton {
    onPress?: () => void
    isVisible: boolean
}
export const BackButton = ({onPress, isVisible = true}: BackButton) => (
    <FloatButton Icon={ArrowLeftIcon} onPress={onPress} isVisible={isVisible}/>
)