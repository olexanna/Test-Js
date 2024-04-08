import React, { useReducer, useState } from "react";
import "@styles/main.scss"
import "@styles/fonts.scss"
import "@styles/app.scss"
import {SelectorJson } from "@components/Selector-json/selector-json";

const AppReducer = ( state, [ type, data ] ) => {

};


export const App = () => {

	return (
		<article className={"app"}>
			<SelectorJson/>
		</article>
	);
};