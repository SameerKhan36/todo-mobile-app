import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {React, useState} from 'react'
import {IconButton} from 'react-native-paper'
import Fallback from '../components/Fallback';
    

const TodoScreen = () => {
    // Init local states
    const [todo,setTodo] = useState(""); 
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);

    // Handle Add Todo
    const handleAddTodo = () => {
        // Structure of single item
        // {
        //     id:
        //     title:
        // }
        if (todo === "") {
            return;
        }
        setTodoList([...todoList, {id: Date.now().toString(), title: todo}]);
        setTodo("");
    }

    // Handle Delete Todo
    const handleDeleteTodo = (id) => {
        const updatedTodoList = todoList.filter((todo)=> todo.id !== id);
    
        setTodoList(updatedTodoList);
    }

    // Handle Edit Todo
    const handleEditTodo = (todo) => {
        setEditedTodo(todo)
        setTodo(todo.title)
    }

    // Handle Update Todo
    const handleUpdateTodo = () => {
        const updatedTodos = todoList.map((item)=>{
            if(item.id === editedTodo.id) {
                return {...item, title: todo}
            }

            return item;
        })
        setTodoList(updatedTodos);
        setEditedTodo(null);
        setTodo("")
    }

    const handleDeleteAll = () => {
        let itemsCopy = [];
        setTodoList(itemsCopy);
  }

    const renderTodo = ({item,index}) => {
        return (
            <View style={{backgroundColor:"#000", 
            borderRadius:6,
            paddingHorizontal:6,
            paddingVertical:12,
            marginBottom: 12,
            flexDirection:"row",
            alignItems:"center",
            shadowColor:"#000",
            shadowOffset:{width:0, height:2},
            shadowOpacity:0.8,
            shadowRadius:3,
            elevation: 5}}>    
            <Text style={{color:"#FFFFFF", fontSize:20, fontWeight:800, flex:1 }}> {item.title}</Text>
            <IconButton icon="pencil" iconColor='#0AD6A0' onPress={() => handleEditTodo(item)}/>
            <IconButton icon="trash-can" iconColor='#FF0000' onPress={() => handleDeleteTodo(item.id)}/>
            </View>
        )
    }
  return (
    <View style={{marginHorizontal: 16, paddingTop:50}}>
      <TextInput 
      style={{borderWidth:2, 
      borderColor:"#000", 
      borderRadius:6, 
      paddingVertical:6,
      paddingHorizontal:16,
}}
      placeholder='Add a Task...'
      value={todo}
      onChangeText={(userText) => setTodo(userText)}/>

    {
        editedTodo ?   ( <TouchableOpacity style={{
            borderRadius:6,
            backgroundColor: "#0AD6A0",
            paddingVertical:8, 
            marginVertical:34,
            alignItems:"center"
            }}
            onPress={() => handleUpdateTodo()}>
            <Text style={{color:"#FFFFFF", fontWeight:"bold", fontSize:20}}> Save </Text>
          </TouchableOpacity> ) : (
                <TouchableOpacity style={{
                    borderRadius:6,
                    backgroundColor: "#0AD6A0",
                    paddingVertical:8, 
                    marginVertical:34,
                    alignItems:"center"
                    }}
                    onPress={() => handleAddTodo()}>
                    <Text style={{color:"#FFFFFF", fontWeight:"bold", fontSize:20}}> Add </Text>
                  </TouchableOpacity> )
    }

      {/* Render Todo List */}
      <FlatList data={todoList} renderItem={renderTodo}/>
        {
            todoList.length != 0 &&
            <TouchableOpacity style = {{
                borderRadius:6,
                backgroundColor: "#ff0000",
                paddingVertical:8, 
                marginVertical:34,
                alignItems:"center",
                }} onPress={()=>handleDeleteAll()} >
            <Text style = {{color:"#FFFFFF", fontWeight:"bold", fontSize:20}}> Delete All </Text> 
            </TouchableOpacity>
        }
        {
            todoList.length <= 0 && <Fallback />
        }

    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({})