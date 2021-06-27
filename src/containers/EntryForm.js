import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateRoundedIcon from '@material-ui/icons/AddPhotoAlternateRounded';
import LibraryAddCheckRoundedIcon from '@material-ui/icons/LibraryAddCheckRounded';
import instance from '../configurations/axios'
import firebase from "firebase/app";
import "firebase/storage";
import '../stylesheets/EntryForm.css'

const cryptoJs = require("crypto-js")


const classes = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
        },
    })
);

const encryptwithAES = (text) => {
    const passphrase = sessionStorage.getItem("uid")
    return cryptoJs.AES.encrypt(text, passphrase).toString()
}

function EntryForm(props)
{
    var history = useHistory()
    var storageref = firebase.storage().ref()
    const [inpfile, setinpfile] = useState()
    const [formvals, setformvals] = useState()
    const [filename, setfilename] = useState('Add an Image')

    const changehandler = (event) => {
        event.persist()
        setformvals(formvals => ({...formvals, [event.target.name]: event.target.value}))
        console.log(formvals)
    }

    const filelistener = (event) =>
    {
        setinpfile(event.target.files[0])
        setfilename(event.target.files[0].name)
    }

    const clickhandler = (event) =>
    {
        const urlfin = window.location.search
        const urlparams = new URLSearchParams(urlfin)
        const uid = urlparams.get('uid')
        console.log(uid)
        event.preventDefault()
        const basename = `userimages/${uid}/`
        const childname = basename.concat(filename)
        var storyref = storageref.child(childname)
        var metadata = {
            name: filename
        }
        const newentryvals = {...formvals}
        newentryvals.entry = encryptwithAES(newentryvals.entry)
        const newentry = {...newentryvals, imgname: filename, docid: `${urlparams.get('uid')}`}
        console.log(newentry)
        storyref.put(inpfile, metadata).then((snapshot) => {
            console.log('Image is uploaded succesfully!');
            instance.post('/entries', newentry).then(res => {
                console.log(res.data)
                setinpfile(null)
                setfilename("Add an Image")
                history.push(`/dashboard?uid=${uid}`)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className='form-div'>
            <h1 className='form-title'>
                Add a New Entry
            </h1>
            <form className={classes.root} noValidate autoComplete="off" style = {{textAlign: 'center'}}>
                <div className='form-elem'>
                <TextField id="outlined-required" label="Title" name = 'title' onChange={changehandler} required variant='outlined'/>
                </div>
                <div className='form-elem'>
                <TextField
                id="outlined-textarea"
                label="Entry"
                name='entry'
                placeholder="Add your Catsh Diary entry"
                multiline
                variant="outlined"
                rows = {6}
                rowsMax = {16}
                onChange = {changehandler}
                />
                </div>
                <div className='form-img-div'>
                    <label for = 'imageurl' className='form-img'>
                        <div>
                            {inpfile?<LibraryAddCheckRoundedIcon className = 'form-add'/>:<AddPhotoAlternateRoundedIcon className = 'form-add'/>}
                        </div>
                        <span id="file-chosen">{filename}</span>
                    </label>
                    <input onChange = {filelistener} type='file' id = 'imageurl' name='imageurl' accept="image/*" style= {{display: "none"}}/>
                </div>
                <button className='App-btn primary' onClick={clickhandler}>Submit</button>
            </form>
        </div>
    )
}

export default EntryForm