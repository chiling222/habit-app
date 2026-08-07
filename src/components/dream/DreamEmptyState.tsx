import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';

type Props = { onAdd: () => void };

export function DreamEmptyState({ onAdd }: Props) {
  return (
    <View style={styles.container}>
      <Icon name="sparkles" size={40} color="#A88FC4" />
      <AppText style={styles.title}>夢想清單還是空的</AppText>
      <AppText style={styles.subtitle}>寫下第一個你嚮往的事吧</AppText>
      <Pressable onPress={onAdd} style={styles.btn}>
        <Icon name="plus" size={16} color="#fff" />
        <AppText style={styles.btnLabel}>寫下一個新夢想</AppText>
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
    backgroundColor: '#B49FD4',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 14,
  },
  btnLabel: { fontSize: 15, color: '#fff' },
});
