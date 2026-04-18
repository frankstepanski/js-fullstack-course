type HeaderProps = {
    onLogout: () => void;
};

export default function Header({ onLogout }: HeaderProps) {

    return (
        <header>
            <h1>Dashboard</h1>
            <button onClick={onLogout}>Logout</button>
        </header>
    );
}