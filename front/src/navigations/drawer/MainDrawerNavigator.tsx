// navigation/DrawerNavigation.tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import InitialScreen from '../../screens/calendar/InitialScreen';
import eventStore from '../../stores/eventStore';
import { useEffect } from 'react';
import useEventStore from '../../stores/eventStore';
import { mainNavigations } from '../../constants';
import { View } from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import useAuth from '@/hooks/queries/useAuth';

export type MainDrawerParamList = {
  [mainNavigations.INITIAL_CALENDAR]: undefined;
  Home: undefined;
};
const Drawer = createDrawerNavigator<MainDrawerParamList>();

const MainDrawerNavigator = () => {
  const fetchAllEvents = useEventStore(state => state.fetchAllEvents);

  useEffect(() => {}, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        headerStyle: { backgroundColor: 'white' },
        sceneStyle: { backgroundColor: 'white' },
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name={mainNavigations.INITIAL_CALENDAR}
        options={{
          headerShown: false, // 기본 헤더 숨기기
        }}
        component={InitialScreen}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
