import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Habit } from '../../hooks/useHabits';
import { PALETTE, fakeBold } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';

type Props = {
  habits: Habit[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onAdd: () => void;
  tabBorderColor: string;
};

export function HabitTabs({ habits, activeIndex, onSelect, onAdd, tabBorderColor }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.row, { borderBottomColor: tabBorderColor }]}
      contentContainerStyle={styles.content}
    >
      {habits.map((h, i) => {
        const p = PALETTE[h.color % PALETTE.length];
        const on = i === activeIndex;
        return (
          <Pressable key={h.id} onPress={() => onSelect(i)} style={[styles.tab, on && { borderBottomColor: p.tab }]}>
            <AppText style={[styles.tabLabel, on ? fakeBold(p.tab) : { color: p.stamp }]}>{h.name}</AppText>
          </Pressable>
        );
      })}
      <Pressable onPress={onAdd} style={styles.addBtn} hitSlop={8}>
        <Icon name="plus" size={18} color="#B7A79F" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexGrow: 0, borderBottomWidth: 1, marginBottom: 14 },
  content: { alignItems: 'center', gap: 18, paddingBottom: 10 },
  tab: { paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabLabel: { fontSize: 16 },
  addBtn: { paddingBottom: 10, marginLeft: 4 },
});
