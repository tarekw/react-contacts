import { gql } from 'apollo-boost';

export const GET_CONTACT = gql`
  query contact($id: ID!) {
    contact(id: $id) {
      id,
      name
      email,
      modified,
      created
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation addContact($contact: InputContact) {
    addContact(contact: $contact) {
      id
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact($contact: InputContact) {
    updateContact(contact: $contact) {
      id
    }
  }
`;

export const ALL_CONTACTS = gql`
  {
    contacts {
      name
      id
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;
