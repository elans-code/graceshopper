import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { editUser, fetchUser } from '../store/singleUserStore'


/**
 * COMPONENT
 */
class ModifyUser extends React.Component{
    constructor(props){
        super()
        const {username} = props
        this.state = {
            name: '',
            password: '',
            email: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        this.props.fetchUserData(this.props.match.params.id)
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log(this.props)
        const userData = this.props.userData
        const modifiedUser = {
            id: userData.id,
            name: (this.state.name ? this.state.name : userData.name),
            email: (this.state.email ? this.state.email : userData.email),
        }
        this.props.modifyUser(modifiedUser)
    }
    handleChange(event){
        console.log('Current state:',this.state);
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        const userData = this.props.userData
        const props = this.props
        return (
            <div>{ userData ? 
                (<div>
                    <div><h1>{userData.name}</h1></div>
                    <div><h2>Email: {userData.email}</h2></div>
                    <form id="editUser" onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input name="name" type="text" onChange={this.handleChange} />

                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" onChange={this.handleChange} />

                        <label htmlFor="email">Email:</label>
                        <input name="email" type="email" onChange={this.handleChange} />

                        <button type="submit">Submit</button>
                    </form>
                </div>)
                : 'There is no user data'
            }
            </div>
        )
    };
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    userData: state.userData
  }
}
const mapDispatch = (dispatch, history) =>{
    return{
        fetchUserData: (id) => { dispatch(fetchUser(id)) },
        modifyUser: (user) => { dispatch(editUser(user)) }
    }
}

export default connect(mapState, mapDispatch)(ModifyUser)