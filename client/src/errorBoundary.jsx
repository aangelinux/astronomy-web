/**
 * Defines an ErrorBoundary class to show fallback UI on app-wide crashes.
 */

import * as React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state here

    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI here

      return this.props.fallback
    }

    return this.props.children
  }
}