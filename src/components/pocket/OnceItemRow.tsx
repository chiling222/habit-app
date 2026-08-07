import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PocketOnceItem } from '../../hooks/usePocketList';
import { TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';
import { StampPop } from '../StampPop';

type Props = {
  item: PocketOnceItem;
  onToggle: () => void;
};

export function OnceItemRow({ item, onToggle }: Props) {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <View style={[styles.checkbox, item.done ? styles.checkboxDone : styles.checkboxEmpty]}>
        {item.done && <Icon name="check" size={17} color="#fff" />}
      </View>
      <AppText style={styles.name}>{item.name}</AppText>
      {item.done && (
        <StampPop rotation={-8}>
          <View style={styles.doneStamp}>
            <AppText style={styles.doneLabel}>完成</AppText>
          </View>
        </StampPop>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  checkbox: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: '#8FBBA9' },
  checkboxEmpty: { borderWidth: 2, borderColor: '#DFD3C6' },
  name: { fontSize: 16, color: TXT.p, flex: 1 },
  doneStamp: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#D07A5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneLabel: { fontSize: 12, color: '#D07A5E', lineHeight: 14 },
});
