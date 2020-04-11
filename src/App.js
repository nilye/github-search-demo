import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import Home from './page/home'

//
const client = new ApolloClient({
	uri: "https://api.github.com/graphql",
	headers: {
		Authorization: 'bearer ' + $TOKEN
	}
})

export default function App (){
	return (
		<ApolloProvider client={client}>
			<Home/>
		</ApolloProvider>
	)
}
