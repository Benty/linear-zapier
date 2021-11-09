import { ZObject, Bundle } from "zapier-platform-core";

interface UsersResponse {
  data: {
    users: {
      nodes: {
        id: string;
        email: string;
        name: string;
        displayName: string;
        active: boolean;
      }[];
    };
  };
}

const getUserList = async (z: ZObject, bundle: Bundle) => {
  const response = await z.request({
    url: "https://api.linear.app/graphql",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: bundle.authData.api_key,
    },
    body: {
      query: `
      query {
        users(
          filter: {
            email: {contains: "${bundle.inputData.email}"}
          },
          first: 100) {
          nodes {
            id
            email
            name
            displayName
            active
          }
        }
      }
    `,
    },
    method: "POST",
  });
  const users = (response.json as UsersResponse).data.users.nodes.filter(user => user.active === true);
  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    displayName: user.displayName,
  }));
};

export const searchUsers = {
  key: "user",
  noun: "User",

  display: {
    label: "Get user",
    hidden: false,
    description:
      "The only purpose of this search is to lookup a list of users in the UI.",
  },

  operation: {
    inputFields: [
      {
        key: 'email',
        type: 'string',
        label: 'Email',
        helpText:
          'The email of the user you are searching for.',
      },
    ],

    perform: getUserList,

    sample: {
      id: "xxxx-xxxx-xxxx-xxxx-xxxx",
      name: "Billy Roberts",
      email: "billy@example.com",
      displayName: "Billy",
    },

    outputFields: [
      {key: "id", label: "ID"},
      {key: "name", label: "Name"},
      {key: "email", label: "Email"},
      {key: "displayName", label: "Display Name"},
    ],
  },


};
