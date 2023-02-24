import React from 'react';
import { Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/background';

export function Home() {
  const [games, setGames] = useState<GameCardProps[] >([]);

  const navigation = useNavigation();
  function handleOpenGame({id, title, bannerUrl}: GameCardProps ){
    navigation.navigate('game',{id, title, bannerUrl});
  }

  useEffect(() =>{
    fetch('http://192.168.15.44:3333/games')
    .then(reponse => reponse.json())
    .then(data => setGames(data))
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg}
        style={styles.logo}
        />

        <Heading 
        title="Encontre o seu duo!"
        subtitle="Selecione o game e comece a jogar..."
        />
        <FlatList 
        contentContainerStyle={styles.contentList}
        data={games} 
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard
            onPress={() => handleOpenGame(item)}
            data={item}
          ></GameCard>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  );
}