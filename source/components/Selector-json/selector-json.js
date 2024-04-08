import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Selector-json/styles/selector-json.scss"


const SelectorJsonReducer = ( state, [ type, data ], props ) => {

	if( type === "list" ){
		return{
			...state,
			list: data,
			searchList: data
		}
	};

	if( type == "select" ){
		let selected = { id: 0 };
		let index = state.list.findIndex(( item ) => item.id === data.id );

		if( index > -1 )
			selected = { ...state.list[ index ] };

		return {
			...state,
			selected: selected
		};
	};

	if( type == "change" ){
		let selected = { ...state.selected };
		selected[ data.field ] = data.value;
		return {
			...state,
			selected: selected
		};
	};
	if( type == "save" ){
		let list = [ ...state.list ];
		let listIndex = list.findIndex(( item ) => item.id === state.selected.id );

		if( listIndex > -1 )
			list[ listIndex ] = { ...state.selected };

		let searchList = [ ...state.searchList ];
		let searchIndex = searchList.findIndex(( item ) => item.id === state.selected.id );

		if( searchIndex > -1 )
			searchList[ searchIndex ] = { ...state.selected };

		return {
			...state,
			list: list,
			searchList: searchList,
		};
	};

	if( type === "search" ){
		let list = [...state.list];
		let search = data.value || "";
		let searchLower = search.toLowerCase();
		let searchList = [];

		for( const item of state.list ){

			if( item.key.toLowerCase().indexOf( searchLower ) < 0 )
				continue;

			searchList.push( item );
		};

		return {
			...state,
			list: list,
			search: search,
			searchList: searchList
		};
	};

	return state;
};

const SelectorJsonTable = [
	{ field: "name", title: "Name" },
	{ field: "age", title: "Age" },
	{ field: "email", title: "Email" },
	{ field: "position", title: "Position" },
	{ field: "department", title: "Department" },
	{ field: "company", title: "Company" },
];

export const SelectorJson = (props, data) => {

	const [ state, dispatch ] = useReducer( SelectorJsonReducer, {
		list: [],
		selected: { id: 0 },
		searchList: [],
		search: ""
	});

	const getList = () => {
		fetch( "/assets/requests/list.json" )
		.then(( data ) => data.json() )
		.then(( data ) => {

			console.log(data);

			if( !data )
				return;

			let listing = [];

			for( let item of data ){
				listing.push({
					id: item.id,
					name: item.name +" "+  item.surname,
					surname: item.surname,
					age: item.age,
					email: item.email,
					key: item.name + " " +  item.surname,
					position: item.position,
					department: item.department,
					company: item.company,
					value: ""
				});
			}

			dispatch([ "list", listing ]);

		}).catch(( e ) => {});
  	};

	useEffect(() => {
		getList();
	}, []);

	return(
		<article className={"list"}>

		<section className={"list-wrap"}>
			<div className={"list-inp"}>
				<input className={"list-inp-value"}
					   placeholder={"Search user"}
					   value={ state.search }
					   onChange={(event) => dispatch([ "search", { value: event.target.value } ])  }
				/>
			</div>

			<section className={"list-body"} >
				{
					state.searchList.map((item, index)=>{
						return(
							<div className={"list-block-wrap"} onClick={()=>{ dispatch([ "select", { id: item.id } ]) }} key={item.key}>
								<p className={"list-block-wrap-i"}>	{}</p>

								<p className={"list-block"}>
									<span className={"list-block-item"}>{ item.name }</span>
								</p>
							</div>
						)
					})
				}
			</section>

		</section>

			<section className={"list-profile-wrap " + (state.selected.id ? "list-profile-active" : "")}>
				<div className={"list-profile"}>

					<div  className={"list-profile-i"}>
						<p className={"list-profile-i-title"}>Profile</p>
						<p className={"list-profile-i-item"}>{}</p>
						<p className={"list-profile-btn"} onClick={() => dispatch(["save" ]) }>Save</p>
					</div>
					{
						SelectorJsonTable.map(( item ) => {
							return (
								<p key={ item.field } className={"list-profile-item"}>
									<span  className={"list-profile-item-text"}>{ item.title } </span>
									<input
										className={"list-profile-item-inp"}
										disabled={ !state.selected.id }
										value={ state.selected[ item.field ] || "" }
										onChange={( e ) => dispatch([ "change", { field: item.field, value: e.target.value } ]) }
									/>
								</p>
							);
						})
					}
				</div>
			</section>

		</article>
	)
};