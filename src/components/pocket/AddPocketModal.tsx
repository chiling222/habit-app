import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';
import { Sheet } from '../sheet/Sheet';
import { SheetConfirmButton } from '../sheet/SheetConfirmButton';
import { SheetHeader } from '../sheet/SheetHeader';
import { SheetInput } from '../sheet/SheetInput';

type ItemType = 'once' | 'count';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, type: ItemType, total: number) => void;
};

export function AddPocketModal({ visible, onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<ItemType>('once');
  const [total, setTotal] = useState(10);

  const reset = () => {
    setName('');
    setType('once');
    setTotal(10);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, type, total);
    reset();
  };

  return (
    <Sheet visible={visible} onClose={handleClose}>
      <SheetHeader title="新增小心願" onClose={handleClose} />
      <SheetInput value={name} onChangeText={setName} placeholder="今年想完成的小事…" autoFocus />
      <View style={styles.typeRow}>
        {(
          [
            ['once', '做一次就好'],
            ['count', '要累積數量'],
          ] as const
        ).map(([value, label]) => {
          const on = type === value;
          return (
            <Pressable
              key={value}
              onPress={() => setType(value)}
              style={[styles.typeBtn, { backgroundColor: on ? '#F5DDE3' : '#F5F1EC' }]}
            >
              <AppText style={[styles.typeLabel, { color: on ? '#C15E7C' : TXT.s }]}>{label}</AppText>
            </Pressable>
          );
        })}
      </View>
      {type === 'count' && (
        <View style={styles.stepperRow}>
          <Pressable onPress={() => setTotal((t) => Math.max(2, t - 1))} style={styles.stepBtn}>
            <Icon name="minus" size={16} color="#C77E67" />
          </Pressable>
          <AppText style={styles.stepValue}>{total} 個</AppText>
          <Pressable onPress={() => setTotal((t) => Math.min(30, t + 1))} style={styles.stepBtn}>
            <Icon name="plus" size={16} color="#C77E67" />
          </Pressable>
        </View>
      )}
      <SheetConfirmButton disabled={!name.trim()} color="#E9A48C" label="加入清單" onPress={handleAdd} />
    </Sheet>
  );
}

const styles = StyleSheet.create({
  typeRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  typeBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  typeLabel: { fontSize: 14 },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 14, justifyContent: 'center' },
  stepBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F3E2DB', alignItems: 'center', justifyContent: 'center' },
  stepValue: { fontSize: 20, color: TXT.p, minWidth: 60, textAlign: 'center' },
});
