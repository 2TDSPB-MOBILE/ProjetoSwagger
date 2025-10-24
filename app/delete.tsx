import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert,Button, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
const API_BASE = 'https://petstore.swagger.io/v2'

export default function DeletePet() {
    const [id, setId] = useState("")
    const router = useRouter()

    const handleDelete = async () => {
        if(!id){
            Alert.alert("Aviso","Informe o id do pet a ser deletado.")
            return
        }
        try{
            await axios.delete(`${API_BASE}/pet/${id}`,{
                headers:{'Content-Type':'application/json'}
            })
            Alert.alert("Sucesso","Pet deletado com sucesso.")
            router.back()//Volta para a tela index
        }catch(error){
            console.log(error)
            Alert.alert("Erro","Erro ao deletar do pet.")
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deletar PET</Text>
            <TextInput
                placeholder="ID do PET"
                style={styles.input}
                value={id}
                onChangeText={setId}
                keyboardType="numeric"
            />

            <Button title="Deletar" onPress={handleDelete}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    input: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: "#ccc"
    }
})