import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
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

export const ADD_USER = gql`
mutation addUser($username: String, $email: String, $password: String){
    addUser(username: $username, email: $email, password: $password) {
        token 
        user {
            _id
            username
            email
            bookCount
            savedBooks{
                #savedBooks: [book]
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
}
`;

export cont REMOVE_BOOK = gql`
mutation saveBook($newBook: bookInfo){
    saveBook (newBook: $newBook){
        bookIdauthors
        description
        title
        image
        link
    }
}
`; 

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String){
    removeBook(bookId: $bookId){
        _id
        username
        email
        savedBooks{
            # savedBooks: [book]
            bookId 
            authorsdescription
            titleimage
            link
        }
    }
}
`; 