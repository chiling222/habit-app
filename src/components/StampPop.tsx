import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type Props = { rotation: number; children: React.ReactNode };

export function StampPop({ rotation, children }: Props) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scale.setValue(0);
    Animated.spring(scale, {
      toValue: 1,
      friction: 4.5,
      tension: 160,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  return (
    <Animated.View style={{ transform: [{ scale }, { rotate: `${rotation}deg` }] }}>
      {children}
    </Animated.View>
  );
}
