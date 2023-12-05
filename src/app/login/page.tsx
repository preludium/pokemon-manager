import { ExternalWrapper } from '#/components/external-wrapper';
import { LoginForm } from './form';
  
export default function Login() {
    return (
        <ExternalWrapper title='Login'>
            <LoginForm />
        </ExternalWrapper>
    );
}