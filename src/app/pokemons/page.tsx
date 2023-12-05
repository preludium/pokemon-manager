import { LoginButton, LogoutButton } from '#/components/buttons';

export default async function Pokemons() {
    return (
        <div>
            Pokemons
            <LoginButton />
            <LogoutButton />
        </div>
    );
}
