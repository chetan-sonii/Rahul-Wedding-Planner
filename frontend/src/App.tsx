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

        // Check if storedUser exists and is not the string "undefined"
        if (storedUser && storedUser !== "undefined") {
            try {
                const parsedUser = JSON.parse(storedUser);
                dispatch(setUser(parsedUser));
            } catch (error) {
                console.error("Corrupted user data found in storage, clearing it.", error);
                // If JSON is invalid, clear it to prevent the crash Loop
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } else if (storedUser === "undefined") {
            // Cleanup invalid "undefined" string if it exists
            localStorage.removeItem("user");
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