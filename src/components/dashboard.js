import React from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase from "firebase/app";
import "firebase/storage";

const useStyles = makeStyles({

    root: {
        maxWidth: 400
    },

    avatar: {
        width: 50,
        height: 50,
        border: '2px solid',
        margin: '-48px 32px 0 auto',
        '& > img': {
        margin: 0,},
        backgroundImage: 'linear-gradient(to right, rgb(45, 77, 255), rgb(124, 53, 255))'
        },

    media: ({ bgColor = 'rgba(0, 0, 0, 0.08)' }) => ({
        width: '100%',
        clipPath: 'polygon(0% 100%, 100% 84%, 100% 0%, 0% 0%)',
        backgroundColor: bgColor,
      }),
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '0.8em',
        fontFamily: 'inherit'
      },
      body: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.72)',
      },
})

function DashComponent(props)
{
    const classes = useStyles()
    var storageref = firebase.storage().ref()
    const history = useHistory()
    const urlfin = window.location.search
    const urlparams = new URLSearchParams(urlfin)
    const userid = sessionStorage.getItem("uid")
    let entriesmapped = null
    if(props.entries)
    {
        entriesmapped = props.entries.map(res => {
            const basepath = `userimages/${urlparams.get("uid")}/`
            const finalpath = basepath.concat(res.imgname)
            console.log(finalpath)
            var starsref = storageref.child(finalpath)
            starsref.getDownloadURL().then((url) => {
                console.log(url)
                try
                {
                    document.getElementById(res.id).setAttribute("src", url)
                }
                catch(err)
                {
                    console.log(err)
                }
            })
            const clicked = () => {
                history.push(`/dashboard/entry?uid=${userid}&eid=${res.id}`)
            }
            return(
                <div className="Dash-card">
                   <Card className={classes.root}>
                        <CardActionArea onClick={clicked} name = {res.id} value={res.id}>
                            <CardMedia
                            component="img"
                            id = {res.id}
                            alt="Contemplative Reptile"
                            height="240"
                            className ={classes.media}
                            src=""
                            title="Contemplative Reptile"
                            />
                            <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                            </Avatar>
                            <CardContent>
                            <Typography variant="body1" color="textprimary" component="h1" className = {classes.heading}>
                                {res.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className = {classes.body}>
                                {res.entry.length > 100? `${res.entry.slice(0, 100)}...`: res.entry}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary" name = {res.id} onClick={clicked} value={res.id}>
                            Read More
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            )
        })
    }
    return(
        <React.Fragment>
            {entriesmapped}
        </React.Fragment>
    )
}

export default DashComponent