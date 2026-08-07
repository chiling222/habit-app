import React, { useState } from 'react';
import { View } from 'react-native';
import { Sheet } from '../sheet/Sheet';
import { SheetConfirmButton } from '../sheet/SheetConfirmButton';
import { SheetHeader } from '../sheet/SheetHeader';
import { SheetInput } from '../sheet/SheetInput';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, note: string) => void;
};

export function AddDreamModal({ visible, onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const reset = () => {
    setName('');
    setNote('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, note.trim());
    reset();
  };

  return (
    <Sheet visible={visible} onClose={handleClose}>
      <SheetHeader title="寫下一個夢想" onClose={handleClose} />
      <SheetInput value={name} onChangeText={setName} placeholder="你最嚮往的那件事…" autoFocus />
      <View style={{ height: 10 }} />
      <SheetInput value={note} onChangeText={setNote} placeholder="一句筆記(選填,例如:存錢中)" />
      <SheetConfirmButton disabled={!name.trim()} color="#B49FD4" label="加入夢想清單" onPress={handleAdd} />
    </Sheet>
  );
}
