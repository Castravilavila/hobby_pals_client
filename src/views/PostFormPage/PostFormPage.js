import React,{Component} from 'react';

import {uploadImageOnBucket} from '../../util/ApiUtils';

export default class PostFormPage extends Component{

    render(){

        return(
            <div>
                <h2>Insert image bigga</h2>
                <input type='file' onChange={uploadImageOnBucket}/>
            </div>
        )
    }
}