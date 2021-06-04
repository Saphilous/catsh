import React, {useState, useEffect} from 'react'
import firebase from "firebase/app";
import "firebase/storage";
import styled from 'styled-components'
import axios from 'axios';


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

const instance = axios.create({
    baseURL: "https://18d20caa.us-south.apigw.appdomain.cloud/catsh-text-analyze"
})

function EntryComponent(props)
{
    const [imgurl, setimgurl] = useState()
    const [results, setresults] = useState(null)
    useEffect(async () => {
        if(props.entry)
        {
            const details = props.entry
            const analtexts = details.entry
            var analyzsisresults
                await instance.get(`/analyzetext`, {"analtexts": analtexts}).then(res => {
                    analyzsisresults = res.data.result
                    setresults(analyzsisresults)
                }).catch(err => {
                    console.log(err)
                }
            )
        }
    }, [props.entry])

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
                <div className='Ent-Text'>
                    <h1>
                       Confidence Score:  {results? results.entities[0].confidence: "no resulrs"}
                    </h1>
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