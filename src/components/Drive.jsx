import React from "react";
import BreadcrumbBar from "./BreadcrumbBar";
import FolderView from "./FolderView";
import { DriveContextProvider } from "../Hooks/DriveContext";

function Drive() {
	return (
		<DriveContextProvider>
			<BreadcrumbBar />
			<FolderView />
		</DriveContextProvider>
	);
}

export default Drive;
