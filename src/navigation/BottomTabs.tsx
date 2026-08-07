import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { Icon, IconName } from '../theme/icons';
import { TAB_COLORS } from '../theme/colors';

export type TabKey = 'habit' | 'pocket' | 'dream';

const TABS: { key: TabKey; label: string; icon: IconName; color: string }[] = [
  { key: 'habit', label: '習慣', icon: 'calendar-heart', color: TAB_COLORS.habit },
  { key: 'pocket', label: '口袋', icon: 'list-check', color: TAB_COLORS.pocket },
  { key: 'dream', label: '夢想', icon: 'sparkles', color: TAB_COLORS.dream },
];

type Props = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
};

export function BottomTabs({ active, onChange }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 9) }]}>
      {TABS.map((tab) => {
        const on = tab.key === active;
        const color = on ? tab.color : TAB_COLORS.inactive;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <Icon name={tab.icon} size={22} color={color} />
            <AppText style={[styles.label, { color }]}>{tab.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEE7DE',
    backgroundColor: '#FFFDF9',
    paddingTop: 9,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 11, marginTop: 1 },
});
