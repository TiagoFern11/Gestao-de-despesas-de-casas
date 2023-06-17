import {StyleSheet} from "react-native"

export const CommonStyles = StyleSheet.create({
    container: {
    flex:1,
    //backgroundColor: '#D8D8D8',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
    },
        title:{
            fontSize: 30
    },
    input: {
        borderRadius: 30,
        height: 30,
        width: 200,
        alignItems: "center",
        borderWidth: 1,
        marginTop: 20,
        textAlign: 'center',
        
        },
    logoImage: {
        height: 200,
        width: 200,
        borderRadius: 100
        },
    Btn: {
        width: 110,
        borderRadius: 25,
        height: 30,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#848484",
        },
        BtnExpense: {
        width: 150,
        borderRadius: 25,
        height: 30,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#848484",
        },
    BtnText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
        },
    error:{
        color: 'red',
        fontSize: 16
    },
    postContainer: {
        backgroundColor: 'white',
        borderWidth:1,
        marginTop:20,
        padding:20,
        width: 800
    },
    houseContainer: {
        backgroundColor: 'white',
        borderWidth:1,
        marginTop:20,
        padding:20,
        position: "relative",
        justifyContent: 'center',
        width: 800
    },
    title: {
        fontWeight:'bold'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    botao:{
        width: 200,
        borderRadius: 25,
        height: 30,
        marginTop: 10,
        backgroundColor: "green",
        alignSelf: "auto",
        //alignSelf: "flex-end",
        alignItems: 'center'

    },
    botao_delete:{
        width: 200,
        borderRadius: 25,
        height: 30,
        marginTop: 10,
        backgroundColor: "red",
        alignSelf: "auto",
        alignItems: 'center'
    },
    BtnText_branco: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        },
    profileImage: {
        height: 200,
        width: 200,
        borderRadius: 100
    },
    title: {
    fontWeight: 'bold',
    fontSize: 30
    },
    
    description: {
    fontSize: 18,
    textAlign: 'justify'
    },
    whiteText: {
    color: 'white',
    fontSize: 16
    }
});


export const styles = StyleSheet.create({
    header: {
    flex: 4
    },
    body: {
    flex: 4,
    backgroundColor: '#D8D8D8',
    padding: 20
   },
    footer: {
    flex: 1,
    flexDirection: 'row'
    }
});

export const bodyStyles = StyleSheet.create({
    description: {
        marginTop: 50
    }
});

export const footerStyles = StyleSheet.create({
    numberContainer: {
        flex: 1,
        backgroundColor: 'steelblue'
    },
    emailContainer: {
        flex: 1,
        backgroundColor: '#21618C'
    }
});