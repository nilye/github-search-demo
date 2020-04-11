import React, { useState } from 'react'
import RepoList from '../component/repo-list'
import SortBy from '../component/sort-by'
import Filter from '../component/filter'
import History from '../component/history'

export default function Home(){
	const [query, setQuery] = useState(''),
		[searchText, setSearchText] = useState(''),
		[sortBy, setSortBy] = useState(''),
		[filter, setFilter] = useState(new Set()),
		[history, setHistory] = useState(JSON.parse(localStorage.getItem('search-history')) || []),
		[showHistory, toggleHistory] = useState(false)

	// debounce consecutive events
	function debounce(cb, time = 1000) {
		let timeout
		return function(event){
			window.clearTimeout(timeout)
			/*
			* signal to React not to nullify the event object
			* https://reactjs.org/docs/events.html#event-pooling
			* */
			if (event.persist) event.persist()
			timeout = setTimeout(()=>{
				cb(event)
			}, time)
		}
	}

	function updateQuery(e){
		setQuery(e.target.value)
	}

	function updateSearchText(e){
		// type validation
		let value
		if (typeof e == 'string') value = e
		else if (e.target){
			value = e.target.value
		} else return

		// check empty value
		value = value.trim()
		if (!value) return

		// set state
		setSearchText(value)
		setQuery(value)

		// set history
		const duplicatedIndex = history.indexOf(value)
		let newHistory = history.slice()
		if (duplicatedIndex !== -1){
			newHistory.splice(duplicatedIndex, 1)
		}
		newHistory.unshift(value)
		if (newHistory.length > 5){ // can't exceed 5 records
			newHistory = newHistory.slice(0, 5)
		}
		setHistory(newHistory)
		localStorage.setItem('search-history', JSON.stringify(newHistory))
	}

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<div className="input-group my-1 mx-auto" style={{maxWidth: 720+'px'}}>
					<input type="text"
					       className="form-control"
					       placeholder="Search Github"
					       value={query}
					       onFocus={toggleHistory.bind(this, true)}
					       onBlur={debounce(toggleHistory.bind(this, false), 100)}
					       onKeyUp={debounce(updateSearchText)}
					       onChange={updateQuery}/>
					<History value={history} trigger={showHistory} onChange={updateSearchText}></History>
				</div>
			</nav>


			<div className="container" style={{maxWidth: 750+'px'}}>

				{/* sort and filter */}
				<div className="d-flex align-items-center justify-content-between my-4">
					<SortBy value={sortBy} onChange={setSortBy}></SortBy>
					<Filter value={filter} onChange={setFilter}></Filter>
				</div>

				{/* results */}
				<RepoList query={searchText} sortBy={sortBy} filter={filter}></RepoList>

			</div>
		</div>
	)
}
