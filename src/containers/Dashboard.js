import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import '../stylesheets/Dashboard.css'
import Axios from 'axios'
import AuthContext from '../store/authContext'
import DashComponent from '../components/dashboard'

const newInstance = Axios.create({
    baseURL: 'https://18d20caa.us-south.apigw.appdomain.cloud/catsh-entries-read'
})

function Dashboard(props) 
{
    const [entries, setentries] = useState()
    useEffect(() => {
        const urlfin = window.location.search
        const urlparams = new URLSearchParams(urlfin)
        newInstance.get(`/getentries?uid=${urlparams.get('uid')}`).then(
            res => {
                setentries(res.data.entries)
            }
        )
    }, [])

    let history = useHistory()

    console.log(entries)

    let authcontext = useContext(AuthContext)
    const newentryadder = () => {
        const urlfin = window.location.search
        const urlparams = new URLSearchParams(urlfin)
        history.push(`/dashboard/entryform?uid=${urlparams.get('uid')}`)
    }

    return(
        <React.Fragment>
            <div className='Dash-Head'>
            {authcontext.userinfo? <h1>Welcome {authcontext.userinfo}</h1>: <h1>Welcome to your AI-Powered Diary</h1>}
            </div>
            <div className='Dash-container'>
                <div className='Dash-Card-Add' onClick = {newentryadder}>
                    <AddTwoToneIcon className = "Dash-Icon"/>
                </div>
                <DashComponent entries = {entries}/>
            </div>
        </React.Fragment>
    )    
}

export default Dashboard