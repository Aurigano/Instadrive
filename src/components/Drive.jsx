import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadcrumbBar from "./BreadcrumbBar";
import FolderView from "./FolderView";
import { DriveContextProvider } from "../Hooks/DriveContext";

function Drive() {
	// const { folderId } = useParams();
	// console.log(folderId);
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	console.log("reached here1");
	// 	console.log(folderId);
	// 	if (!folderId) {
	// 		console.log("reached here2");
	// 		navigate("/mydrive");
	// 	}
	// }, [folderId]);
	return (
		<DriveContextProvider>
			<BreadcrumbBar />
			<FolderView />
		</DriveContextProvider>
	);
}

export default Drive;
