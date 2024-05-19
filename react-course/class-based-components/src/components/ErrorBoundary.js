import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, errorMessage: error });
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <p>wrong</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
