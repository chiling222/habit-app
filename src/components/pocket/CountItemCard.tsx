import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PocketCountItem } from '../../hooks/usePocketList';
import { STAMP_ROTATIONS, TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';
import { StampPop } from '../StampPop';

type Props = {
  item: PocketCountItem;
  onBump: (delta: number) => void;
};

export function CountItemCard({ item, onBump }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <AppText style={styles.name}>{item.name}</AppText>
        <AppText style={styles.count}>
          {item.done} / {item.total}
        </AppText>
      </View>
      <View style={styles.starsRow}>
        {Array.from({ length: item.total }).map((_, i) =>
          i < item.done ? (
            <View key={i} style={styles.starFilled}>
              <StampPop rotation={STAMP_ROTATIONS[i % STAMP_ROTATIONS.length]}>
                <Icon name="star" size={14} color="#fff" filled />
              </StampPop>
            </View>
          ) : (
            <View key={i} style={styles.starEmpty} />
          )
        )}
      </View>
      <View style={styles.btnRow}>
        <Pressable onPress={() => onBump(-1)} style={styles.minusBtn} hitSlop={4}>
          <Icon name="minus" size={16} color="#C77E67" />
        </Pressable>
        <Pressable onPress={() => onBump(1)} style={styles.plusBtn} hitSlop={4}>
          <Icon name="star" size={15} color="#fff" />
          <AppText style={styles.plusLabel}>蓋一個星星</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  name: { fontSize: 16, color: TXT.p },
  count: { fontSize: 14, color: '#E3937F' },
  starsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  starFilled: {
    width: 27,
    height: 27,
    borderRadius: 999,
    backgroundColor: '#E3937F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starEmpty: { width: 27, height: 27, borderRadius: 999, borderWidth: 1.5, borderColor: '#E0D5C8', borderStyle: 'dashed' },
  btnRow: { flexDirection: 'row', gap: 8 },
  minusBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F3E2DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBtn: {
    flex: 1,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#E9A48C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  plusLabel: { fontSize: 14, color: '#fff' },
});
