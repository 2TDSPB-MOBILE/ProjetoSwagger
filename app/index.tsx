import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";

//URL base do Swagger Petstore
const API_BASE = 'https://petstore.swagger.io/v2'

//Interface (tipagem)
interface Pet {
  id: number
  name: string
  status: 'available' | 'pending' | 'sold'
}

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([])
  const router = useRouter()

  //GET - Buscar os pets disponíveis
  const fetchPets = async () => {
    try {
      const response = await axios.get<Pet[]>(`${API_BASE}/pet/findByStatus`, {
        params: { status: 'available' }
      })
      setPets(response.data)
    } catch (error) {
      console.log("Error ao buscar os pets: ", error)
      Alert.alert("Erro", "Falha ao buscar pets")
    }
  }

  //Buscar os pets na inicialização do App
  useEffect(() => {
    fetchPets()
  }, [])


  return (
    <View
      style={styles.container}
    >
      <View style={{alignItems:'center'}}>
        <Text style={styles.title}> LISTA DE PETS 🦤</Text>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>ID:{item.id}</Text>
            <Text>Nome:{item.name}</Text>
            <Text>Status:{item.status}</Text>
          </View>

        )}
      />

      <View style={styles.buttons}>
        <Button title="Criar Pet" />
        <Button title="Atualizar Pet" />
        <Button title="Deletar Pet" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#c5c5c5ff'
  },
  card: {
    backgroundColor: '#ffffffff',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
  },
  buttons: {
    marginTop: 20,
    gap: 10
  },
  title: {
    fontSize: 35, fontWeight: 'bold'
  }
})
