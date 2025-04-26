import { FC, ReactNode } from "react"
import { Fragment } from "react/jsx-runtime"
import { BrowserRouter as BrowserRouterProvider } from 'react-router'
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "@/store";
import { SidebarProvider } from "@/components/ui/sidebar";



export const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (<Fragment>
        <BrowserRouterProvider>
            <ReduxStoreProvider store={store}>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </ReduxStoreProvider>
        </BrowserRouterProvider>
    </Fragment>)
}