import { Outlet } from "react-router";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/slice/User.slice";

function App() {
    const dispatch = useDispatch();

    // Persist Login: Check localStorage on app load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default App;