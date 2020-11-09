import React from 'react'
import {Box} from '@material-ui/core'
import BackgroundHeader from '../../public/main.jpg'

const styles = {
  paperContainer: {
    'height': 300,
    'background-repeat': 'no-repeat',
    'backgroundSize': '100% 100%',
    'backgroundImage': `url(${BackgroundHeader})`,
  },
}

export const HeaderScreen = ():JSX.Element => {
  return (
    <Box width="100%" bgcolor="grey.300" mx={0.5} display="inline-block">
      <div style={styles.paperContainer}/>
    </Box>
  )
}
