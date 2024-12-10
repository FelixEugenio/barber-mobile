import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
export default function Home() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Header />
            <Text>Home</Text>
        </ScrollView>
        </SafeAreaView>
        
    );
}