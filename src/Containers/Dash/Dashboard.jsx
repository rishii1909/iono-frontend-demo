import React, { useEffect } from 'react'
import { message, Upload } from 'antd';
import { FileAddOutlined } from '@ant-design/icons'
import axios from "axios"

import "./dash.css"
import { BATCH_RUNS_URL } from '../../Utils/constants';

const { Dragger } = Upload;



function Dashboard() {

    const dummyUpload = ({file, onSuccess}) => {

        console.log(localStorage.getItem("creds"))
    
        const reader = new FileReader();
    
        reader.onload = function (event) {
            const out = event.target.result;
    
            const arr = out.split(/\r?\n/);
            arr.shift();
            arr.pop();
    
            axios.post(
                BATCH_RUNS_URL,
                {
                    queries : JSON.stringify(arr)
                },
                {
                    headers : {
                        Authorization : localStorage.getItem("creds")
                    }
                }
            ).then(r => {
                const data = r.data;
                console.log(data);
            }).catch(e => console.log(e))
            
        };
    
        reader.readAsText(file);
    
        onSuccess(true);
    }
    
    const upload_props = {
        name: 'file',
        multiple: false,
        accept : ".csv",
        customRequest : dummyUpload,
        onChange(info) {
            const { status } = info.file;
            console.log(status)
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
        
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
    };

    useEffect(() => {
      
        fetchUploads();

    }, [])
    

    const fetchUploads = () => {

        axios.get(
            BATCH_RUNS_URL,
            {
                headers : {
                    Authorization : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYzNDM5NDU2LCJqdGkiOiIwOTEwMmQ0Njc5ZTk0N2I3YmJlM2ExYmJkZGZjZTQ5NyIsInVzZXJfaWQiOjN9.UX_euEtSQO8-ggAvPEzPRSxt1P1zAV7JLcmWUOhoYmg"
                }
            }
        ).then(r => {
            const data = r.data;
            console.log(data);
        }).catch(e => console.log(e))
    }
    
  return (
    <div className="dashboard-wrapper">
        <div className="menu">Ionio</div>
        <div className="content">
            <div className='sheet'>
                <h2>Batch Run</h2>
                
                <div className='faded'>Generate product categories and tags for multiple items</div>
                <br />
                <Dragger {...upload_props}>
                    <p className="ant-upload-drag-icon">
                        <FileAddOutlined style={{color : "#e91f6275"}} />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                    </p>
                </Dragger>
                <br />
            </div>
            <br />
            <div className="sheet">
                <h2>Previous runs</h2>
                <p className="faded">History of all your previous product categorization runs.</p>
                <br />
            </div>
        </div>
    </div>
  )
}

export default Dashboard