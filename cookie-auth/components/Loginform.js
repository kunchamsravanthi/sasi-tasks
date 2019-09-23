
import { Component } from 'react';
class Loginform extends Component {
    state = {
        email: '',
        password: ''
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handlesubmit = event => {
        const { email, password } = this.state;

        
        event.preventDefault();
            // console.log(this.state);
        loginuser(email, password);
    }
    render() {
        return (
            <form  onSubmit={this.handleSubmit}>
                <div>
                    <labe >Email/UserName</labe><br></br>

                    <input type="email" name="email"
                        placeholder="Please enter your email id"
                        onChange={this.handleChange} /><br /><br />


                    <label >Password</label><br></br>

                    <input type="password" name="password"
                        placeholder="please enter your password"
                        onChange={this.handleChange} /><br /><br />

                    <input type="submit" value="submit" />
                </div>
            </form>
        )
    }
}
export default Loginform;