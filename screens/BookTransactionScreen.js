import React from 'react';
import { Text,View,TouchableOpactiy,TextInput,Image,StyleSheet, TouchableOpacity } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import firebase from 'firebase';
import db from '../config'
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends React.Component {
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedBookId:'',
            scannedStudentId:'',
            buttonState:'normal',
        transactionMessage:'',
        }
    }
    getCameraPermissions = async(id)=>{
        const{status}=await Permissions.askAsync(Permission.CAMERA);
        
        this.setState({
            hasCameraPermissions:status ==='granted',
            buttonState:id,
            scanned:false
        });
    }
    handleBarCodeScanned= async({type,data})=>{
        const {buttonState} = this.state

        if(buttonState==="BookId"){
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        });
    }
    else if(buttonState==="StudentId"){
        this.setState({
            scanned:true,
            scannedStudentId:data,
            buttonState:'normal'
        });

    }

}
handleTransaction=async()=>{
  var transactionMessage=null

}
    render(){
        
const hasCameraPermissions=this.state.hasCameraPermissions;
const scanned =this.state.scanned;
const buttonState = this.state.buttonState;

            if(buttonState !== "normal" && hasCameraPermissions){
                return(
                    <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
                    style = {StyleSheet.absolouteFinObject}
                    />
                );

            }
            else if (buttonState === "normal"){
                return(
                    <View style={styles.container}>
                        

                    <View>
                        <Image 
                        source={require("../assests/booklogo.jpg")}
                        style={{width:200,height:200}}/>
                        <Text style={{textAlign:'center', fontSize:30}}>WILY</Text>
                        
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                            style={styles.inputBox}
                            placeholder="Book Id"
                            value={this.state.scannedBookId}/>
                            <TouchableOpacity
                            style={styles.scanButton}
                            onPress={()=>{
                                this.getCameraPermissions("BookId")

                            }}>
                            <Text style={styles.buttonText}>SCAN</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Student Id"
              value={this.state.scannedStudentId}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("StudentId")
              }}>
              
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpactiy style={styles.submitbutton}
            onPress={async()=>{
              var transactionMessage=await this.handleTransaction()
            }}
            >
              <Text style={styles.submitbuttonText}>SUBMIT</Text>
              

            
              
            </TouchableOpactiy>



          </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitbutton:{
      backroundColor: 'green',
      width: 100,
      height:50
    },
    submitbuttonText:{
      color:'red',
      textalign:'center',
      fontsize:20,
      padding: 10

    }
  });         