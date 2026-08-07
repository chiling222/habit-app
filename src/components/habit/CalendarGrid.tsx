import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Habit } from '../../hooks/useHabits';
import { PaletteColor, STAMP_ROTATIONS, TXT, fakeBold } from '../../theme/colors';
import { Icon } from '../../theme/icons';
import { dateKey, startOfDay } from '../../utils/date';
import { AppText } from '../AppText';
import { StampPop } from '../StampPop';

const WEEK = ['日', '一', '二', '三', '四', '五', '六'];

type Props = {
  habit: Habit;
  palette: PaletteColor;
  viewYear: number;
  viewMonth: number;
  today: Date;
  batchMode: boolean;
  anchor: number | null;
  onCellPress: (day: number) => void;
};

export function CalendarGrid({ habit, palette, viewYear, viewMonth, today, batchMode, anchor, onCellPress }: Props) {
  const monthDays = new Date(viewYear, viewMonth, 0).getDate();
  const firstDow = new Date(viewYear, viewMonth - 1, 1).getDay();
  const startDate = startOfDay(new Date(habit.start.y, habit.start.m - 1, habit.start.d));

  return (
    <View>
      <View style={styles.weekRow}>
        {WEEK.map((w) => (
          <AppText key={w} style={styles.weekLabel}>
            {w}
          </AppText>
        ))}
      </View>
      <View style={styles.grid}>
        {Array.from({ length: firstDow }).map((_, i) => (
          <View key={`b${i}`} style={styles.cell} />
        ))}
        {Array.from({ length: monthDays }).map((_, i) => {
          const day = i + 1;
          const cd = startOfDay(new Date(viewYear, viewMonth - 1, day));
          const isToday = cd.getTime() === today.getTime();
          const isFuture = cd > today;
          const stamped = habit.stamps.includes(dateKey(viewYear, viewMonth, day));
          const preStart = cd < startDate;
          const selecting = batchMode && anchor === day;
          const rotation = STAMP_ROTATIONS[day % STAMP_ROTATIONS.length];

          let content: React.ReactNode;
          if (selecting) {
            content = (
              <View style={[styles.selectCircle, { backgroundColor: palette.stamp }]}>
                <AppText style={styles.selectDay}>{day}</AppText>
              </View>
            );
          } else if (preStart && !stamped) {
            content = <AppText style={styles.faintDay}>{day}</AppText>;
          } else if (stamped) {
            content = (
              <>
                <AppText style={[styles.dayNumber, fakeBold(TXT.strong)]}>{day}</AppText>
                <StampPop rotation={rotation}>
                  <Icon name={habit.icon} size={31} color={palette.stamp} />
                </StampPop>
              </>
            );
          } else if (isToday) {
            content = (
              <>
                <AppText style={[styles.dayNumber, fakeBold(TXT.strong)]}>{day}</AppText>
                <View style={[styles.todayCircle, { borderColor: palette.today }]}>
                  <AppText style={[styles.todayLabel, { color: palette.tab }]}>今天</AppText>
                </View>
              </>
            );
          } else if (isFuture) {
            content = <AppText style={styles.faintDay}>{day}</AppText>;
          } else {
            content = (
              <>
                <AppText style={[styles.dayNumber, fakeBold(TXT.strong)]}>{day}</AppText>
                <AppText
                  style={[styles.jiayou, { color: palette.stamp, transform: [{ rotate: `${rotation}deg` }] }]}
                >
                  加油
                </AppText>
              </>
            );
          }

          return (
            <Pressable key={day} style={styles.cell} onPress={() => onCellPress(day)} disabled={isFuture}>
              {content}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weekRow: { flexDirection: 'row', marginBottom: 6 },
  weekLabel: { flex: 1, textAlign: 'center', fontSize: 13, color: TXT.p },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dayNumber: { position: 'absolute', top: 2, left: 4, fontSize: 12 },
  faintDay: { fontSize: 13, color: TXT.p },
  selectCircle: { width: '86%', height: '86%', borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  selectDay: { fontSize: 15, fontWeight: '700', color: '#fff' },
  todayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayLabel: { fontSize: 11 },
  jiayou: { fontSize: 13, opacity: 0.4 },
});
