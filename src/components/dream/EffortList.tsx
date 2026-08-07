import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Effort } from '../../hooks/useDreams';
import { TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText, AppTextInput } from '../AppText';

type Props = {
  efforts: Effort[];
  onToggle: (effortId: string) => void;
  onAdd: (text: string) => void;
};

export function EffortList({ efforts, onToggle, onAdd }: Props) {
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState('');

  const submit = () => {
    const trimmed = text.trim();
    if (trimmed) onAdd(trimmed);
    setText('');
    setAdding(false);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.heading}>為了這個夢想的努力</AppText>
      {efforts.map((e) => (
        <Pressable key={e.id} onPress={() => onToggle(e.id)} style={styles.row}>
          <View style={[styles.checkbox, e.done ? styles.checkboxDone : styles.checkboxEmpty]}>
            {e.done && <Icon name="check" size={14} color="#fff" />}
          </View>
          <AppText style={[styles.effortText, { color: e.done ? TXT.p : TXT.s }]}>{e.text}</AppText>
        </Pressable>
      ))}
      {adding ? (
        <View style={styles.addRow}>
          <AppTextInput
            autoFocus
            value={text}
            onChangeText={setText}
            onSubmitEditing={submit}
            placeholder="要做的努力…"
            placeholderTextColor={TXT.m}
            style={styles.input}
          />
          <Pressable onPress={submit} style={styles.addBtn}>
            <AppText style={styles.addBtnLabel}>加</AppText>
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={() => setAdding(true)} style={styles.addLink}>
          <Icon name="plus" size={16} color="#B49FD4" />
          <AppText style={styles.addLinkLabel}>再加一個努力</AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, borderTopWidth: 1, borderTopColor: '#EBE2E8', borderStyle: 'dashed', paddingTop: 12 },
  heading: { fontSize: 14, color: '#7A736D', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 9 },
  checkbox: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: '#8FBBA9' },
  checkboxEmpty: { borderWidth: 2, borderColor: '#DFD3C6' },
  effortText: { fontSize: 15 },
  addRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  input: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1.5,
    borderColor: '#E1D9EF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: TXT.p,
  },
  addBtn: { backgroundColor: '#B49FD4', borderRadius: 10, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  addBtnLabel: { fontSize: 14, color: '#fff' },
  addLink: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  addLinkLabel: { fontSize: 14, color: '#B49FD4' },
});
