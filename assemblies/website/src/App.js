import './App.css';
import Pictures from './pictures'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'ws://localhost:8083/v1/graphql',
    options: {
      reconnect: true,
      timeout: 30000
    
    }
   }),
   cache: new InMemoryCache(),
 });

function App() {
  return (
    <ApolloProvider client={client}>
       <div className="mainContainer">
        <div id="weatherSection"><h1>Weather</h1></div>
        <div id="calendarSection"><h1>Calendar</h1></div>
        <div id="pictureSection">
          <Pictures />
        </div>
      </div>
    </ApolloProvider>
  );
}


export default App;
