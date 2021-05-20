import React, {useState, useEffect, Component} from 'react'
import AppID from 'ibmcloud-appid-js'
import {Redirect} from 'react-router-dom'
import { render } from '@testing-library/react'
import App from '../App'

function Authhoc(ComptoProtect)
{
    return class extends Component{

        state = {
            loading: true,
            redirect: false,
            loggedin: false,
            userinfo: {}
        }

       async componentDidMount()
        {
            const appID = new AppID()
            try {
               await appID.init({
                    clientId: "7d53d0be-4b73-4949-82ac-b6c1524832d5",
                    discoveryEndpoint: "https://us-south.appid.cloud.ibm.com/oauth/v4/b7627068-8442-4f23-9876-fd6e7e6309e8/.well-known/openid-configuration",
                });
            } catch (e) {
                console.log(e)
            }
            const atncookie = document.cookie
            const atncookieval = atncookie.split("=")[1]
            try
            {
                appID.getUserInfo(atncookieval).then(res => {
                    console.log(res)
                    this.setState({loading: false, loggedin: true, userinfo: res})
                }).catch(err => {
                    console.log(err)
                    this.setState({loading: false, redirect: true, loggedin: false})
                })
            }
            catch(e)
            {
                console.log(e)
            }
        }
        render()
        {
            const {loading, redirect, loggedin} = this.state
            console.log(loading)
            if(loading)
            {
                return(null)
            }
            if(redirect)
            {
                return (<Redirect to = '/'/>)
            }
            return(<ComptoProtect {...this.props}></ComptoProtect>)
        }
    }
}
export default Authhoc