import { FC, ReactNode } from "react"
import { Fragment } from "react/jsx-runtime"
import { BrowserRouter as BrowserRouterProvider } from 'react-router'
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "@/store";



export const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (<Fragment>
        <BrowserRouterProvider>
            <ReduxStoreProvider store={store}>
                {children}
            </ReduxStoreProvider>
        </BrowserRouterProvider>
    </Fragment>)
}