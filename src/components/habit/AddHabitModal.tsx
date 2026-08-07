import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PALETTE, TXT } from '../../theme/colors';
import { Icon, IconName } from '../../theme/icons';
import { AppText } from '../AppText';
import { Sheet } from '../sheet/Sheet';
import { SheetConfirmButton } from '../sheet/SheetConfirmButton';
import { SheetHeader } from '../sheet/SheetHeader';
import { SheetInput } from '../sheet/SheetInput';

const ICONS: IconName[] = ['paw', 'droplet', 'book', 'star', 'heart', 'sparkles', 'coffee', 'activity'];

type Props = {
  visible: boolean;
  usedColors: number[];
  onClose: () => void;
  onAdd: (name: string, color: number, icon: IconName) => void;
};

export function AddHabitModal({ visible, usedColors, onClose, onAdd }: Props) {
  const firstFree = PALETTE.findIndex((_, i) => !usedColors.includes(i));
  const defaultColor = firstFree === -1 ? 0 : firstFree;
  const [name, setName] = useState('');
  const [color, setColor] = useState(defaultColor);
  const [icon, setIcon] = useState<IconName>('heart');

  const reset = () => {
    setName('');
    setColor(defaultColor);
    setIcon('heart');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, color, icon);
    reset();
  };

  return (
    <Sheet visible={visible} onClose={handleClose}>
      <SheetHeader title="新增習慣" onClose={handleClose} />
      <SheetInput value={name} onChangeText={setName} placeholder="想養成什麼習慣?" autoFocus />
      <AppText style={styles.label}>選一個顏色</AppText>
      <View style={styles.colorRow}>
        {PALETTE.map((p, i) => (
          <Pressable
            key={p.key}
            onPress={() => setColor(i)}
            style={[styles.colorDot, { backgroundColor: p.stamp }, color === i && styles.colorDotActive]}
          />
        ))}
      </View>
      <AppText style={styles.label}>選一個章</AppText>
      <View style={styles.iconRow}>
        {ICONS.map((ic) => {
          const on = icon === ic;
          return (
            <Pressable
              key={ic}
              onPress={() => setIcon(ic)}
              style={[styles.iconBtn, { backgroundColor: on ? PALETTE[color].soft : '#F5F1EC' }]}
            >
              <Icon name={ic} size={20} color={on ? PALETTE[color].stamp : TXT.m} />
            </Pressable>
          );
        })}
      </View>
      <SheetConfirmButton disabled={!name.trim()} color={PALETTE[color].stamp} label="建立習慣" onPress={handleAdd} />
    </Sheet>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, color: TXT.s, marginTop: 16, marginBottom: 8 },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  colorDot: { width: 34, height: 34, borderRadius: 17, borderWidth: 3, borderColor: 'transparent' },
  colorDotActive: { borderColor: '#5A524D55' },
  iconRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
