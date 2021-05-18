import { gql } from 'apollo-boost';

const getUserQuery = gql`
    query($user_id: String){
        user(user_id: $user_id) {
            name
            email
        }
    }
`;

const getUsersQuery = gql`
    query(){
        users() {
            name
            email
        }
    }
`;

const getUserProfileQuery = gql`
    query($user_id: String){
        profile(user_id: $user_id) {
            user
            image
            phonenumber
            currency
            language
            timezone
        }
    }
`;

const getGroupQuery = gql`
    query($group_name: String){
        group(group_name: $group_name) {
            group_name
            group_image
        }
    }
`;

const getGroupsQuery = gql`
    query(){
        groups() {
            group_name
            group_image
        }
    }
`;

const getExpenseQuery = gql`
    query($group: String){
        expense(group: $group) {
            user
            group
            amount
            description
            expense_date
        }
    }
`;

const getExpensesQuery = gql`
    query(){
        expenses() {
            user
            group
            amount
            description
            expense_date
        }
    }
`;

const getUserGroupsQuery = gql`
    query($group: String){
        usergroups(group: $group) {
            user
            group
            status
            total_spent
            total_owed
        }
    }
`;
export { getUserQuery, getUsersQuery, getUserProfileQuery,
    getGroupQuery, getGroupsQuery, getExpenseQuery,
    getExpensesQuery, getUserGroupsQuery};