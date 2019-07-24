import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import {
  COLOR_BACKGROUND,
  COLOR_BLUE_MEDIUM,
  COLOR_FACEBOOK,
  COLOR_GOOGLE,
  COLOR_TEXT_INPUT,
} from './colors';

import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';

//Database
import { insertNewTodoList, updateTodoList } from '../databases/allSchemas';

export default class PopupDialogComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0, 
            name: '',
            isAddNew: true
        }
    }

    showPopupDialogAdd = () => {
        this.refs.popupDialogComponent.show()
        this.setState({
            dialogTitle: "Add new TodoList",
            name: "",
            isAddNew: true
        })
    }

    onPressSave() {
        // if (this.state.name.trim == "") {
        //     alert("Please enter TodoList name")
        //     return
        // }
        // this.refs.popupDialogComponent.dismiss(() => {
        //     if (this.state.isAddNew == true) {
        //         const newTodoList = {
        //             id: Math.floor(Date.now() / 1000),
        //             name: this.state.name,
        //             creationDate: new Date()
        //         }
        //         insertNewTodoList(newTodoList).then().catch((error) => {
        //             alert(`Insert new TodoList failed ${error}`)
        //         })
        //     } else {
                
        //     }
        // })
    }

    render() {
        const { dialogTitle } = this.state
        return (
            <PopupDialog 
                dialogTitle={<DialogTitle title={dialogTitle}/>}
                width={0.8} height={180}
                ref={"popupDialogComponent"}
            >
                <View style={styles.container}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Enter TodoList name" 
                        autoCorrect={false} 
                        onChangeText={(text) => this.setState({name: text})}
                        value={this.state.name}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.button} onPress={this.onPressSave()}>
                            <Text style={styles.textLabel}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textLabel}>Cancle</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
            </PopupDialog>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        padding: 10,
        margin: 10,
        borderColor: COLOR_TEXT_INPUT,
        borderWidth: 1
    },
    button: {
        backgroundColor: COLOR_BACKGROUND,
        padding: 10,
        margin: 10
    },
    textLabel: {
        color: COLOR_TEXT_INPUT,
        fontSize: 18
    }
})