import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';
import { Sheet } from '../sheet/Sheet';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmRealizeModal({ visible, onCancel, onConfirm }: Props) {
  return (
    <Sheet visible={visible} onClose={onCancel}>
      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Icon name="confetti" size={30} color="#B49FD4" />
        </View>
        <AppText style={styles.title}>蓋上煙火章?</AppText>
        <AppText style={styles.subtitle}>這個夢想就要實現囉!{'\n'}蓋章後會定格慶祝這一刻 ✦</AppText>
      </View>
      <View style={styles.row}>
        <Pressable onPress={onCancel} style={styles.cancelBtn}>
          <AppText style={styles.cancelLabel}>再想想</AppText>
        </Pressable>
        <Pressable onPress={onConfirm} style={styles.confirmBtn}>
          <AppText style={styles.confirmLabel}>實現了!</AppText>
        </Pressable>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', paddingTop: 4 },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFE7F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 18, color: TXT.p },
  subtitle: { fontSize: 14, color: TXT.s, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  row: { flexDirection: 'row', gap: 10, marginTop: 20 },
  cancelBtn: { flex: 1, paddingVertical: 13, borderRadius: 999, backgroundColor: '#F1ECE6', alignItems: 'center' },
  cancelLabel: { fontSize: 16, color: TXT.s },
  confirmBtn: { flex: 1, paddingVertical: 13, borderRadius: 999, backgroundColor: '#B49FD4', alignItems: 'center' },
  confirmLabel: { fontSize: 16, color: '#fff' },
});
