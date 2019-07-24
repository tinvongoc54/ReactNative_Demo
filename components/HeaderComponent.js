import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { COLOR_TEXT_INPUT, COLOR_BLUE_MEDIUM } from './colors';

const HeaderComponent = props => {
    const { title, showAddTodoList, hasAddButton, hasSortButton, sort, sortState, hasDeleteButton } = props
    return (
        <View style={styles.container}>
            { hasAddButton && 
                <TouchableOpacity style={styles.addButton} onPress={ showAddTodoList }>
                    <Image style={styles.addButtonImage} source={require('../imgs/plus.png')}/>
                </TouchableOpacity> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: COLOR_BLUE_MEDIUM,
        height: 50
    },
    addButton: {
        marginRight: 10,
    },
    addButtonImage: {
        width: 20,
        height: 20,
        tintColor: 'white'
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 50
    }
})

export default HeaderComponent