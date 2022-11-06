import { Card, Paper, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme =>({
    root:{
        backgroundColor:"#fdffdff"
    },
    PageHeader:{
        padding: theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(3)
    },
    pageIcon:{
        display:'inline-block',
        padding: theme.spacing(2),
        color:'#3cbb41',
        
        [theme.breakpoints.down("sm")]: {
            // display:"none"
            // size:"small"
          }
    },
    pageTitle:{
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function PageHeader(props) {
    const classes = useStyles();
    const {title,subTitle,icon} = props;
  return (
    <Paper elevation={0} square className={classes.root}>
        <div className={classes.PageHeader}>
            <Card className={classes.pageIcon}>
                {icon}
            </Card>
            <div className={classes.pageTitle}>
                <Typography
                     variant='h6'
                     component="div">
                 {title}       
                </Typography>
                <Typography
                     variant='subtitle2'
                     component="div">
                 {subTitle}       
                </Typography>
            </div>
        </div>
    </Paper>
  )
}
