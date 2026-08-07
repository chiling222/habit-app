import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AppText } from '../AppText';

type Props = {
  disabled?: boolean;
  color: string;
  label: string;
  onPress: () => void;
};

export function SheetConfirmButton({ disabled, color, label, onPress }: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.btn, { backgroundColor: disabled ? '#E7E0D8' : color, opacity: disabled ? 0.7 : 1 }]}
    >
      <AppText style={styles.label}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { marginTop: 20, paddingVertical: 13, borderRadius: 999, alignItems: 'center' },
  label: { fontSize: 16, color: '#fff' },
});
