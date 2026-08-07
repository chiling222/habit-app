import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { AddDreamModal } from '../components/dream/AddDreamModal';
import { ConfirmRealizeModal } from '../components/dream/ConfirmRealizeModal';
import { DreamCard } from '../components/dream/DreamCard';
import { DreamEmptyState } from '../components/dream/DreamEmptyState';
import { useDreams } from '../hooks/useDreams';
import { TXT } from '../theme/colors';
import { Icon } from '../theme/icons';

export function DreamScreen() {
  const { dreams, addDream, setPhoto, addEffort, toggleEffort, realizeDream } = useDreams();
  const [showAdd, setShowAdd] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleAddDream = (name: string, note: string) => {
    addDream(name, note);
    setShowAdd(false);
  };

  if (dreams.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <DreamEmptyState onAdd={() => setShowAdd(true)} />
        <AddDreamModal visible={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAddDream} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <AppText style={styles.title}>夢想清單 ✦</AppText>
        <AppText style={styles.subtitle}>慢慢努力,總會靠近的那些嚮往</AppText>
        {dreams.map((dream) => (
          <DreamCard
            key={dream.id}
            dream={dream}
            onPhotoPicked={(uri) => setPhoto(dream.id, uri)}
            onToggleEffort={(effortId) => toggleEffort(dream.id, effortId)}
            onAddEffort={(text) => addEffort(dream.id, text)}
            onRequestRealize={() => setConfirmId(dream.id)}
          />
        ))}
        <Pressable onPress={() => setShowAdd(true)} style={styles.addLink}>
          <Icon name="plus" size={17} color="#A88FC4" />
          <AppText style={styles.addLinkLabel}>寫下一個新夢想</AppText>
        </Pressable>
      </ScrollView>
      <AddDreamModal visible={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAddDream} />
      <ConfirmRealizeModal
        visible={confirmId != null}
        onCancel={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId) realizeDream(confirmId);
          setConfirmId(null);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F2F6' },
  scroll: { paddingHorizontal: 14, paddingTop: 18, paddingBottom: 24 },
  title: { fontSize: 20, color: TXT.p },
  subtitle: { fontSize: 14, color: TXT.s, marginTop: 4, marginBottom: 14 },
  addLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6 },
  addLinkLabel: { fontSize: 15, color: '#A88FC4' },
});
