import React from 'react';
import PropTypes from "prop-types";
import {Form,Button} from 'semantic-ui-react';
import Validator from "validator";
import InlineError from './../messages/InlineError';
class LoginForm extends React.Component {
    state = {
        data:{
            email:'',
            password:''
        },
        loading:false,
        errors:{}
    }
    onChange = (e) => {
        this.setState({
            data : {...this.state.data,[e.target.name] : e.target.value },
        })
    }
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({
            errors
        })
        if(Object.keys(errors).length === 0 ){
            this.props.submit(this.state.data);
        }
    }
    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if(!data.password) errors.password = "Can't be blank";

        return errors;
    }
    render () {
        const {data,errors} = this.state;
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field error={!!errors.email}>
                        <label htmlFor={'email'}>Email</label>
                        <input type="email" onChange={this.onChange} id={'email'} name="email" className={'email'} placeholder="example@example.com" value={data.email} />
                        {errors.email && <InlineError text={errors.email} />}
                    </Form.Field>

                    <Form.Field error={!!errors.password}>
                        <label htmlFor={'password'}>Password</label>
                        <input type="password" onChange={this.onChange} id={'password'} name="password" className={'password'} placeholder={'Password'} value={data.password} />
                        {errors.password && <InlineError text={errors.password} />}
                    </Form.Field>
                    <Button primary>Login</Button>
                </Form>
            </div>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default LoginForm;