import React, { Component } from 'react'
import { Form, Button, Popup } from 'semantic-ui-react'
import './Login.css'


export default class Login extends Component {



  render() {

    const { onFormChange, onLoginSubmit, handleOpen, isOpen } = this.props;



    return (
      <Form onSubmit={onLoginSubmit} className="even-height">
        <Form.Field>
          <label className="left-align" >Email</label>
          <input name="email" type="email" onChange={onFormChange} />
        </Form.Field>
        <Form.Field>
          <label className="left-align">Password</label>
          <input name="password" type="password" onChange={onFormChange} />
        </Form.Field>
        <Popup
          trigger={<Button type='submit'>Sign In</Button>}
          content={`Wrong Email or Password! Please Try Again`}
          on='click'
          open={isOpen}
          onOpen={handleOpen}
          position='bottom center'
        />
      </Form>
    )
  }
}