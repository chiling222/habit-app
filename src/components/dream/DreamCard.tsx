import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Dream } from '../../hooks/useDreams';
import { TXT } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { AppText } from '../AppText';
import { StampPop } from '../StampPop';
import { DreamBadge } from './DreamBadge';
import { EffortList } from './EffortList';
import { PhotoPicker } from './PhotoPicker';

type Props = {
  dream: Dream;
  onPhotoPicked: (uri: string) => void;
  onToggleEffort: (effortId: string) => void;
  onAddEffort: (text: string) => void;
  onRequestRealize: () => void;
};

export function DreamCard({ dream, onPhotoPicked, onToggleEffort, onAddEffort, onRequestRealize }: Props) {
  const done = dream.efforts.filter((e) => e.done).length;
  const pct = dream.realized ? 100 : dream.efforts.length ? Math.round((done / dream.efforts.length) * 100) : 0;

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={dream.gradient as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {Platform.OS === 'web' ? (
          <DreamBadge />
        ) : (
          <PhotoPicker dreamId={dream.id} photoUri={dream.photoUri} locked={dream.realized} onPicked={onPhotoPicked} />
        )}
        <View style={styles.headerText}>
          <AppText style={styles.name}>{dream.name}</AppText>
          {!!dream.note || dream.realized ? (
            <AppText style={styles.note}>
              {dream.note}
              {dream.realized ? ' · 已實現 ✦' : ''}
            </AppText>
          ) : null}
        </View>
        {dream.realized && (
          <View style={styles.confettiBadgeWrap}>
            <StampPop rotation={-10}>
              <View style={styles.confettiBadge}>
                <Icon name="confetti" size={18} color="#E0A93C" />
                <AppText style={styles.confettiLabel}>實現</AppText>
              </View>
            </StampPop>
          </View>
        )}
      </LinearGradient>

      {!dream.realized && (
        <View style={styles.body}>
          <View style={styles.progressRow}>
            <AppText style={styles.progressLabel}>朝夢想前進</AppText>
            <AppText style={styles.progressCount}>已跨出 {done} 步</AppText>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${pct}%` }]} />
          </View>

          <EffortList efforts={dream.efforts} onToggle={onToggleEffort} onAdd={onAddEffort} />

          <Pressable onPress={onRequestRealize} style={styles.realizeBtn}>
            <Icon name="confetti" size={16} color="#7A5EA0" />
            <AppText style={styles.realizeLabel}>我實現了!</AppText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, position: 'relative' },
  headerText: { flex: 1, minWidth: 0 },
  name: { fontSize: 18, color: TXT.p },
  note: { fontSize: 13, color: '#6E655E', marginTop: 4 },
  confettiBadgeWrap: { position: 'absolute', top: 10, right: 12 },
  confettiBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,.92)',
    borderWidth: 2,
    borderColor: '#E0A93C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confettiLabel: { fontSize: 9, color: '#E0A93C', lineHeight: 11 },
  body: { padding: 14 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 13, color: TXT.s },
  progressCount: { fontSize: 13, color: '#A88FC4' },
  track: { height: 8, borderRadius: 4, backgroundColor: '#EAE3EF', overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#B49FD4' },
  realizeBtn: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: '#EFE7F5',
  },
  realizeLabel: { fontSize: 15, color: '#7A5EA0' },
});
