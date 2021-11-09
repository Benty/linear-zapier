import { ZObject, Bundle } from "zapier-platform-core";

interface TeamProjectsResponse {
  data: {
    projects: {
      nodes: {
        id: string;
        name: string;
        state: string;
        progress: number;
        url: string;
      }[];
    };
  };
}

const getProjectList = async (z: ZObject, bundle: Bundle) => {
  // if (!bundle.inputData.team_id) {
  //   throw new z.errors.HaltedError(`Please select the team first`);
  // }

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
        projects(filter: {id: {eq: "${bundle.inputData.project_id}"}}, first:100) {
          nodes {
            id
            name
            state
            progress
            url
          }
        }
      }`,
    },
    method: "POST",
  });

  const data = (response.json as TeamProjectsResponse).data;
  return data.projects.nodes; // .filter((project) => ["started", "planned", "paused"].indexOf(project.state) >= 0);
};

export const searchProjects = {
  key: "project",
  noun: "Project",

  display: {
    label: "Get issue project",
    hidden: false,
    description:
      "The only purpose of this search is to lookup the project of an issue.",
  },

  operation: {

    inputFields: [
      {
        key: 'project_id',
        type: 'string',
        label: 'Project ID',
        helpText:
          'The id of the project you are searching for.',
      },
    ],

    perform: getProjectList,

    sample: {
      id: "xxxxxxxx",
      name: "New Project",
      state: "In Progress",
      progress: "0.0",
      url: "https://linear.app/ACME/project/project-name"
    },

    outputFields: [
      {key: "id", label: "ID"},
      {key: "name", label: "Name"},
      {key: "state", label: "State"},
      {key: "progress", label: "Progress"},
      {key: "url", label: "URL"},
    ],

  },
};
