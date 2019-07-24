import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Alert,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  COLOR_BACKGROUND,
  COLOR_BLUE_MEDIUM,
  COLOR_FACEBOOK,
  COLOR_GOOGLE,
  COLOR_TEXT_INPUT,
} from './colors';

import realm, { queryAllTodoList } from '../databases/allSchemas';
import Swipeout from 'react-native-swipeout';
import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';

//Database
import { insertNewTodoList, updateTodoList, deleteAllTodoList } from '../databases/allSchemas';

let FlatListItem = props => {
    const { itemIndex, id, name, creationdate, popupDialogComponent, onPressItem } = props

    showEditMotal = () => {

    }

    showDeleteComfirm = () => {
        Alert.alert(
            'Delete',
            'Delete a todoList',
            [
                {
                    text: 'No', onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {

                    }
                }
            ],
            { cancleable: true }
        )
    }

    return (
        <Swipeout right={[
            {
                text: 'Edit',
                backgroundColor: COLOR_BLUE_MEDIUM,
                onPress: showEditMotal
            }, 
            {
                text: 'Delete',
                backgroundColor: COLOR_GOOGLE,
                onPress: showDeleteComfirm
            }
        ]} autoClose={true}>
            <TouchableOpacity onPress={onPressItem}>
                <View style={{ backgroundColor: itemIndex % 2 == 0 ? '#111111' : '#333333' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10 }}>{this.name}</Text>
                    <Text style={{ fontSize: 18, margin: 10 }} numberOfLine={2}>{this.creationdate}</Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    )
}

export default class TodoList extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            id: 0, 
            isAddNew: true,
            todoName: "",
            todoList: []
        }
        this.reloadData()
        realm.addListener('change', () => {
            this.reloadData()
        })
    }

    reloadData = () => {
        queryAllTodoList().then((todoList) => {
            this.setState({ todoList })
        }) .catch((error) => {
            this.setState({ todoList: [] })
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <HeaderComponent  
                    style={styles.header}
                    title={"Todo List"}
                    hasAddButton={true}
                    showAddTodoList={() => {
                        this.popupDialogComponent.bind(this)
                        this.popupDialogComponent.showPopupDialogAdd()
                    }}
                    />
                
                <View style={styles.formInput}>
                    <TextInput style={styles.textInput} onChangeText={text => {this.setState({todoName: text})}} value={this.state.todoName}></TextInput>
                    <View style={styles.buttonContainter}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.todoName.trim == "") {
                                alert("Please enter to do name")
                            } else {
                                const newTodoList = {
                                    id: Math.floor(Date.now() / 1000),
                                    name: this.state.todoName,
                                    creationDate: new Date() 
                                }
                                insertNewTodoList(newTodoList).then().catch((error) => {
                                    alert(`Insert new TodoList failed ${error}`)
                                })
                            }
                        }}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            alert("Clear")
                            deleteAllTodoList().then().catch((error) => {
                                alert(`Delete failed ${error}`)
                            })
                        }}>
                            <Text style={styles.text}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList 
                    style={styles.flatList} 
                    data={this.state.todoList}
                    renderItem={({ item, index }) => 
                        <FlatListItem 
                            { ...item } 
                            itemIndex={index} 
                            onPressItem={() => { alert('You pressed item')}} 
                            popupDialogComponent={this.refs.popupDialogComponent} />}
                    keyExtractor={item => item.id}
                    />
                <PopupDialogComponent ref={"popupDialogComponent"} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: COLOR_BACKGROUND
    },
    flatList: {
    },
    formInput: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainter: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    button: {
        flex: 1,
        height: 30,
        backgroundColor: COLOR_BLUE_MEDIUM,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: 'white'
    },
    textInput: {
        height: 40,
        width: 340,
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 5,
        margin: 10,
        paddingLeft: 10,
        paddingBottom: 0,
        paddingTop: 0, 
        paddingRight: 10,
        color: 'white'
    }
})