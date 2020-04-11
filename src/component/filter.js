import React from 'react'

export default function Filter({value, onChange}){
	const filters = [
		{name: 'JavaScript Only', value: 'language:javascript'},
		{name: 'More than 10K stars', value: 'stars:>=10000'}
	]

	let FilterItems = filters.map((item, index)=>{
		const name = 'filterRadio' + index
		return (
			<div className="custom-control custom-checkbox custom-control-inline"
			     key={item.name}>
				<input type="checkbox"
				       id={name}
				       name={name}
				       value={value.has(item.value)}
				       onChange={onClick.bind(this, item.value)}
				       className="custom-control-input"/>
				<label className="custom-control-label"
				       htmlFor={name}>
					{ item.name }
				</label>
			</div>
		)
	})

	function onClick(val){
		value.has(val) ? value.delete(val) : value.add(val)
		/*
		* Mutating `Set` will NOT trigger react to update, have to assign a new Set.
		*/
		onChange(new Set(value))
	}

	return (
		<div >
			<span className="mr-3"></span>
			{ FilterItems }
		</div>
	)
}
