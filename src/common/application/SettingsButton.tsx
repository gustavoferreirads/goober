import {SettingsIcon} from "@gluestack-ui/themed";
import {FloatButton} from "common/ui/FloatButton";

interface SettingsButtonProps {
    onPress?: () => void
    isVisible: boolean
}

export const SettingsButton = ({onPress, isVisible = true}: SettingsButtonProps) => (
    <FloatButton Icon={SettingsIcon} onPress={onPress} isVisible={isVisible}/>
)