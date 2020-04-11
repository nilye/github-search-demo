import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { SEARCH_QUERY } from '../data/query'
import moment from 'moment'

/*
* Apollo query
* https://www.apollographql.com/docs/react/data/queries/
*
* Github GraphQL
* about search query filter
* https://help.github.com/en/github/searching-for-information-on-github/searching-for-repositories#search-based-on-whether-a-repository-is-a-mirror
*
* about sorting search results
* https://help.github.com/en/github/searching-for-information-on-github/sorting-search-results
* */
export default function RepoList({query, sortBy, filter}){
	if (!query) return ''

	const {loading, error, data} = useQuery(SEARCH_QUERY, {
		variables: {
			query: `${query} ${sortBy} ${[...filter].join(' ')}`
		},
		/*
		* It seems like Github GraphQL will return Errors alongside data. Use 'ignore' error policy to handle this!
		* https://www.apollographql.com/docs/react/data/error-handling/#error-policies
		* */
		errorPolicy: "ignore"
	})


	if (loading) return (
		<div className="d-flex align-items-center justify-content-center">
			<div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
			<span className="ml-2">loading...</span>
		</div>
	)

	if (error) {
		return <div className="alert alert-danger" role="alert">error occurred: {JSON.stringify(error)}</div>
	}

	if (data && data.search && data.search.nodes.length == 0){
		return <p>no results</p>
	}

	return data.search.nodes.map(item=>{
		return <RepoItem data={item} key={item.id}></RepoItem>
	})
}


// render item
function RepoItem({ data }){
	function toThousand(num){
		return  num > 1000 ? (num / 1E3).toFixed(1) + 'k' : num
	}

	let primaryLang
	if (data.primaryLanguage){
		primaryLang = (
			<span className="mr-3">
				<span className="lang-color" style={{backgroundColor: data.primaryLanguage.color || ''}}></span>
				<small>  {data.primaryLanguage.name}</small>
			</span>
		)
	}

	return (
		<div className="card my-4">
			<div className="card-body">
				<a href={data.url} target="_blank">
					<span className="h5 card-title">{data.nameWithOwner}</span>
				</a>

				<p className="card-text">{data.description}</p>

				<div className=".d-flex">
					<small className="mr-3">
						Stars:
						<b> { toThousand(data.stargazers.totalCount) }</b>
					</small>
					<small className="mr-3">
						Forks:
						<b> { toThousand(data.forks.totalCount) }</b>
					</small>
					{primaryLang}
					<small className="mr-3">{data.licenseInfo && (data.licenseInfo.nickname || data.licenseInfo.name)}</small>
					<small className="mr-3">Updated {moment(data.updatedAt).fromNow()}</small>
				</div>
			</div>
		</div>
	)
}
