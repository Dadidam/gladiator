import React from 'react';
import { Jumbotron } from 'react-bootstrap';

class Jumbo extends React.Component {
    render() {
        return <Jumbotron>
            <h1>{ this.props.title }</h1>
            { this.props.description ?
                <p>{ this.props.description }</p> : (null)
            }
            <div>{ this.props.controls }</div>
        </Jumbotron>
    }
}

export default Jumbo
