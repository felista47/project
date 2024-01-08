import { useAuthentication } from './authentication';
import UserStack from './navigation/userStack';
import AuthStack from './navigation/authStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
}