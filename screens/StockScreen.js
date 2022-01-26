import React, { useState, useEffect } from "react";
import { 
    Button, 
    FlatList, 
    SafeAreaView, 
    StyleSheet,
    View,
} from "react-native";
import Listcard from "../components/Listcard";
import useAuth from "../hooks/useAuth";
import * as data from '../static/data/db.json';
import Constants from "expo-constants";
import Header from "../components/header/headerLoginPage";

export default function StockScreen() {
    const currencies = data.currencies;
    const { logout } = useAuth();
    const [cryptoData,setCrytpoData] = useState({ data : []});
    const a=10;
    
    useEffect(()=> {
        fetch("https://data.messari.io/api/v2/assets?fields=id,symbol,name,metrics/market_data",
        {
            method:"GET",
            headers: { "x-messari-api-key": "9f3cc221-44ec-460a-bf7a-8576d8e6dcf9" }
        }).then(response => response.json())
        .then(jsonResponse => setCrytpoData(jsonResponse))
        .catch(error => console.log(error))
        .finally(() => console.log(cryptoData));
    },[a]);
    
    return (
        <SafeAreaView style={styles.screen}>
            <Header />
            <FlatList 
                data={cryptoData.data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Listcard 
                        title={item.symbol}
                        subTitle={item.name}
                        image={`https://messari.io/asset-images/${item.id}/128.png`}
                        onPress={() => console.log(item)}
                        price={(item.metrics.market_data.price_usd<1.01)?Math.round(item.metrics.market_data.price_usd * 1000000)/1000000:Math.round(item.metrics.market_data.price_usd * 100)/100 }
                        changeRate={Math.round(item.metrics.market_data.percent_change_usd_last_24_hours* 100)/100 }
                    />
                )}
            />
            <View>
                <Button title='Logout' onPress={logout} color={'#0a2351'}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F0F8FF'
    },
});
