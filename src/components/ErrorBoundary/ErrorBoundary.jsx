import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          background: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h1 style={{ color: '#991b1b', marginBottom: '10px' }}>❌ Error en la aplicación</h1>
          <p style={{ color: '#7f1d1d', marginBottom: '10px' }}>
            <strong>Mensaje:</strong> {this.state.error?.message}
          </p>
          <details style={{ whiteSpace: 'pre-wrap', fontSize: '12px', color: '#7f1d1d' }}>
            <summary>Ver detalles del error</summary>
            {this.state.error?.stack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
