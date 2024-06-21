import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Button, TextInput, SafeAreaView, ScrollView } from "react-native";
import MenuIcon from 'react-native-vector-icons/Entypo';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import { LeaguesContext } from './LeaguesContext';

export default function HomeScreen() {
    const { leagues, addLeague, updateLeague, deleteLeague, info , setInfo, toggleModal2, isModalVisible2 } = useContext(LeaguesContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleEdit = (index) => {
        const leagueToEdit = leagues[index];
        setInfo({ nm: leagueToEdit.title, eml: leagueToEdit.owner?.email });
        setCurrentEdit(index);
        toggleModal();
    };

    const handleUpdate = () => {
        const updatedLeague = { title: info.nm, owner: { email: info.eml } };
        updateLeague(currentEdit, updatedLeague);
        setInfo({ nm: '', eml: '' });
        setCurrentEdit(null);
        toggleModal();
    };

 

    // const handleAdd = () => {
    //     const newLeague = { title: info.nm, members: info.eml };
    //     addLeague(newLeague);
    //     setInfo({ nm: '', eml: '' });
    //     toggleModal2();
    // };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#1f2937"} />
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image source={{ uri: "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" }} style={styles.logo} />
                    <Text style={styles.headerText}>BRACKETOCRACY</Text>
                </View>
                <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png" }} style={styles.profile} />
            </View>
            <TouchableOpacity style={styles.mainMenuButton}>
                <MenuIcon name="menu" size={25} color={"white"} />
                <Text style={styles.mainMenuText}>MAIN MENU</Text>
            </TouchableOpacity>
            <View style={styles.leaguesHeader}>
                <Text style={styles.leaguesHeaderText}>MY LEAGUES</Text>
            </View>
            <ScrollView style={styles.leaguesList}>
                {leagues.map((league, index) => (
                    <View key={index}>
                        <TouchableOpacity style={styles.leagueItem} onPress={() => handleEdit(index)}>
                            <View style={{ flexDirection: 'column', gap: 15 }}>
                                <Text style={styles.leagueText}>{league?.title}</Text>
                                <Text style={styles.leagueText}>{league?.owner?.email}</Text>
                            </View>
                            <View style={styles.leagueActions}>
                                <MenuIcon name="new-message" size={25} />
                                <TouchableOpacity onPress={() => deleteLeague(index)}>
                                    <DeleteIcon name="delete" size={25} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.createButton} onPress={toggleModal2}>
                <Text style={styles.createButtonText}>CREATE NEW LEAGUE</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}
                animationIn="slideInUp"
                animationOut="slideOutUp"
                animationInTiming={2000}
                animationOutTiming={2000}>

                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="League Name"
                        value={info.nm}
                        onChangeText={(text) => setInfo((prevInfo) => ({ ...prevInfo, nm: text }))}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={info.eml}
                        onChangeText={(text) => setInfo((prevInfo) => ({ ...prevInfo, eml: text }))}
                    />
                    <Button title="Update" onPress={handleUpdate} />
                    <Button title="Cancel" onPress={toggleModal} color={'red'} />
                </View>
            </Modal>

            <Modal isVisible={isModalVisible2}
                animationIn="slideInUp"
                animationOut="slideOutUp"
                animationInTiming={2000}
                animationOutTiming={2000}>

                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="League Name"
                        value={info.nm}
                        onChangeText={(text) => setInfo((prevInfo) => ({ ...prevInfo, nm: text }))}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={info.eml}
                        onChangeText={(text) => setInfo((prevInfo) => ({ ...prevInfo, eml: text }))}
                    />
                    <Button title="Add" onPress={addLeague} />
                    <Button title="Cancel" onPress={toggleModal2} color={'red'} />
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        width: '100%',
    },
    header: {
        backgroundColor: '#1f2937',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 15,
        borderBottomWidth: 5,
        borderBottomColor: 'orange'
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 8,
        borderRadius: 25,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 15,
        zIndex: 1,
    },
    mainMenuButton: {
        flexDirection: 'row',
        backgroundColor: '#ca8a04',
        paddingVertical: 8,
        marginTop: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        position: 'absolute',
        top: '8%',
        alignSelf: 'center',
        width: '60%'
    },
    mainMenuText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    leaguesHeader: {
        backgroundColor: '#1f2937',
        paddingVertical: 15,
        marginTop: 30,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    leaguesHeaderText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    leaguesList: {
        marginTop: 16,
        flex: 1,
    },
    leagueItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 8,
        width: '90%',
        alignSelf: 'center',
    },
    leagueText: {
        fontSize: 16,
    },
    leagueActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 25,
    },
    createButton: {
        backgroundColor: '#ca8a04',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        width: '50%',
        alignSelf: 'flex-end',
        marginRight: 12,
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
});
