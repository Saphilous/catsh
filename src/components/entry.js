import React, {useState} from 'react'
import firebase from "firebase/app";
import "firebase/storage";
import styled from 'styled-components'
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


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

    const naturallanguageunderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: 'UNL1ShV-c2bAwfGGyqQFjE-qVOOE-yPskbDybk8CWro0',
        }),
        serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/1bcae669-efa9-4160-9535-18d3807000a3',
    })
    console.log(naturallanguageunderstanding)

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

        const analyzeparams = {
            'text': details.entry,
            'features': {
                'entities': {
                    'emotion': true,
                    'sentiment': true,
                    'mentions': true,
                    'limit': 10
                },
                'keywords': {
                    'emotion': true,
                    'sentiment': true,
                    'limit': 3
                },
                'summarization': {
                    'limit': 5
                }
            }
        }

        naturallanguageunderstanding.analyze(analyzeparams).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
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