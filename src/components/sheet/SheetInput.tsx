import React from 'react';
import { StyleSheet } from 'react-native';
import { TXT } from '../../theme/colors';
import { AppTextInput } from '../AppText';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
};

export function SheetInput({ value, onChangeText, placeholder, autoFocus }: Props) {
  return (
    <AppTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={TXT.m}
      autoFocus={autoFocus}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: '#EAE3DB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: TXT.p,
  },
});
