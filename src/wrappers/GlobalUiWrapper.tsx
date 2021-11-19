import React from 'react'
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { createContext, useMemo, useState } from "react"
import Alert, { AlertProps } from "../components/bottomSheets/Alert"
import Confirm, { ConfirmProps } from "../components/bottomSheets/Confirm"
import Select, { SelectProps } from "../components/bottomSheets/Select"
import Toast, { ToastProps } from "../components/toasts/Toast"

export type GlobalAlertProps = Omit<AlertProps, 'onClose'>
export type GlobalConfirmProps = Omit<ConfirmProps, 'onClose'>
export type GlobalToastProps = ToastProps
export type GlobalSelectProps = Omit<SelectProps, 'onClose'>

export type GlobalUiContextType = {
    alert: GlobalAlertProps,
    setAlert: (p: GlobalAlertProps) => void
    confirm: GlobalConfirmProps
    setConfirm: (p: GlobalConfirmProps) => void
    toast: GlobalToastProps
    setToast: (p: GlobalToastProps) => void
    select: GlobalSelectProps
    setSelect: (p: GlobalSelectProps) => void
}

export const GlobalUIContext = createContext<GlobalUiContextType>({} as any)

// Global UI & 로그인 처리
const GlobalUiWrapper: React.FC = ({ children }) => {


    const [alert, setAlert] = useState<GlobalAlertProps>({
        visible: false,
        content: '',
        title: '',
        buttonText: undefined
    })
    const [confirm, setConfirm] = useState<GlobalConfirmProps>({
        visible: false,
        title: '',
        content: ''
    })
    const [toast, setToast] = useState<GlobalToastProps>({
        visible: false,
        content: ''
    })

    const [select, setSelect] = useState<GlobalSelectProps>({
        visible: false,
        list: [],
        onSelect: () => { },
        selectedDataIndex: undefined,
        closeToSelect: false
    })


    const contextValue = useMemo<GlobalUiContextType>(() => ({
        alert,
        setAlert,
        confirm,
        setConfirm,
        toast,
        setToast,
        select,
        setSelect
    }), [alert, setAlert, confirm, setConfirm, toast, setToast, select, setSelect])


    return (
        <>
            <GlobalUIContext.Provider value={contextValue} >
                <BottomSheetModalProvider>
                    {children}
                    <Alert
                        {...alert}
                        onClose={() => setAlert(v => ({ ...v, visible: false }))}
                    />
                    <Confirm
                        {...confirm}
                        onClose={() => setConfirm(v => ({ ...v, visible: false }))}
                    />
                    <Toast
                        {...toast}
                    />
                    <Select
                        {...select}
                        onClose={() => setSelect(v => ({ ...v, visible: false }))}
                    />
                </BottomSheetModalProvider>
            </GlobalUIContext.Provider>
        </>
    )
}

export default GlobalUiWrapper