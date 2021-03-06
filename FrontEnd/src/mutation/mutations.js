import { gql } from 'apollo-boost';

const registerUserMutation = gql`
    mutation RegisterUser($name: String, $email: String, $password: String){
        registerUser(name: $name, email: $email, password: $password){
            message
            status
        }
    }
`;

const userLoginMutation = gql`
mutation CustomerLogin($email_id: String, $password: String){
    customerLogin(email_id: $email_id, password: $password){
        message
        status
    }
}
`;

export { userLoginMutation, registerUserMutation };