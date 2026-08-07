import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TXT, fakeBold } from '../../theme/colors';
import { AppText } from '../AppText';

type Props = { year: number; completed: number; total: number };

export function PocketProgressHeader({ year, completed, total }: Props) {
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return (
    <View>
      <AppText style={[styles.title, fakeBold(TXT.strong)]}>{year} 口袋清單 ✿</AppText>
      <AppText style={styles.subtitle}>
        今年想完成的小事 · 已完成 {completed} / {total}
      </AppText>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20 },
  subtitle: { fontSize: 14, color: TXT.s, marginTop: 4 },
  track: { marginTop: 10, height: 8, borderRadius: 4, backgroundColor: '#EDE3D6', overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#E8A6B0' },
});
