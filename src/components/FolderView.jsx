import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { useDriveContext } from "../Hooks/DriveContext";
import { useFolder } from "../Hooks/useFolder";
import File from "./File";
import Folder from "./Folder";
import getFolderData from "../Hooks/getObjectFromDirectory";
import AddComponent from "./AddComponent";
import RenameModal from "./RenameModal";

const FolderDiv = styled.div`
	margin: 20px;
	display: flex;
	flex-wrap: wrap;
`;

function FolderView() {
	const [renameModalItem, setRenameModalItem] = useState({});
	const [isFileSelected, setIsFilSelected] = useState(false);
	const driveContext = useDriveContext();
	const { folderId = null } = useParams();
	const { state = {} } = useLocation();
	const DriveData =
		JSON.parse(localStorage.getItem("Drive")) ??
		driveContext?.directoryState;
	let folderInfo = getFolderData(DriveData, folderId, state?.folder);

	if (!folderInfo) {
		folderInfo = DriveData;
	}
	const folders = folderInfo?.children?.folders;
	const files = folderInfo?.children?.files;

	console.log("folderInfo", folderId, state, folderInfo, folders, files);

	// useEffect(() => {
	// 	console.log("abc", folderId, state);
	// });

	// useEffect(() => {
	// 	console.log("changed", driveContext?.directoryState);
	// }, [driveContext?.directoryState]);

	function sendDataToParent(isFileSelectedFromChild, item) {
		setRenameModalItem(item);
		setIsFilSelected(isFileSelectedFromChild);
	}

	return (
		<FolderDiv>
			{folders &&
				folders.map((folder, index) => (
					<Folder
						key={`${folder.id}`}
						folder={folder}
						parentFolderId={folderInfo.id}
						folderlist={folders}
						filelist={files}
						sendDataToParent={sendDataToParent}
					/>
				))}
			{files &&
				files.map((file, index) => (
					<File
						key={`${file.name}${index}`}
						file={file}
						parentFolderId={folderInfo.id}
						folderlist={folders}
						filelist={files}
						sendDataToParent={sendDataToParent}
					/>
				))}
			<AddComponent
				folderlist={folders}
				filelist={files}
				folderId={folderId}
			/>
			<RenameModal
				folder={!isFileSelected && renameModalItem}
				file={isFileSelected && renameModalItem}
				parentFolderId={folderInfo.id}
				folderlist={folders}
				filelist={files}
			/>
		</FolderDiv>
	);
}

export default FolderView;
