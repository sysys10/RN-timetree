import AuthStackNavigator from '../stack/AuthStackNavigation';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '../../hooks/queries/useAuth';

function RootNavigator() {
  const { isLogin } = useAuth();
  console.log(isLogin);

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
