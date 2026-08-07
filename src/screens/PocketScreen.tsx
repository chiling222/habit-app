import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { AddPocketModal } from '../components/pocket/AddPocketModal';
import { CountItemCard } from '../components/pocket/CountItemCard';
import { OnceItemRow } from '../components/pocket/OnceItemRow';
import { PocketEmptyState } from '../components/pocket/PocketEmptyState';
import { PocketProgressHeader } from '../components/pocket/PocketProgressHeader';
import { isPocketComplete, usePocketList } from '../hooks/usePocketList';
import { Icon } from '../theme/icons';

export function PocketScreen() {
  const { items, addItem, toggleOnce, bumpCount } = usePocketList();
  const [showAdd, setShowAdd] = useState(false);
  const year = new Date().getFullYear();

  const completed = useMemo(() => items.filter(isPocketComplete).length, [items]);

  const handleAddItem = (name: string, type: 'once' | 'count', total: number) => {
    addItem(name, type, total);
    setShowAdd(false);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <PocketEmptyState onAdd={() => setShowAdd(true)} />
        <AddPocketModal visible={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAddItem} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <PocketProgressHeader year={year} completed={completed} total={items.length} />
        <View style={styles.list}>
          {items.map((it) =>
            it.type === 'count' ? (
              <CountItemCard key={it.id} item={it} onBump={(delta) => bumpCount(it.id, delta)} />
            ) : (
              <OnceItemRow key={it.id} item={it} onToggle={() => toggleOnce(it.id)} />
            )
          )}
        </View>
        <Pressable onPress={() => setShowAdd(true)} style={styles.addLink}>
          <Icon name="plus" size={17} color="#C99A8B" />
          <AppText style={styles.addLinkLabel}>新增一個小心願</AppText>
        </Pressable>
      </ScrollView>
      <AddPocketModal visible={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAddItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF5EC' },
  scroll: { paddingHorizontal: 14, paddingTop: 18, paddingBottom: 24 },
  list: { marginTop: 14 },
  addLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6 },
  addLinkLabel: { fontSize: 15, color: '#C99A8B' },
});
