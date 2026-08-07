import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';

type Props = { onAdd: () => void };

export function HabitEmptyState({ onAdd }: Props) {
  return (
    <View style={styles.container}>
      <Icon name="calendar-heart" size={40} color="#D8A793" />
      <AppText style={styles.title}>還沒有任何習慣</AppText>
      <AppText style={styles.subtitle}>從一件想每天做到的小事開始吧</AppText>
      <Pressable onPress={onAdd} style={styles.btn}>
        <Icon name="plus" size={16} color="#fff" />
        <AppText style={styles.btnLabel}>新增第一個習慣</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 32 },
  title: { fontSize: 18, color: TXT.p, marginTop: 6 },
  subtitle: { fontSize: 14, color: TXT.s, textAlign: 'center' },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DB8A70',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 14,
  },
  btnLabel: { fontSize: 15, color: '#fff' },
});
