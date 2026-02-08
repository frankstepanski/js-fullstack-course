type UserCardProps = {
    name: string;
    role: "admin" | "user";
};

export default function UserCard({ name, role }: UserCardProps) {

    return (
        <section>
            <h2>{name}</h2>
            <p>Role: {role}</p>
        </section>
    );
}