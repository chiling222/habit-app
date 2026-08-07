import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TXT } from '../../theme/colors';
import { AppText } from '../AppText';

type Props = { monthCount: number; totalCount: number };

export function StatsRow({ monthCount, totalCount }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <AppText style={styles.label}>本月完成</AppText>
        <AppText style={styles.value}>
          {monthCount} <AppText style={styles.unit}>天</AppText>
        </AppText>
      </View>
      <View style={styles.card}>
        <AppText style={styles.label}>累積完成</AppText>
        <AppText style={styles.value}>
          {totalCount} <AppText style={styles.unit}>次</AppText>
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, marginTop: 16 },
  card: { flex: 1, backgroundColor: 'rgba(255,255,255,.55)', borderRadius: 12, padding: 12, alignItems: 'center' },
  label: { fontSize: 13, color: TXT.s },
  value: { fontSize: 23, color: TXT.p, marginTop: 2 },
  unit: { fontSize: 14, color: TXT.m },
});
