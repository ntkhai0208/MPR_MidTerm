// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(4);
  const navigation = useNavigation();

  const renderRadioButtonGroup = (label, value, setValue, range) => (
    <View style={styles.radioGroupContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioGroup}>
        {range.map((val) => (
          <View key={val} style={styles.radioButtonContainer}>
            <RadioButton
              value={val}
              status={value === val ? 'checked' : 'unchecked'}
              onPress={() => setValue(val)}
              color="#f39c12"
            />
            <Text style={styles.radioLabel}>{val}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>CARDS FLIP GAME</Text>
        <Text style={styles.instructionsTitle}>INSTRUCTIONS</Text>
        <Text style={styles.instructions}>
          Click the green cards to see what number they uncover and try to find the matching number underneath the other cards.
        </Text>
        <Text style={styles.instructions}>
          Uncover two matching numbers in a row to eliminate them from the game.
        </Text>
        <Text style={styles.instructions}>
          Eliminate all cards as fast as you can to win the game. Have fun FLIPing!
        </Text>
        <Text style={styles.subtitle}>SELECT BOARD SIZE</Text>
        {renderRadioButtonGroup('ROWS NUMBER:', rows, setRows, Array.from({ length: 8 }, (_, i) => i + 2))}
        {renderRadioButtonGroup('COLUMNS NUMBER:', columns, setColumns, Array.from({ length: 3 }, (_, i) => i + 2))}
        <View style={styles.buttonContainer}>
          <Button title="Play Game" onPress={() => navigation.navigate('GameScreen', { rows, columns })} color="#b71c1c" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#ecf0f1',
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  radioGroupContainer: {
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
    color: '#ffffff',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;
