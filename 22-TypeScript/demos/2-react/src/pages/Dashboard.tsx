import type { User } from "../App";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import StatsPanel from "../components/StatsPanel";

type DashboardProps = {
    user: User;
    onLogout: () => void;
};

export default function Dashboard({ user, onLogout }: DashboardProps) {

    return (
        <div>
            <Header onLogout={onLogout} />
            <UserCard name={user.name} role={user.role} />
            <StatsPanel />
        </div>
    );
}