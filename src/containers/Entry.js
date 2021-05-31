import React, {useState, useEffect} from 'react'
import Axios from 'axios'

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
            setdetails(res.data.entries)
        })
    }, [])

    return(
        <div>
            Headings ares cools
        </div>
    )
}

export default Entry