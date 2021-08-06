import { useCallback, useContext } from "react"
import { GlobalAlertProps, GlobalConfirmProps, GlobalSelectBottomSheetProps, GlobalToastProps, GlobalUIContext } from "../screens"

const useGlobalUi = () => {

    const { setAlert, setConfirm, setToast, setSelector } = useContext(GlobalUIContext)

    const alert = useCallback((p: Omit<GlobalAlertProps, 'visible'>) => {
        setAlert({
            ...p,
            visible: true
        })
    }, [])

    const confirm = useCallback((p: Omit<GlobalConfirmProps, 'visible'>) => {
        setConfirm({
            ...p,
            visible: true
        })
    }, [])

    const toast = useCallback((p: Omit<GlobalToastProps, 'visible'>, duration = 2000) => {
        setToast({
            ...p,
            visible: true
        })
        setTimeout(() => {
            setToast({ ...p, visible: false })
        }, duration)
    }, [])

    const selector = useCallback((p: Omit<GlobalSelectBottomSheetProps, 'visible'>) => {
        setSelector({
            selectedDataIndex: undefined,
            closeToSelect: false,
            ...p,
            visible: true,
        })
    }, [])


    return {
        alert,
        confirm,
        toast,
        selector
    }
}

export default useGlobalUi