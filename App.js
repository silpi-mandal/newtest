import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/component/HomeScreen';
import { LeaguesProvider } from './src/component/LeaguesContext';


export default function App() {
  return (
    <View style={styles.container}>
      <LeaguesProvider>
     <HomeScreen/>
     </LeaguesProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});