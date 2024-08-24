
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import rectangle from '../../assets/rectangle.png';

interface LegendProps {
  identifiers: string[];
  identifierColors: string[];
}

const Legend: React.FC<LegendProps> = ({ identifiers, identifierColors }) => {
  if (identifiers.length !== identifierColors.length) {
    return null; // Ensure that identifiers and colors arrays are of the same length
  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.textTitle}>Legend</Text>
        {identifiers.map((value, ind) => (
          <View key={ind} style={styles.item}>
            <Image
              source={rectangle}
              style={[styles.image, { tintColor: identifierColors[ind] }]}
            />
            <Text style={styles.text}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Legend;

const styles = StyleSheet.create({
  container: {
    width: 150,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 2,
    borderColor: '#424242',
  },
  list: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 10,
    width: 40,
    borderWidth: 2,
    borderColor: '#424242',
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
