import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {Alert, Button,StyleSheet, Text,TextInput,View} from "react-native"

const API_BASE = 'https://petstore.swagger.io/v2'

export default function UpdatePet(){
    const[id,setId]=useState("")
    const[newName,setNewName]=useState("")
    const router = useRouter()

    //PUT - Atualizar o pet existente
    const handleUpdate = async()=>{
        if(!id || !newName){
            Alert.alert("Aviso","Preencha todos os campos.")
            return
        }

        const updatePet = {
            id:Number(id),
            name:newName,
            status:"available",
            photoUrls:["https://via.placeholder.com/150"]
        }

        try{
            await axios.put(`${API_BASE}/pet`,updatePet,{
                headers:{'Content-Type':'application/json'}
            })
            Alert.alert("Sucesso","Pet atualizado com sucesso.")
            router.back()
        }catch(error){
            console.log(error)
            Alert.alert("Erro","Falha ao atualizar pet.")
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar PET</Text>
            <TextInput 
                placeholder="ID do PET"
                style={styles.input}
                value={id}
                onChangeText={setId}
                keyboardType="numeric"
            />
            <TextInput 
                placeholder="Novo nome do pet"
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
            />
            <Button title="Atualizar" onPress={handleUpdate}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1,padding:20,backgroundColor:"#fff"},
    title:{fontSize:22,fontWeight:"bold", marginBottom:20},
    input:{
        borderWidth:1,
        padding:8,
        borderRadius:8,
        marginBottom:10,        
        borderColor:"#ccc"
    }
})