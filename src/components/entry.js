import React, {useState} from 'react'
import firebase from "firebase/app";
import "firebase/storage";
import styled from 'styled-components'

const Div = styled.div `
background-image: url(${props => props.url});
height: 300px;
width: 300px;
margin: 0px auto;
border-radius: 15px;
background-position: center;
background-size: cover;
background-repeat: no-repeat;
`

function EntryComponent(props)
{
    const [imgurl, setimgurl] = useState()
    var storageref = firebase.storage().ref()
    const userid = sessionStorage.getItem("uid")
    if(props.entry)
    {
        const details = props.entry  
            const basepath = `userimages/${userid}/`
            const finalpath = basepath.concat(details.imgname)
            console.log(finalpath)
            var starsref = storageref.child(finalpath)
            starsref.getDownloadURL().then((url) => {
                console.log(url)
                setimgurl(url)
            })

        console.log(props.entry)
        return (
            <div className='Ent-wrapper'>
                <div className='Ent-Text'>
                    <h1 className='Ent-Head'>
                        {details.title}
                    </h1>
                    <Div id={details.id} url = {imgurl}>
                        {/* Just a placeholder for the image*/}
                    </Div>
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