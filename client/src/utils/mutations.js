import { gql } from '@apollo/client';

export const LOGIN_USER = global`
mutation login($emal: String, password: String){
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;
