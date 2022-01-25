import React, { Component } from 'react'
import axios from'axios';

export default class UserCard extends Component {
    
    state={
        percentage: 0,
        avatar: ''
    }
    
  //  const [photo ,setPhoto ]= useState ('');

    componentDidMount = () => {
        const {avatar} =this.props;
        this.setState({avatar})
        
    }
    uploadFile = ({target: {files}}) => {
        console.log(files[0])
        let data = new FormData();
        data.append( 'file',files[0])

        const options = {
           onUploadProgress: (progressEvent) => {
               const {loaded, total} = progressEvent;
               let percent = Math.floor( ( loaded * 100) /total);
               console.log( `${loaded}kb of ${total}kb || ${percent}`); 
           }
        }  

        axios.post("http://localhost:3002/usercard",data).then(res =>{
            console.log(res)
        })
    }


    render() {
        return (
            <div>
               
               <div className=" content">
                   <input type="file" className="form-control" name="photo" onChange={this.uploadFile} />
               </div>
             </div>
        )
    }
}
 
 
 
