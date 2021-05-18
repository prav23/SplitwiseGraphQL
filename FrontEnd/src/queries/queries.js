import { gql } from 'apollo-boost';


const getUserQuery = gql`
    query($email: String){
        users(email: $email) {
            _id
            name
            email
        }
    }
`;

const getUserProfileQuery = gql`
    query($user: String){
        profiles(user: $user) {
            _id
            user
            image
            phonenumber
            currency
            language
            timezone
        }
    }
`;

export { getUserQuery, getUserProfileQuery };