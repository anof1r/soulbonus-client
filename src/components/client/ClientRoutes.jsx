import { Routes, Route } from "react-router-dom";
import React, { lazy } from "react";
const CompanyPage = lazy(() => import("./CompanyPage"));
const CompanyMenu = lazy(() => import("./CompanyMenu"));

export default function ClientRoutes({setThisCompany, thisCompany, setSearchOrgnization,filtredOrganization}) {
	return (
		<div>
			<Routes>
				<Route
					exact
					path="/:id"
					element={
						<CompanyPage
							setCompany={setThisCompany}
							company={thisCompany}
						/>
					}
				></Route>
				<Route
					path="/"
					element={
						<CompanyMenu
							setSearchOrgnization={setSearchOrgnization}
							filtredOrganization={filtredOrganization}
							setCompany={setThisCompany}
						/>
					}
				></Route>
			</Routes>
		</div>
	)
}
