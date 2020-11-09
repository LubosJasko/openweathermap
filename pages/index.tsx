import React from 'react'
import {HeaderScreen} from './header'
import SearchScreen from './search'
import {Container, CssBaseline, Box} from '@material-ui/core'

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box minHeight={300} width="100%">
          <Box minHeight="25%">
            <HeaderScreen/>
          </Box>
          <Box>
            <SearchScreen/>
          </Box>
        </Box>
      </Container>
    </>
  )
}
