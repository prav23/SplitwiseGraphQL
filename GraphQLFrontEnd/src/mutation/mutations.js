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

const updateProfileMutation = gql`
    mutation UpdateProfile($user: String, $image: String, $phonenumber: String, 
        $currency: String, $language: String,$timezone: String,){
        updateProfile(user: $user, image: $image, phonenumber: $phonenumber,
            currency: $currency, language: $language, timezone: $timezone){
            message
            status
        }
    }
`;

const createProfileMutation = gql`
    mutation CreateProfile($user: String, $image: String, $phonenumber: String, 
        $currency: String, $language: String,$timezone: String,){
        createProfile(user: $user, image: $image, phonenumber: $phonenumber,
            currency: $currency, language: $language, timezone: $timezone){
            message
            status
        }
    }
`;

const createExpenseMutation = gql`
    mutation CreateExpense($user: String, $group: String, $amount: String, 
        $description: String, $expense_date: String){
        createExpense(user: $user, group: $group, amount: $amount,
            description: $description, expense_date: $expense_date){
            message
            status
        }
    }
`;

const createGroupMutation = gql`
    mutation CreateGroup($group_name: String, $group_image: String){
        createGroup(group_name: $group_name, group_image: $group_image){
            message
            status
        }
    }
`;

const createUserGroupMutation = gql`
    mutation CreateUserGroup($user: String, $group: String, $new_friend_user_ids: String){
        createUserGroup(user: $user, group: $group, new_friend_user_ids: $new_friend_user_ids){
            message
            status
        }
    }
`;

const acceptUserGroupInviteMutation = gql`
    mutation AcceptUserGroupInvite($user: String, $group: String, $groupUsersData: String, $amount: String){
        acceptUserGroupInvite(user: $user, group: $group, groupUsersData: $groupUsersData, amount: $amount){
            message
            status
        }
    }
`;

const addExpenseUserGroupMutation = gql`
    mutation AddExpenseUserGroup($user: String, $group: String, $new_friend_user_ids: String){
        addExpenseUserGroup(user: $user, group: $group, new_friend_user_ids: $new_friend_user_ids){
            message
            status
        }
    }
`;

export { userLoginMutation, registerUserMutation, updateProfileMutation, 
    createProfileMutation, createExpenseMutation, createGroupMutation,
    createUserGroupMutation, acceptUserGroupInviteMutation, addExpenseUserGroupMutation};