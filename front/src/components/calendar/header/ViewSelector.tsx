import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../constants/colors';
import { ViewType } from '../../../type/calendar';
import { VIEW_OPTIONS } from '../../../constants';

interface ViewSelectorProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  view: ViewType;
  setView: (view: ViewType) => void;
}

const ViewSelector = ({
  selectedDate,
  setSelectedDate,
  view,
  setView,
}: ViewSelectorProps) => {
  return (
    <View style={styles.viewSelector}>
      {VIEW_OPTIONS.map(option => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.viewButton,
            view === option.view && styles.selectedViewButton,
          ]}
          onPress={() => setView(option.view)}
        >
          <Text
            style={[
              styles.viewButtonText,
              view === option.view && styles.selectedViewText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const styles = StyleSheet.create({
  viewSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  viewButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  selectedViewButton: {
    backgroundColor: colors.BLUE_500,
  },
  viewButtonText: {
    color: '#666',
    fontSize: 14,
  },
  selectedViewText: {
    color: colors.WHITE,
  },
});

export default ViewSelector;
