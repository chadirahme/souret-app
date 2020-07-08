import React, { Component } from "react";
import { Row, FormGroup, Input, Label, Button,Container, Col, Form,FormFeedback ,FormText} from 'reactstrap';
import './login.css';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../shared/validator';
import { STORAGE_KEYS } from 'utils/constants';
import { userService } from '../services';

const COURSE_API_URL = STORAGE_KEYS.COURSE_API_URL;
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            'name': '',
            loginmessage:'',
            validate: {
                emailState: '',
                passwordState: '',
            },
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }
    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    validatePassword(e) {
        const { validate } = this.state
        if (isEmpty(e.target.value)) {
            validate.passwordState = 'has-danger'
        }  else if (isContainWhiteSpace(e.target.value)) {
            validate.passwordState = 'has-danger'
        } else if (!isLength(e.target.value, { gte: 6, lte: 12, trim: true })) {
            validate.passwordState = 'has-danger'
        }else {
            validate.passwordState = 'has-success'
        }
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        let { formData } = this.state;
        formData[target.name] = value;

        await this.setState({
            [ name ]: value,
            formData: formData,
        });

    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.name)) {
            errors.name = "Name can't be blank";
        }
        else if (formData.name.length<3){
           // errors.name = "Name's length must be minimum 3 characters";
            errors.name = "Name's should atleast 3 character in length...!!!";
        }

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        //errors.password='';
        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 12, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    submitForm = async (event) => {
        const { history } = this.props;
        event.preventDefault();

        this.setState({loginmessage:''});

        let errors = this.validateLoginForm();
        console.log(errors);

        let { formData } = this.state;
        console.log(formData);

        if(errors === true){
            const response =await userService.register(formData.name,formData.email,formData.password);

            if(response.user){
                console.log(response.user);

                localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
                localStorage.setItem("name", response.user.name);
                localStorage.setItem("userId", response.user.id);
                localStorage.setItem("userCreationDate", response.user.creationdate);
                history.push('/');
            }else{
                this.setState({
                    loginmessage:response.message,
                    errors: errors,
                    formSubmitted: true
                });
            }

        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }


        // console.log(`Email: ${ this.state.email }`);
        // history.push('/');
    }

    render() {
        const { email, password , name} = this.state;
        const { errors, formSubmitted } = this.state;

        return (
            <main className="register-mp">
                <Form className="form"  onSubmit={this.submitForm} >
                    <div className="main-section">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col-md-10">
                                    <div className="login-register-bg">
                                        <div className="row no-gutters">
                                            <div className="col-lg-6">
                                                <div className="lg-left">

                                                    <div className="lr-text">
                                                        <h2>Register Now</h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="lr-right">
                                                    <h4>Sign Up to Souret !!</h4>
                                                    <div className="login-register-form">


                                                            <div className="form-group">
                                                                <input className="title-discussion-input" type="text" placeholder="Full Name" id="name" name="name"
                                                                       required
                                                                       value={ name }
                                                                       onChange={ (e) => {
                                                                           this.validateEmail(e)
                                                                           this.handleChange(e)
                                                                       } }
                                                                />
                                                                <FormText>{errors.name}</FormText>
                                                            </div>

                                                            <div className="form-group">
                                                                <input className="title-discussion-input" placeholder="Type Email Address" id="email"
                                                                       type="email"
                                                                       name="email"
                                                                       required
                                                                       value={ email }
                                                                       onChange={ (e) => {
                                                                           this.validateEmail(e)
                                                                           this.handleChange(e)
                                                                       } }
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <input className="title-discussion-input"  placeholder="Password" id="password"
                                                                       type="password"
                                                                       name="password"
                                                                       required
                                                                       value={ password }
                                                                       onChange={ (e) =>{
                                                                           this.validatePassword(e)
                                                                           this.handleChange(e)
                                                                       }}
                                                                />
                                                                <FormText>{errors.password}</FormText>
                                                            </div>

                                                            <button className="login-btn" type="submit" id="btnLogin">Register Now</button>
                                                        <div className="login-link">If you have an account? <a href="/login">Login Now</a></div>
                                                            <div className='error'>
                                                                {this.state.loginmessage}
                                                            </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Form>
            </main>
        );

    }
}

export default Register;