import React, {Component} from 'react'

class ErrorBoundary extends Component
{
    state = {hasError: false}
    
    static getDerivedStateFromError(error)
    {
        this.setState({hasError: true}, () => {console.log(this.state.hasError)})
    }

    render()
    {
        if(this.state.hasError)
        {
            return(
                <div>
                    <h1>
                        Something went wrong! Please refresh the page. If you still can't access the site, contact the website administrator.
                    </h1>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary