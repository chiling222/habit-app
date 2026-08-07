import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TXT, fakeBold } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';

type Props = {
  year: number;
  month: number;
  tabColor: string;
  stampColor: string;
  batchMode: boolean;
  anchor: number | null;
  onPrev: () => void;
  onNext: () => void;
  onToggleBatch: () => void;
};

export function MonthNav({ year, month, tabColor, stampColor, batchMode, anchor, onPrev, onNext, onToggleBatch }: Props) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onPrev} hitSlop={8}>
        <Icon name="chevron-left" size={18} color={tabColor} />
      </Pressable>
      <AppText style={[styles.label, fakeBold(TXT.strong)]}>
        {year} 年 {month} 月
      </AppText>
      <Pressable onPress={onNext} hitSlop={8}>
        <Icon name="chevron-right" size={18} color={tabColor} />
      </Pressable>
      <Pressable onPress={onToggleBatch} style={styles.batchBtn} hitSlop={8}>
        <AppText style={[styles.batchLabel, fakeBold(batchMode ? stampColor : tabColor)]}>
          {batchMode ? (anchor == null ? '點起點…' : '點終點蓋滿') : '補蓋一段'}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 12, position: 'relative' },
  label: { fontSize: 16 },
  batchBtn: { position: 'absolute', right: 2 },
  batchLabel: { fontSize: 12 },
});
