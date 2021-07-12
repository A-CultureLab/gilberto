import { useCallback, useContext } from "react"
import { GlobalAlertProps, GlobalConfirmProps, GlobalToastProps, GlobalUIContext } from "../screens"

const useGlobalUi = () => {

    const { setAlert, setConfirm, setToast } = useContext(GlobalUIContext)

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


    return {
        alert,
        confirm,
        toast
    }
}

export default useGlobalUi