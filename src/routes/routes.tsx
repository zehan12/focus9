import { HomeLayout } from "@/layouts";
import { LoginPage, DashboardSlot, PurchaseQuotationStandardSlot, NotFoundPage } from "@/screens";
import { FC, Fragment } from "react";
import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTES } from "@/constants";


export const ApplicationRoutes: FC = () => {
    /**
     *
     *  here are the initial routes that we'll need in our system.
     *
     */
    return (
        <Fragment>
            <Routes>
                <Route element={
                    <ProtectedRoute>
                        <HomeLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<DashboardSlot />} />
                    <Route path="/inventory/transactions/purchases/quotations-standard" element={<PurchaseQuotationStandardSlot />} />
                </Route>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Fragment>
    );
};

export default ApplicationRoutes;