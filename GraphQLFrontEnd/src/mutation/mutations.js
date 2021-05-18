import { gql } from 'apollo-boost';

const userLoginMutation = gql`
mutation UserLogin($email: String, $password: String){
    userLogin(email: $email, password: $password){
        message
        status
    }
}
`;

const registerUserMutation = gql`
    mutation RegisterUser($name: String, $email: String, $password: String){
        registerUser(name: $name, email: $email, password: $password){
            message
            status
        }
    }
`;

export { userLoginMutation, registerUserMutation};