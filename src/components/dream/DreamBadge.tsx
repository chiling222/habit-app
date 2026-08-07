import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '../../theme/icons';
import { StampPop } from '../StampPop';

export function DreamBadge() {
  return (
    <View style={styles.box}>
      <StampPop rotation={-8}>
        <Icon name="sparkles" size={28} color="rgba(255,255,255,.95)" />
      </StampPop>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,.35)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
