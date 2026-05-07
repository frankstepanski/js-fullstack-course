type LoginProps = {
    onLogin: (user: { name: string; role: "admin" | "user" }) => void;
};

export default function Login({ onLogin }: LoginProps) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.username.value;

    if (!name) return;

    onLogin({ name, role: "user" });
}

return (
    <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="username" placeholder="Username" />
        <button>Login</button>
    </form>
    );
}