import React, {memo} from 'react'
import {Grid, Paper, Typography} from '@material-ui/core'
import {useStyles, CardDetailComponent} from '../types'
import InfoIcon from '@material-ui/icons/Info'

const DetailCardComponent = ({data, type = '', footer, icon}: CardDetailComponent): JSX.Element => {
  const classes = useStyles()

  const cardIcon = () => {
    if (icon) {
      return <img alt={icon} src={`http://openweathermap.org/img/wn/${icon}`}/>
    }
    return <InfoIcon fontSize='large'/>
  }

  const cardInfo = `${data} ${type}`

  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <div>{ cardIcon() }</div>
          <div>{ cardInfo }</div>
          <div>
            <Typography align="center" variant='caption'>{footer}</Typography>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

export const DetailCard = memo<CardDetailComponent>(DetailCardComponent)
