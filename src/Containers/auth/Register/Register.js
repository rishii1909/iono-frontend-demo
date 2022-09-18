import React from 'react'
import { Input, Space, Divider, Button } from 'antd';
import {Link} from "react-router-dom"
import bg from "./auth_bg.png" 
import "./register.css"

const Register = () => {
    return (
        <div className='wrapper'>
                <img className='auth-bg' src={bg}></img>
                <div>
                    <h1 className='auth-header'>Sign up</h1>
                    <p className='auth-desc'>Enter your username, email and password to sign up</p>
                    <Divider dashed/>
                    <Space direction='vertical'>
                    <Input className='auth-field' placeholder='First name' />
                    <Input className='auth-field' placeholder='Last name' />
                    <Input type="email" className='auth-field' placeholder='Email' />
                    <Input type="password" className='auth-field' placeholder='Password' />
                    </Space>
                    <br />
                    <Button type='primary'>SIGN UP</Button>
                    <br />
                    <p>Already have an account? <Link to="/auth/login">Sign in</Link>
                    </p>
                    
                </div>
        </div>
    )
}

export default Register