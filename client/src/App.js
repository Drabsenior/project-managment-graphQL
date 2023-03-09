import Header from "./components/Header";
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client'
import Clients from "./components/Clients";
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import Project from "./pages/Project";
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
    <Router>
           <Header/>

     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/project/:id" element={<Project/>}/>
      <Route path="*" element={<Nopage/>}/>
     </Routes>
    
    </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
