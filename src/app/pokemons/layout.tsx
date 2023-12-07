import { InternalWrapper } from '#/components/internal-wrapper';
import { Props } from '#/types';

export default function PokemonsLayout({ children }: Props) {
    return (
        <InternalWrapper>{children}</InternalWrapper>
    );
}
