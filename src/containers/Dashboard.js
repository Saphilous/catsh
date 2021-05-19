import React from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../stylesheets/Dashboard.css'

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

function Dashboard() 
{
    let history = useHistory()
    const newentryadder = () => {
        history.push('/dashboard/entryform/')
    }
    const classes = useStyles()
    const DAIRY_ENTRIES = [{date: '12/03/2020', title: 'Feelin Kinda Bored', entry: '"Begin today!" That&apos;s all the note said. There was no indication from where it came or who may have written it. Had it been meant for someone else? Meghan looked around the room, but nobody made eye contact back. For a brief moment, she thought it might be a message for her to follow her dreams, but ultimately decided it was easier to ignore it as she crumpled it up and threw it away.'}, 
                    {date: '12/03/2020', title: 'Feelin Kinda Bored',  entry: '"Begin today!" That&apos;s all the note said. There was no indication from where it came or who may have written it. Had it been meant for someone else? Meghan looked around the room, but nobody made eye contact back. For a brief moment, she thought it might be a message for her to follow her dreams, but ultimately decided it was easier to ignore it as she crumpled it up and threw it away.'},
                    {date: '12/03/2020', title: 'Feelin Kinda Bored',  entry: '"Begin today!" That&apos;s all the note said. There was no indication from where it came or who may have written it. Had it been meant for someone else? Meghan looked around the room, but nobody made eye contact back. For a brief moment, she thought it might be a message for her to follow her dreams, but ultimately decided it was easier to ignore it as she crumpled it up and threw it away.'},
                    {date: '12/03/2020', title: 'Feelin Kinda Bored',  entry: '"Begin today!" That&apos;s all the note said. There was no indication from where it came or who may have written it. Had it been meant for someone else? Meghan looked around the room, but nobody made eye contact back. For a brief moment, she thought it might be a message for her to follow her dreams, but ultimately decided it was easier to ignore it as she crumpled it up and threw it away.'}]
    
    const entriesmapped = DAIRY_ENTRIES.map(res => {
        return(
            <div className="Dash-card">
               <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="240"
                        className ={classes.media}
                        image="joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg"
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
                            {res.entry}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    })

    return(
        <div className='Dash-container'>
            <div className='Dash-Card-Add' onClick = {newentryadder}>
                <AddTwoToneIcon className = "Dash-Icon"/>
            </div>
            {entriesmapped}
        </div>
    )    
}

export default Dashboard