import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import EntryComponent from '../components/entry'
import '../stylesheets/Entry.css'

const newInstance = Axios.create({
    baseURL: 'https://18d20caa.us-south.apigw.appdomain.cloud/catsh-entries-read'
})

function Entry()
{
    const [details, setdetails] = useState()
    useEffect(() => {
        const urlfin = window.location.search
        const urlparams = new URLSearchParams(urlfin)
        newInstance.get(`/getentries?uid=${urlparams.get('uid')}&eid=${urlparams.get('eid')}`).then(res => {
            setdetails(...res.data.entries)
        })
    }, [])

    return(
        <div>
            <EntryComponent entry = {details}/>
        </div>
    )
}

export default Entry