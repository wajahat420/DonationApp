import React, { Component } from 'react'
import { Text, View ,StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native'

export default class addBio extends Component {

      state = {
            disabled : true,
            maxLength : 160,
            text : "",
            save : "",
            insertBio : false
      }
      onChangeText = (text)=>{
                  this.setState({text,disabled:false})
      }
      render() {
            console.log(this.state.save)
            let showInserBio =  <View style = {styles.AddBio}>
                              <TouchableOpacity onPress={()=>this.setState({insertBio: true})}>
                                    <Text style = {{textAlign:"center" , fontSize : 20 , height : 50,color:'gray'  }}>+Add a Bio</Text>
                              </TouchableOpacity>
                        </View>
           
            if(this.state.insertBio ){
                  showInserBio = <View style={{marginTop:20}}>
                                    <Text style={{marginLeft:"auto",marginRight:25}}>{this.state.text.length}/{this.state.maxLength}</Text>
                                    <TextInput 
                                          multiline
                                          maxLength={this.state.maxLength}
                                          style={{height: 90,borderWidth:1,borderColor:"gray",margin:6,marginBottom:2,borderRadius:10,padding:10}}
                                          onChangeText={text => this.onChangeText(text)}
                                          defaultValue={this.state.text}
                                    />
                                    <View style={{display:"flex",flexDirection:"row"}}>
                                          <View  style={{marginLeft:"auto",marginRight:0,flex:1,padding:20}}>
                                                <Button
                                                      onPress={()=>this.setState({insertBio : false})}
                                                      title="cancle"
                                                      color="#268c77"
                                                      accessibilityLabel="Learn more about this purple button"
                                                />
                                          </View>
                                          <View  style={{flex:1,padding:20}}>
                                                <Button
                                                      disabled={this.state.disabled}
                                                      onPress={()=>this.setState({text:"",save:this.state.text,insertBio:false})}
                                                      title="save"
                                                      color="#268c77"
                                                      accessibilityLabel="Learn more about this purple button"
                                                />
                                          </View>
                                    </View>
                              </View>
            }
            else if(this.state.save.length !== 0){
                  showInserBio =  <View style={{margin:20}}>
                                    <Text style={{textAlign:"center",marginVertical:15,fontSize:16}}>{this.state.save}</Text>
                                    <TouchableOpacity onPress={()=>this.setState({insertBio:true,text:this.state.save})}>
                                          <Text style={{color:"#268c77",textAlign:"center"}}>edit</Text>
                                    </TouchableOpacity>
                              </View>
            }
            return (
                  showInserBio
                  
            )
      }
}
const styles = StyleSheet.create({
      AddBio:{
            textAlign:"center",
            marginTop:100,
      }
           
})
