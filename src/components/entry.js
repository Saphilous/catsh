import React, {useState, useEffect} from 'react'
import firebase from "firebase/app";
import "firebase/storage";
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'
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
                await instance.get(`/analyzetext?analtexts=${analtexts}`, {"analtexts": analtexts}).then(res => {
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

            const confidencesetter = () => {
                let confidence
                if(results)
                {
                    console.log(results)
                    confidence = results.entities[0].confidence
                }
                return confidence
            }

            if(results)
            {
                console.log(results)
            }


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
                    <p className='Ent-p center black-txt'>
                        ***** The End *****
                    </p>
                </div>
                {results? results.entities[0]? <div className='Ent-Text white-bg'>
                    <h1>
                        Text Analysis
                    </h1>
                    <div className='confidence-div'>
                        <ResponsivePie
                            data={[{"id": "confidence",
                            "label": "confidence",
                            "value": `${results.entities[0].confidence*100}`,
                            "color": "hsl(225,72.7%,56.9%)"},
                            {
                            "label": "null",
                            "value": `${Math.round(100-results.entities[0].confidence*100)}`,
                            "color": "hsl(21, 70%, 50%)"}]}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            startAngle={-89}
                            endAngle={90}
                            innerRadius={0.8}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                            enableArcLinkLabels={false}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={0}
                            arcLinkLabelsColor={{ theme: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'brighter', 4 ] ] }}
                            isInteractive= {true}
                            colors={{datum: 'data.color'}}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                }
                            ]}
                            fill={[]}
                            legends={[]}
                        />
                        <h3 className='Ent-sub'>
                            Confidence Indicator
                        </h3>
                    </div>
                    <div className='confidence-div'>
                        <ResponsivePie
                            data={[
                            {"id": "anger",
                            "label": "anger",
                            "value": `${(results.entities[0].emotion.anger).toPrecision(2)}`,
                            "color": "hsl(0, 100%, 50%)"},
                            {
                            "id": "disgust",
                            "label": "disgust",
                            "value": `${(results.entities[0].emotion.disgust).toPrecision(2)}`,
                            "color": "hsl(147, 50%, 47%)"},
                            {
                            "id": "fear",
                            "label": "fear",
                            "value": `${(results.entities[0].emotion.fear).toPrecision(2)}`,
                            "color": "hsl(300, 76%, 72%)"},
                            {
                            "id": "joy",
                            "label": "joy",
                            "value": `${(results.entities[0].emotion.joy).toPrecision(2)}`,
                            "color": "hsl(39, 100%, 50%)"},
                            {
                            "id": "sadness",
                            "label": "sadness",
                            "value": `${(results.entities[0].emotion.sadness).toPrecision(2)}`,
                            "color": "hsl(0, 0%, 50%)"},
                            ]}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            startAngle={-89}
                            endAngle={90}
                            innerRadius={0.8}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                            enableArcLinkLabels={false}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={0}
                            arcLinkLabelsColor={{ theme: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 4 ] ] }}
                            isInteractive= {true}
                            colors={{datum: 'data.color'}}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                }
                            ]}
                            fill={[]}
                            legends={[]}
                        />
                        <h3 className='Ent-sub'>
                            Emotion Indicator
                        </h3>
                    </div>
                    <div className='confidence-div'>
                        {results.entities[0].sentiment.label === 'positive'? <div className='Ent-sent-label positive'> </div>
                        : results.entities[0].sentiment.label === 'neutral'? <div className='Ent-sent-label neutral'></div>
                        : <div className='Ent-sent-label negative'> </div>}
                        <h3 className='Ent-sub'>
                            Sentiment Indicator
                        </h3>
                    </div>
                    </div>: <div className='Ent-Txt-Ins white-bg'>Insufficient text to analyze</div>
                    : <div> Loading </div>
                }
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