import React, {useCallback, useEffect, useState} from 'react'
import {Box, Container, Grid, Paper, Typography, Button} from '@material-ui/core'
import {useRouter} from 'next/router'
import {parseGenericDetailRouterQuery, useRequiredRouterQueryVariables} from './routes'
import {getOrElse} from 'fp-ts/Option'

import {ForecastCard} from './forecastCard'
import {DetailCard} from './detailCard'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import {Countries} from '../types'
import {HeaderScreen} from '../header'
import {useStyles} from '../types'

const DetailScreen = ():JSX.Element => {
  const router = useRouter()
  const id = parseGenericDetailRouterQuery(router.query)
  const idResolved = getOrElse(() => '0')(id)
  const [Error, SetError] = useState<boolean>(false)
  const [ResponseData, SetResponseData] = useState<undefined | any>(undefined)
  const [ForeCastData, SetForeCastData] = useState<undefined | any>(undefined)
  const classes = useStyles()

  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false}
  const timeFormat12h = {hour: '2-digit', minute: '2-digit', hour12: true}
  const daytime = {hour: '2-digit', minute: '2-digit', hour12: false}

  const requiredRoute = useRequiredRouterQueryVariables(id)
  requiredRoute

  useEffect(() => {
    fetch(`${process.env.foreCastApi}?id=${idResolved}&appid=${process.env.openApiKey}&units=${process.env.units}`)
        .then((res) => res.json())
        .then((response) => {
          response.code === '200' ? SetResponseData(response) : SetError(true)
        })
        .catch(() => {
          SetError(true)
        })

    fetch(`${process.env.apiUrl}?id=${idResolved}&appid=${process.env.openApiKey}&units=${process.env.units}`)
        .then((res) => res.json())
        .then((response) => {
          response.code === '200' ? SetForeCastData(response) : SetError(true)
        })
        .catch(() => {
          SetError(true)
        })
  }, [SetResponseData, SetForeCastData, idResolved, SetError])

  const handleClickSearchWeather = useCallback(() => {
    router.back()
  }, [router])


  if (!ResponseData || !ForeCastData) {
    return <div>Loading...</div>
  }

  if (Error) {
    return <div>API ERROR</div>
  }

  const DetailData = ResponseData.list[0]
  const DetailCity = ResponseData?.city
  const forecast = ResponseData?.list

  console.log(ForeCastData)
  console.log(DetailCity)

  const FormRowTemp = () => {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center">
          <span>
            <Typography align="center" variant='caption'>
              {new Date().toLocaleTimeString('en-us', options)}
            </Typography>
          </span>
          <span>
            <Typography align="center" variant='caption' onClick={handleClickSearchWeather}>
              <Button color="primary">
                {`${DetailCity.name}, ${Countries[DetailCity.country]}`}
                <LocationOnIcon fontSize='inherit'/>
              </Button>

            </Typography>
          </span>

        </Grid>
        <React.Fragment>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <div>
                <img src={`http://openweathermap.org/img/wn/${DetailData.weather[0].icon}.png`
                    .replace(/\s/g, '')}/>
              </div>
              <div>{DetailData.weather[0].main}</div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <div className={classes.displayFlex}>
                <div>
                  <Typography align="center" variant='h3'>{
                    DetailData.main.temp}
                  </Typography>
                </div>
                <div>℃</div>
              </div>

            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <div>
                <span>{Math.round(DetailData.main.temp_max)}</span>
                <span>&#8451;</span>
                <span><ArrowDropUpIcon fontSize='small'/></span>
              </div>
              <div>
                <span>{Math.round(DetailData.main.temp_min)}</span>
                <span>&#8451;</span>
                <span><ArrowDropDownIcon fontSize='small'/></span>
              </div>
            </Paper>
          </Grid>
        </React.Fragment>
      </>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box minHeight={300} width="100%">
        <Box minHeight="25%">
          <HeaderScreen/>
        </Box>
        <Box>
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <FormRowTemp/>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                  <DetailCard
                    data={DetailData.main.humidity}
                    type='%'
                    footer='Humidity'
                  />
                  <DetailCard
                    data={DetailData.main.pressure}
                    type='mBar'
                    footer='Pressure'
                  />
                  <DetailCard
                    data={DetailData.wind.speed}
                    type='km/h'
                    footer='Wind'
                  />
                </React.Fragment>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                  <DetailCard
                    data={new Date(ForeCastData.list[0].sys.sunrise).toLocaleTimeString('en-us', timeFormat12h)}
                    footer='Sunrise'
                  />
                  <DetailCard
                    data={new Date(ForeCastData.list[0].sys.sunset).toLocaleTimeString('en-us', timeFormat12h)}
                    footer='Sunset'
                  />
                  <DetailCard
                    data={new Date(ForeCastData.list[0].dt).toLocaleTimeString('en-us', daytime)}
                    footer='DayTime'
                  />
                </React.Fragment>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <ForecastCard cardDetail={forecast[8]}/>
                <ForecastCard cardDetail={forecast[16]}/>
                <ForecastCard cardDetail={forecast[24]}/>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
    </Container>
  )
}

export default DetailScreen
