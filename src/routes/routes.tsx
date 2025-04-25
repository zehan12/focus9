import { FC, Fragment } from "react";
import { Route, Routes } from "react-router";


export const ApplicationRoutes: FC = () => {
    /**
     *
     *  here are the initial routes that we'll need in our system.
     *
     */
    return (
        <Fragment>
            <Routes>
                <Route index element={<>home</>} />
                <Route path="*" element={<>Not Found</>} />
            </Routes>
        </Fragment>
    );
};

export default ApplicationRoutes;