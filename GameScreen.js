// GameScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const generateCards = (rows, columns) => {
  const totalCards = rows * columns;
  let numbers = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
  numbers = [...numbers, ...numbers];
  return numbers.sort(() => Math.random() - 0.5);
};

const GameScreen = () => {
  const route = useRoute();
  const { rows, columns } = route.params;
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    startNewGame();
  }, [rows, columns]);

  const startNewGame = () => {
    setCards(generateCards(rows, columns));
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const flipCard = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index) || flippedCards.includes(index)) return;
    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first] === cards[second]) {
        setMatchedCards([...matchedCards, first, second]);
      }
      setTimeout(() => setFlippedCards([]), 700); // Set timeout to 0.7 seconds
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      Alert.alert('Congratulations', 'You won the game!', [
        {
          text: 'New game',
          onPress: startNewGame,
        },
        {
          text: 'Go back',
          onPress: () => navigation.navigate('HomeScreen'),
        },
      ]);
    }
  }, [matchedCards]);

  const renderCardContent = (index) => {
    if (matchedCards.includes(index)) {
      return 'X';
    } else if (flippedCards.includes(index)) {
      return cards[index];
    } else {
      return '?';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playing Game</Text>
      <View style={styles.grid(rows, columns)}>
        {cards.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card(flippedCards.includes(index) || matchedCards.includes(index))}
            onPress={() => flipCard(index)}
          >
            <Text style={styles.cardText}>{renderCardContent(index)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Reset" onPress={startNewGame} />
      <Button title="Back to home" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: (rows, columns) => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: columns * 60,
    margin: 'auto',
  }),
  card: (flipped) => ({
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: flipped ? 'yellow' : 'green',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GameScreen;
