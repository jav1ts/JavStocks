import React, { Component } from 'react'
import { Header, Grid, Menu, Segment } from 'semantic-ui-react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import './LoginWrapper.css'

export default class LoginWrapper extends Component {

  render() {
    const { handleOpen, isOpen, activeItem, handleItemClick, onFormChange, onLoginSubmit, onRegisterSubmit } = this.props

    return (
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Menu attached='top' tabular>
              <Menu.Item name='Login' active={activeItem === 'Login'} onClick={handleItemClick} />
              <Menu.Item name='Register' active={activeItem === 'Register'} onClick={handleItemClick} />
            </Menu>
            <Segment className="even-height" attached='bottom'>
              <Header as='h1'>JavStocks</Header>
              {
                activeItem === 'Login' ?
                  <Login
                    isOpen={isOpen}
                    handleOpen={handleOpen}
                    onFormChange={this.props.onFormChange}
                    onLoginSubmit={onLoginSubmit}
                  />
                  : activeItem === 'Register' ?
                    <Register
                      isOpen={isOpen}
                      handleOpen={handleOpen}
                      onFormChange={onFormChange}
                      onRegisterSubmit={onRegisterSubmit}
                    />
                    : null
              }
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}