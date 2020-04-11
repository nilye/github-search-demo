import React from 'react'

export default function History({value, trigger, onChange}) {

	let Records = value.map(record => {
		return (
			<div className="dropdown-item"
          key={record}
          onClick={onChange.bind(this, record)}>
				{ record }
			</div>
		)
	})

	let menuClass = "dropdown-menu " + (trigger ? 'show' : '')

	return (
		<div className="dropdown" id="search-history">
			<div className={menuClass}>
				{ Records }
			</div>
		</div>
	)
}
