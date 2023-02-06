import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <section className="App max-h-screen max-w-screen m-8">
            <Outlet />
        </section>

    )
}