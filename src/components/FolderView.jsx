import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { useDriveContext } from "../Hooks/DriveContext";
import { useFolder } from "../Hooks/useFolder";
import File from "./File";
import Folder from "./Folder";
import getFolderData from "../Hooks/getObjectFromDirectory";

const FolderDiv = styled.div`
	margin: 20px;
	display: flex;
	gap: 20px;
`;

function FolderView() {
	const driveContext = useDriveContext();
	const { folderId } = useParams();
	const { state = {} } = useLocation();
	// const folderInfo = useFolder(folderId, state?.folder);
	console.log(driveContext?.directoryState, folderId, state);
	let folderInfo = getFolderData(
		driveContext?.directoryState,
		folderId,
		state?.folder
	);

	if (!folderInfo) {
		console.log(folderInfo);
		folderInfo = driveContext?.directoryState;
	}
	console.log(folderId, state);
	console.log("will print next", folderInfo);
	const folders = folderInfo?.children?.folders;
	const files = folderInfo?.children?.files;
	console.log("folders", folders);
	console.log("files", files);
	useEffect(() => {
		console.log("abc", folderId, state);
	}, [folderId, state?.folder]);

	return (
		<FolderDiv>
			{folders &&
				folders.map((folder) => (
					<Folder key={`${folder.id}`} folder={folder} />
				))}
			{files &&
				files.map((file, index) => (
					<File key={`${file.name}${index}`} file={file} />
				))}
		</FolderDiv>
	);
}

export default FolderView;
