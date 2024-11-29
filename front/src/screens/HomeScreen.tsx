import React, { useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';
interface HomeScreenProps {

}

function HomeScreen({}: HomeScreenProps) {
  useEffect(()=>{
    fetchMM();
    async function fetchMM(){
      const res = await axios.get('http://localhost:3000');
    }
  },[])

  return (
    <View></View>
  )
}

const styles = StyleSheet.create({});

export default HomeScreen;