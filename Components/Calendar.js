// components/Calendar.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default function Calendar({ onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Button title="Prev" onPress={handlePrevMonth} color={'tomato'}/>
        <Text style={{fontSize:18,fontWeight:'bold'}}>{currentMonth.format('MMMM YYYY')}</Text>
        <Button title="Next" onPress={handleNextMonth} color={'tomato'}/>
      </View>
    );
  };

  const renderWeekDays = () => {
    const weekDays = moment.weekdaysShort();
    return (
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>
    );
  };

  const renderWeeks = () => {
    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');
    const weeks = [];
    let date = startOfMonth.clone().startOf('week');

    while (date.isBefore(endOfMonth.clone().endOf('week'))) {
      weeks.push(renderWeek(date.clone()));
      date.add(1, 'week');
    }

    return <View>{weeks}</View>;
  };

  const renderWeek = (startDate) => {
    const days = [];
    let date = startDate;

    for (let i = 0; i < 7; i++) {
      days.push(renderDay(date.clone()));
      date.add(1, 'day');
    }

    return <View style={styles.week} key={startDate.format('MM-DD-YYYY')}>{days}</View>;
  };

  const renderDay = (date) => {
    const isCurrentMonth = date.month() === currentMonth.month();
    const isSelected = selectedDate && selectedDate.isSame(date, 'day');
    const dayStyles = [styles.day];

    // Only render the day if it belongs to the current month
    if (isCurrentMonth) {
      if (isSelected) {
        dayStyles.push(styles.selectedDay);
      }

      return (
        <TouchableOpacity
          style={dayStyles}
          key={date.format('DDMMYYYY')}
          onPress={() => {
            setSelectedDate(date);
            onDateSelect(date.toDate());
          }}
        >
          <Text style={styles.dayText}>{date.date()}</Text>
        </TouchableOpacity>
      );
    } else {
      // Render an empty View for days not in the current month
      return <View style={styles.emptyDay} key={date.format('DDMMYYYY')} />;
    }
  };

  return (
    <View style={styles.calendarContainer}>
      {renderHeader()}
      {renderWeekDays()}
      {renderWeeks()}
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  weekDayText: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  day: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  otherMonthDay: {
    backgroundColor: 'lightgray',
  },
  selectedDay: {
    backgroundColor: 'orange',
  },
  dayText: {
    fontSize: 16,
  },
  emptyDay: {
    width: 40,
    height: 40,
  },
});
