const { ApolloServer, gql } = require("apollo-server");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const uid = require("nanoid");
const adapter = new FileSync("contacts.json");
const db = low(adapter);
var moment = require('moment');

db.defaults({
  contacts: []
}).write();

const server = new ApolloServer({
  resolvers: {
    Query: {
      contacts() {
        return db.get("contacts").value();
      },
      contact(_, { id }) {
        return db
          .get("contacts")
          .find({ id })
          .value();
      }
    },
    Mutation: {
      async addContact(_, { contact }) {
        let newContact = { ...contact, id: uid(), modified: moment().format('DD-MM-YYYY HH:mm'), created: moment().format('DD-MM-YYYY HH:mm') };
        await db
          .get("contacts")
          .push(newContact)
          .write();
        return newContact;
      },
      async deleteContact(_, { id }) {
        await db
          .get("contacts")
          .remove({ id })
          .write();
        return true;
      },
      async updateContact(_, { contact }) {
        await db
          .get("contacts")
          .find({ id: contact.id })
          .assign({ ...contact, modified: moment().format('DD-MM-YYYY HH:mm') })
          .write();

        return db
          .get("contacts")
          .find({ id: contact.id })
          .value();
      }
    }
  },
  typeDefs: `
    type Contact {
      id: ID
      name: String
      email: String
      modified: String
      created: String
    }

    input InputContact {
      id: ID
      name: String
      email: String
    }

    type Query {
      contacts: [Contact]
      contact(id: ID): Contact
    }

    type Mutation {
      addContact(contact: InputContact): Contact
      deleteContact(id: ID): Boolean
      updateContact(contact: InputContact): Contact
    }
  `,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});

server.listen(3001).then(() => {
  console.log("running @ http://localhost:3001");
});
