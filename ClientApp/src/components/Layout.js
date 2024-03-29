import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render () {
      return (
        <div>
          <NavMenu />
              <Container>
                  <div className="jumbotron">
                      <div className="container">
                          <div className="col-md-12">
                              {this.props.children}
                          </div>
                      </div>
                  </div>
          </Container>
        </div>
      );
    }
}