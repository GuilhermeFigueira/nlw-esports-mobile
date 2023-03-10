import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FlatList, Image, Text } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { Background } from "../../components/background";

import { GameParams } from "../../@types/navigation";
import { TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
	const [duos, setDuos] = useState<DuoCardProps[]>([]);
	const [discordDuoSelected, setDiscordDuoSelected] = useState("");

	const Route = useRoute();
	const game = Route.params as GameParams;
	const navigation = useNavigation();

	function handleGoBack() {
		navigation.goBack();
	}

	async function getDiscordUser(adsId: string) {
		fetch(`http://192.168.15.44:3333/ads/${adsId}/discord`)
			.then((reponse) => reponse.json())
			.then((data) => setDiscordDuoSelected(data.discord));
	}

	useEffect(() => {
		fetch(`http://192.168.15.44:3333/games/${game.id}/ads`)
			.then((reponse) => reponse.json())
			.then((data) => setDuos(data));
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo
							name="chevron-thin-left"
							size={20}
							color={THEME.COLORS.CAPTION_300}
						/>
					</TouchableOpacity>
					<Image source={logoImg} style={styles.logo} />
					<View style={styles.right} />
				</View>

				<Image
					source={{ uri: game.bannerUrl }}
					style={styles.cover}
					resizeMode="cover"
				/>
				<Heading
					title={game.title}
					subtitle="Conecte-se e comece a jogar!"
				/>
				<FlatList
					horizontal
					data={duos}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<DuoCard
							data={item}
							onConnect={() => getDiscordUser(item.id)}
						/>
					)}
					style={[
						duos.length > 0
							? styles.containerList
							: styles.emptyListContent,
					]}
					contentContainerStyle={styles.contentList}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => (
						<Text style={styles.emptyListText}>
							N??o h?? an??ncios publicados ainda
						</Text>
					)}
				/>
				<DuoMatch
					onClose={() => setDiscordDuoSelected("")}
					visible={discordDuoSelected.length > 0}
					discord={discordDuoSelected}
				/>
			</SafeAreaView>
		</Background>
	);
}
