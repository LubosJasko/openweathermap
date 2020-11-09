import React, {useCallback, useEffect, useState} from 'react'
import {FormControl, InputLabel, Input, InputAdornment, IconButton, makeStyles, Typography, Button} from '@material-ui/core'
import {useRouter} from 'next/router'
import SearchIcon from '@material-ui/icons/Search'
import clsx from 'clsx'
import {ListResponse} from '../types'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  listRow: {
    'display': 'flex',
    'justify-content': 'space-between',

  },
}))

const SearchScreen = ():JSX.Element => {
  const router = useRouter()

  const classes = useStyles()
  const [Location, SetLocation] = useState<ListResponse[]>()
  const [City, SetCity] = useState<ListResponse[]>()
  const [LocalCity, SetLocalCity] = useState<ListResponse[]>(City)
  const temperature = process.env.units === 'metric'? '℃' : '℉'
  const citesId = process.env.cities.toString()

  const fetchLocations = useCallback(async () => {
    await fetch(`${process.env.apiUrl}?id=${citesId}&appid=${process.env.openApiKey}&units=${process.env.units}`)
        .then((res) => res.json())
        .then((response) => {
          SetCity(response.list)
          SetLocalCity(response.list)
        })
  }, [SetCity, citesId])


  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  const handleChange = useCallback((event) => {
    SetLocation(event.target.value)
    SetLocalCity(City.filter((city) => city.name.toLowerCase().includes(event.target.value)))
  }, [SetLocation, SetLocalCity, City])

  const handleClickDetailWeather = useCallback((cityId: number)=> {
    router.push(`/detail?id=${cityId}`, '/detail')
  }, [router])


  if (!City) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className={classes.root}>
        <Typography align="center" variant='h5'>{'Location'}</Typography>
        <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Search city...</InputLabel>
          <Input
            id="location-input"
            type='text'
            value={Location}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle location visibility">
                  <SearchIcon/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      {LocalCity && LocalCity.map((city) => {
        return (
          <>
            <div key={city.name} onClick={() => handleClickDetailWeather(city.id)} className={classes.listRow}>
              <Button color="primary">{city.name}</Button>
              <div>
                <span>{Math.round(city.main.temp)} </span>
                <span>{temperature}</span>
              </div>
            </div>
          </>
        )
      },
      )}
    </>
  )
}

export default SearchScreen
