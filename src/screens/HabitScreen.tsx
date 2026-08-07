import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { AddHabitModal } from '../components/habit/AddHabitModal';
import { CalendarGrid } from '../components/habit/CalendarGrid';
import { HabitEmptyState } from '../components/habit/HabitEmptyState';
import { HabitTabs } from '../components/habit/HabitTabs';
import { MonthNav } from '../components/habit/MonthNav';
import { StatsRow } from '../components/habit/StatsRow';
import { useHabits } from '../hooks/useHabits';
import { PALETTE, TXT } from '../theme/colors';
import { IconName } from '../theme/icons';
import { startOfDay } from '../utils/date';

export function HabitScreen() {
  const { habits, addHabit, toggleStamp, batchStamp } = useHabits();
  const today = startOfDay(new Date());
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() + 1 });
  const [batchMode, setBatchMode] = useState(false);
  const [anchor, setAnchor] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const safeIndex = Math.min(activeIndex, Math.max(habits.length - 1, 0));
  const habit = habits[safeIndex];
  const palette = PALETTE[habit ? habit.color % PALETTE.length : 0];

  const monthCount = useMemo(() => {
    if (!habit) return 0;
    const prefix = `${view.y}-${view.m}-`;
    return habit.stamps.filter((k) => k.startsWith(prefix)).length;
  }, [habit, view]);

  const totalCount = habit ? habit.stamps.length : 0;

  const changeMonth = (delta: number) => {
    setView((v) => {
      let m = v.m + delta;
      let y = v.y;
      if (m < 1) {
        m = 12;
        y -= 1;
      } else if (m > 12) {
        m = 1;
        y += 1;
      }
      return { y, m };
    });
  };

  const onSelectHabit = (i: number) => {
    setActiveIndex(i);
    setBatchMode(false);
    setAnchor(null);
  };

  const resetToCurrentMonth = () => setView({ y: today.getFullYear(), m: today.getMonth() + 1 });

  const onCellPress = (day: number) => {
    if (!habit) return;
    const cd = startOfDay(new Date(view.y, view.m - 1, day));
    if (cd > today) return;
    if (!batchMode) {
      toggleStamp(habit.id, view.y, view.m, day);
      return;
    }
    if (anchor == null) {
      setAnchor(day);
      return;
    }
    const lo = Math.min(anchor, day);
    const hi = Math.max(anchor, day);
    batchStamp(habit.id, view.y, view.m, lo, hi);
    setAnchor(null);
    setBatchMode(false);
  };

  const handleAddHabit = (name: string, color: number, icon: IconName) => {
    const newIndex = habits.length;
    addHabit(name, color, icon);
    setActiveIndex(newIndex);
    setBatchMode(false);
    setAnchor(null);
    setShowAdd(false);
    resetToCurrentMonth();
  };

  if (habits.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: PALETTE[0].bg }]}>
        <HabitEmptyState onAdd={() => setShowAdd(true)} />
        <AddHabitModal visible={showAdd} usedColors={[]} onClose={() => setShowAdd(false)} onAdd={handleAddHabit} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: palette.bg }]}>
      <HabitTabs
        habits={habits}
        activeIndex={safeIndex}
        onSelect={onSelectHabit}
        onAdd={() => setShowAdd(true)}
        tabBorderColor={`${palette.tab}22`}
      />
      <MonthNav
        year={view.y}
        month={view.m}
        tabColor={palette.tab}
        stampColor={palette.stamp}
        batchMode={batchMode}
        anchor={anchor}
        onPrev={() => changeMonth(-1)}
        onNext={() => changeMonth(1)}
        onToggleBatch={() => {
          setBatchMode((b) => !b);
          setAnchor(null);
        }}
      />
      <CalendarGrid
        habit={habit}
        palette={palette}
        viewYear={view.y}
        viewMonth={view.m}
        today={today}
        batchMode={batchMode}
        anchor={anchor}
        onCellPress={onCellPress}
      />
      <StatsRow monthCount={monthCount} totalCount={totalCount} />
      <AppText style={styles.hint}>點今天蓋章 · 點過去的日子可補蓋或取消</AppText>
      <AddHabitModal
        visible={showAdd}
        usedColors={habits.map((h) => h.color)}
        onClose={() => setShowAdd(false)}
        onAdd={handleAddHabit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 14, paddingTop: 18, paddingBottom: 20 },
  hint: { marginTop: 12, fontSize: 12, color: TXT.m, textAlign: 'center' },
});
