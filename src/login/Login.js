import React, { Component } from "react";
import { Row, FormGroup, Input, Label, Button,Container, Col, Form,FormFeedback ,FormText} from 'reactstrap';
import './login.css';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../shared/validator';
import { STORAGE_KEYS } from 'utils/constants';
import { userService } from '../services';

const COURSE_API_URL = STORAGE_KEYS.COURSE_API_URL;
 class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': 'eng.chadi@gmail.com',
            'password': '123456',
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

        // this.state = {
        //     formData: {}, // Contains login form data
        //     errors: {}, // Contains login field errors
        //     formSubmitted: false, // Indicates submit status of login form
        //     loading: false // Indicates in progress state of login form
        // }
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

    // handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //
    //     let { formData } = this.state;
    //     formData[name] = value;
    //
    //     this.setState({
    //         formData: formData
    //     });
    //}

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

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

    // login = (e) => {
    //
    //     e.preventDefault();
    //     const { history } = this.props;
    //     let errors = this.validateLoginForm();
    //     console.log(errors);
    //
    //     if(errors === true){
    //        // alert("You are successfully signed in...");
    //         //window.location.reload()
    //        // history.push('/');
    //     } else {
    //         this.setState({
    //             errors: errors,
    //             formSubmitted: true
    //         });
    //     }
    // }

     submitForm = async (event) => {
     // async submitForm(e) {
        const { history } = this.props;
         event.preventDefault();

         this.setState({loginmessage:''});

        let errors = this.validateLoginForm();
        console.log(errors);

         let { formData } = this.state;
         console.log(formData);

        if(errors === true){
            const response =await userService.login(formData.email,formData.password);
            // const response =  await fetch(COURSE_API_URL+'/users/login', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formData),
            // });
            // alert("You are successfully signed in...");
            //window.location.reload()

            // console.log(response);
            // return;

            if(response.id>0){
                console.log(response);

                localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
                localStorage.setItem("name", response.name);
                localStorage.setItem("userId", response.id);
                localStorage.setItem("userCreationDate", response.creationdate);
                 history.push('/');
            }else{
                this.setState({
                    loginmessage:"Email and Password do not match !!",
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
        const { email, password } = this.state;
        const { errors, formSubmitted } = this.state;

        return (
            <Container className="Login">
                <h2>Sign In</h2>
                <Form className="form"  onSubmit={this.submitForm} >
                    {/*onSubmit={ (e) => this.submitForm(e) }>*/}
                    <Col>
                        <FormGroup>
                            <Label>User Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                required
                                value={ email }
                                valid={ this.state.validate.emailState === 'has-success' }
                                invalid={ this.state.validate.emailState === 'has-danger' }
                                onChange={ (e) => {
                                    this.validateEmail(e)
                                    this.handleChange(e)
                                } }
                            />
                            <FormFeedback valid>
                                That's a tasty looking email you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your email. Please input a correct email.
                            </FormFeedback>
                            <FormText>Your username is most likely your email.</FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                required
                                id="examplePassword"
                                placeholder="********"
                                value={ password }
                                valid={ this.state.validate.passwordState === 'has-success' }
                                invalid={ this.state.validate.passwordState === 'has-danger' }
                                onChange={ (e) =>{
                                    this.validatePassword(e)
                                this.handleChange(e)
                                }}
                            />
                            <FormText>{errors.password}</FormText>
                        </FormGroup>
                    </Col>
                    <Button type="submit">Submit</Button>
                    <div className='error'>
                    {this.state.loginmessage}
                    </div>
                </Form>
            </Container>
        );
        // return (
        //     <div className="Login">
        //         <Row>
        //             <form onSubmit={this.login}>
        //                 <FormGroup id="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
        //                     <Label>Email</Label>
        //                     <Input type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
        //                     { errors.email &&
        //                     <Label>{errors.email}</Label>
        //                     }
        //                 </FormGroup>
        //                 <FormGroup id="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
        //                     <Label>Password</Label>
        //                     <Input type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
        //                     { errors.password &&
        //                     <Label>{errors.password}</Label>
        //                     }
        //                 </FormGroup>
        //                 <Button type="submit" bsStyle="primary">Sign-In</Button>
        //             </form>
        //         </Row>
        //     </div>
        // )
    }
}

export default Login;