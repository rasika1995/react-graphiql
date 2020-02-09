import React from 'react';
import './App.css';

import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

import schema from './schema'


/*import { loader } from 'graphql.macro';
const currentUserQuery = loader('./schema_graphql.graphql');


const { buildSchema } = require('graphql');
const sdlSchema = currentUserQuery.loc.source.body;

const graphqlSchemaObj = buildSchema(sdlSchema);*/


function graphQLFetcher(graphQLParams) {
  return fetch("http://localhost:4000/graphql", {
    method: 'post',
    headers: { 'Content-Type': 'application/json'},

    body: JSON.stringify(graphQLParams),
    
  }).then(response => response.json());
}


function App() {
 //console.log(graphqlSchemaObj )
  return (
    <div className="App">
          <GraphiQL fetcher={(graphQLFetcher)} schema = {schema}/>   
    </div>
  );
}

export default App;
