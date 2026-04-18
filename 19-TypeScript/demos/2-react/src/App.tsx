import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export type User = {
name: string;
role: "admin" | "user";
};


export default function App() {
    const [user, setUser] = useState<User | null>(null);

    return user ? (
            <Dashboard user={user} onLogout={() => setUser(null)} />
        ) : (
            <Login onLogin={setUser} />
    );
}
