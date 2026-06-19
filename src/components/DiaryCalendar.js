/*
  --- COMPONENT: DiaryCalendar ---
  A simple calendar view for the Food Diary.

  --- Calendar Logic ---
  We calculate the days in the current month and which day of the week
  the month starts on. Days with logged meals are highlighted in green.
  Users can navigate between months using arrow buttons and tap a day
  to view entries for that date.
*/

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DiaryCalendar({
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  selectedDate,
  datesWithEntries,
}) {
  // Calculate days in the month and the starting day of week
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Build array of day numbers with leading blanks for alignment
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  // Format date string for comparison (YYYY-MM-DD)
  const formatDate = (day) => {
    const m = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  };

  return (
    <View style={styles.container}>
      {/* Month navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onPrevMonth} style={styles.arrow}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {MONTHS[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity onPress={onNextMonth} style={styles.arrow}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Day of week headers */}
      <View style={styles.row}>
        {DAYS.map((day) => (
          <Text key={day} style={styles.dayHeader}>{day}</Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <View key={`blank-${index}`} style={styles.dayCell} />;
          }

          const dateStr = formatDate(day);
          const hasEntry = datesWithEntries.includes(dateStr);
          const isSelected = selectedDate === dateStr;

          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayCell,
                hasEntry && styles.hasEntry,
                isSelected && styles.selected,
              ]}
              onPress={() => onSelectDate(dateStr)}
            >
              <Text
                style={[
                  styles.dayText,
                  hasEntry && styles.hasEntryText,
                  isSelected && styles.selectedText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e4d8f0",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  arrow: { padding: 8 },
  arrowText: { fontSize: 18, color: "#5b2d8e" },
  monthTitle: { fontSize: 18, fontWeight: "700", color: "#5b2d8e" },
  row: { flexDirection: "row", marginBottom: 8 },
  dayHeader: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  dayText: { fontSize: 14, color: "#2d1050" },
  hasEntry: { backgroundColor: "#dff3ea" },
  hasEntryText: { color: "#1f8a5c", fontWeight: "600" },
  selected: { backgroundColor: "#5b2d8e" },
  selectedText: { color: "#ffffff", fontWeight: "700" },
});
