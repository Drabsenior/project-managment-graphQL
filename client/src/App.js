import Header from "./components/Header";
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client'
import Clients from "./components/Clients";
function App() {

  const cache = new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          clients:{
            merge(existing,incoming){
              return incoming
            }
          },
          projects:{
            merge(existing,incoming){
              return incoming
            }
          }
        }
      }
    }
  })

  const client = new ApolloClient({
    uri:"http://localhost:5000/graphql",
    cache
  })
  return (
    <>
    <ApolloProvider client={client}>

    <Header/>
    <Clients/>
    </ApolloProvider>
    </>
  );
}

export default App;
