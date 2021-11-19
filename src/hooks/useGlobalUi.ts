import { useCallback, useContext } from "react"
import { GlobalAlertProps, GlobalConfirmProps, GlobalSelectProps, GlobalToastProps, GlobalUIContext } from "../wrappers/GlobalUiWrapper"

const useGlobalUi = () => {

    const { setAlert, setConfirm, setToast, setSelect } = useContext(GlobalUIContext)

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

    const select = useCallback((p: Omit<GlobalSelectProps, 'visible'>) => {
        setSelect({
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
        select
    }
}

export default useGlobalUi