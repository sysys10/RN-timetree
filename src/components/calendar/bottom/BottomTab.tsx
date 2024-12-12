import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TabType } from '../../../constants';

interface BottomTabProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

function BottomTab({ activeTab, setActiveTab }: BottomTabProps) {
  const tabs = ['일정', '메모', '작성', '알림', '설정', '공유'];

  return (
    <View style={styles.bottomTabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
          onPress={() => setActiveTab(tab as any)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabItem: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default BottomTab;
