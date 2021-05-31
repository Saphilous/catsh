import React from 'react'
import firebase from "firebase/app";
import "firebase/storage";
import styled from 'styled-components'
import { DetailsSharp } from '@material-ui/icons';

const Div = styled.div `
background-image: url(${props => props.imageurl});
height: 300px;
background-position: center;
background-size: cover;
background-repeat: no-repeat;
`

function EntryComponent(props)
{
    var storageref = firebase.storage().ref()
    const userid = sessionStorage.getItem("uid")
    if(props.entry)
    {
        const details = props.entry
        const basepath = `userimages/${userid}/`
        const imageurlgetter= () =>
        {const finalpath = basepath.concat(details.imgname)
            console.log(finalpath)
            var starsref = storageref.child(finalpath)
            starsref.getDownloadURL().then((url) => {
                console.log(url)
                document.getElementById(details.id).setAttribute("imageurl", url)
            })
        }
        console.log(props.entry)
        return (
            <div className='Ent-wrapper'>
                <div className='Ent-Text'>
                    <h1 className='Ent-Head'>
                        {details.title}
                    </h1>
                    <div imageurl = {imageurlgetter()}>
                        <image src='' id = {details.id} />
                    </div>
                    <p className='Ent-p'>
                        {details.entry}
                    </p>
                </div>
            </div>
        )
    }
    return(
        <h1>
            Piss off! Its loading
        </h1>
    )
}

export default EntryComponent