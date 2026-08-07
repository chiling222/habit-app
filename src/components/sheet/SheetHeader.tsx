import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';

type Props = { title: string; onClose: () => void };

export function SheetHeader({ title, onClose }: Props) {
  return (
    <View style={styles.row}>
      <AppText style={styles.title}>{title}</AppText>
      <Pressable onPress={onClose} hitSlop={8}>
        <Icon name="x" size={20} color={TXT.m} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  title: { fontSize: 18, color: TXT.p },
});
