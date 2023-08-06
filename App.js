import React, { useState } from 'react';
import TodoScreen from './src/screen/TodoScreen';
import { SafeAreaView, View, Text, StyleSheet} from 'react-native';


const App = () => {
  return (
    <SafeAreaView>
    <View>
      {/* My Todo App*/}
      <TodoScreen />
 
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App