import React, { useState } from 'react'
import { Input, Space, Divider, Button, Switch, Form, Checkbox, message } from 'antd';
import bg from "./auth_bg.png" 
import "./login.css"
import axios from "axios"
import { LOGIN_URL } from '../../../Utils/constants';
import { useHistory } from 'react-router-dom';


function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

const Login = () => {

    const [email, setEmail] = useState("rishi@mail.com");
    const [password, setPassword] = useState("rishi2001");
    const [loading, setLoading] = useState(false)

    const history = useHistory();


    const signIn = async () => {
        setLoading(true);
      axios.post(
          LOGIN_URL,
          {
            email,
            password
          }
      ).then(r => {
          const data = r.data;
          message.success("Logged in successfully!");

          localStorage.setItem("creds", data["access"])
          setLoading(false);
          history.push("/dashboard")

      }).catch(e => {
          console.log(e.response.data)
          if(e.response.data.detail){
            message.error(e.response.data.detail)
            return;
          }

          for (const key in e.response.data) {
              if (Object.hasOwnProperty.call(e.response.data, key)) {
                  const err = e.response.data[key];
                  message.error(
                      `${toTitleCase(key)} error : ${err}`
                  )
              }
          }

          setLoading(false);
      })
    }
    return (
        <div className='wrapper'>
                <img className='auth-bg' src={bg}></img>
                <div>
                    <h1 className='auth-header'>Sign In</h1>
                    <p className='auth-desc'>Enter your email and password to Sign In</p>
                    <Divider dashed/>
                    <Space direction='vertical'>
                    <Input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className='auth-field' placeholder='Username' />
                    <Input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className='auth-field' placeholder='Password' />

                    <Form.Item name="remember" valuePropName="checked">
                        <Switch size='small'></Switch> <span className='remember'>Remember me</span>
                    </Form.Item>
                    </Space>
                    <br />
                    <Button loading={loading} type='primary' onClick={signIn}>SIGN IN</Button>
                    <br />
                    <p>Don't have an account? <a href="/auth/register">Register</a></p>
                    
                </div>
        </div>
    )
}

export default Login