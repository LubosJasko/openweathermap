import {makeStyles} from '@material-ui/core/styles'

export enum Countries {
    SK = 'Slovakia'
}
export interface MainType {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
}
export interface WeatherType {
    description: string
    icon: string
    id: number
    main: string
}

export interface WindType{
    deg: number
    speed: number
}

export interface CardType {
    icon: string
    main: MainType
    weather: WeatherType
    wind: WindType
    dt_txt: string
    dt: number
}

export interface CardDetailComponent {
    icon?: string
    data: string,
    type?: string,
    footer: string
}

export interface ListResponse {
    name: string,
    id: number,
    main: MainType
}

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 95,
  },
  displayFlex: {
    display: 'flex',
    justifyContent: 'center',
  },
}))
