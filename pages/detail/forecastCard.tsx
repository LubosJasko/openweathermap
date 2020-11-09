import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import {useStyles, CardType} from '../types'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

export interface CardDetail {
    cardDetail: CardType
}

export const ForecastCard = ({cardDetail} : CardDetail):JSX.Element => {
  const classes = useStyles()
  const daytime = {weekday: 'long', hour: '2-digit', hour12: false}

  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <div>
            <img alt={cardDetail.weather[0].icon}
              src={`http://openweathermap.org/img/wn/${cardDetail.weather[0].icon}.png`.replace(/\s/g, '')}/>
          </div>
          <div>
            {new Date(cardDetail.dt * 1000).toLocaleTimeString('sk-SK', daytime)}
          </div>
          <div className={classes.displayFlex}>
            <div className={classes.displayFlex}>
              <div>{cardDetail.main.temp_max}</div>
              <div>&#8451;</div>
              <div>
                <ArrowDropUpIcon fontSize='small'/>
              </div>
            </div>
            <div className={classes.displayFlex}>
              <div>{cardDetail.main.temp_min}</div>
              <div>&#8451;</div>
              <div>
                <ArrowDropDownIcon fontSize='small'/>
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}
