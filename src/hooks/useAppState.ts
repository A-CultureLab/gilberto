import { useEffect, useState } from "react"
import { AppState, AppStateStatus } from "react-native"


const useAppState = () => {

    const [appState, setAppState] = useState<AppStateStatus>('active')

    useEffect(() => {
        // Appstate listner
        const appstateListner: any = AppState.addEventListener('change', (state) => setAppState(state))

        return () => {
            appstateListner.remove()
        }
    }, [])

    return { appState }
}

export default useAppState