import React from 'react'

export default function SortBy({value, onChange}){
	const menu = [
		{name: 'Best match', value:''},
		{name: 'Most stars', value:'sort:stars'},
		{name: 'Fewest stars', value:'sort:stars-asc'},
		{name: 'Most forks', value:'sort:forks'},
		{name: 'Fewest forks', value:'sort:forks-asc'},
		{name: 'Recently updated', value:'sort:updated'},
	]

	// items
	let MenuItems = menu.map(item=>{
		let btnClass = "dropdown-item " + (getActiveItemName() === item.name && "active")
		return (
			<div className={btnClass}
			     key={item.name}
			     onClick={onChange.bind(this, item.value)}>
				{item.name}
			</div>
		)
	})

	function getActiveItemName () {
		for (let i of menu){
			if (i.value === value) return i.name
		}
		return menu[0].name
	}

	return (
		<div className="dropdown">
			<button className="btn btn-outline-primary dropdown-toggle"
			        type="button"
			        id="dropdownMenuButton"
			        data-toggle="dropdown">
				sort by:  <b>{ getActiveItemName() }</b>
			</button>
			<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
				{ MenuItems }
			</div>
		</div>
	)
}
