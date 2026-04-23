/**
 * Defines a class that displays a fallback UI on app-wide crashes.
 */

import { Button, Card } from '@mui/material'
import * as React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('An error occurred: ', error)
    console.error('Details: ', info)
  }

  handleClick() {
    window.location.reload()
  }

  fallbackUIStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'center',
    fontFamily: 'GoogleSans',
    fontWeight: 'bold',
    padding: 4,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, .75)'
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card sx={this.fallbackUIStyle}>
          <p style={{ marginTop: 0 }}>Something went wrong. Reload?</p>
          <Button variant='contained' onClick={this.handleClick}>RELOAD</Button>
        </Card>
      )
    }

    return this.props.children
  }
}