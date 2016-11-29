import React from 'react';
import { Grid, Row } from 'react-bootstrap';

export default (props) => {
    return (
        <div style={{marginTop: '30px'}}>
            <Grid>
                <Row className="show-grid">
                    {props.children}
                </Row>
            </Grid>
        </div>
    )
}
