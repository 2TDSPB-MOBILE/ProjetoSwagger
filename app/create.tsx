import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {Alert,Button,View,Text,StyleSheet,TextInput} from "react-native"

//URL base do Swagger Petstore
const API_BASE = 'https://petstore.swagger.io/v2'

export default function CreatePet(){
    const[namePet,setNamePet]=useState("")
    const router = useRouter()//Hook de navegação

    async function handleCreate(){
        if(!namePet.trim()){
            Alert.alert("Aviso","Digite o nome pet!")
            return
        }
        const newPet = {
            id:Math.floor(Math.random()*1000),
            name:namePet,
            status:"available",
            photoUrls:["https://via.placeholder.com/150"]
        }
        try{
            await axios.post(`${API_BASE}/pet`,newPet,{
                headers:{'Content-Type':'application/json'}
            })
            Alert.alert("Sucesso","Pet criado com sucesso.")
            console.log(newPet)
            router.back()
        }catch(error){
            console.log(error)
            Alert.alert("Erro","Falha ao criar o pet.")
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Criar Novo Pet</Text>
            <TextInput 
                placeholder="Digite o nome do pet" 
                style={styles.input}               
                value={namePet}
                onChangeText={setNamePet}
            />
            <Button title="Criar Pet" onPress={handleCreate}/>
        </View>
    )
}

const styles = StyleSheet.create({
   container:{flex:1,padding:20,backgroundColor:"#fff"},
   title:{fontSize:16,fontWeight:"bold",marginBottom:20},
   input:{borderWidth:1,padding:8,borderRadius:8,marginBottom:10}

})