import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../assets/close.png";
import AddComponentIcon from "../assets/add_new_button.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import addToDirectory from "../Hooks/addToDirectory";
import addDirectory from "../Hooks/addDirectory";
import { useDriveContext } from "../Hooks/DriveContext";
import { useFocusableInput } from "../Hooks/useFocusableInput";

const FolderIconDiv = styled.div`
	flex: 1 0 16.5%;
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 16.5%;

	.add-icon {
		width: 72px;
		cursor: pointer;
	}
	.modal-div {
		width: 100px;
		height: 300px;
		background: #000;
	}
	button {
		background: transparent;
		border: none;
	}
	.compact-div {
		padding: 20px;
		max-width: 125px;
		margin: auto;
		border-radius: 12px;
		:hover {
			background: #e6f5ff;
		}
		cursor: pointer;
	}
`;
const StyledTextField = styled(TextField)`
	width: 250px;
	border-radius: 12px;
	.root-styles {
		border-radius: 12px;
	}
	div {
		border-radius: 12px;
		font-family: "Work Sans";
		#outlined-error-helper-text-helper-text {
			font-family: "Work Sans" !important;
		}
		.MuiFormHelperText-root {
			font-family: "Work Sans" !important;
		}
	}
	div > p {
		font-family: "Work Sans";
	}
	#outlined-error-helper-text-helper-text {
		font-family: "Work Sans" !important;
	}
	.MuiFormHelperText-root {
		font-family: "Work Sans" !important;
	}
`;
const ModalDiv = styled.div`
	width: 375px;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	border-radius: 20px;
	padding: 10px 10px 62px 10px;
	.add-dialog {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}
	.modal-heading {
		font-size: 20px;
		font-weight: 500;
	}
	.close-icon {
		width: 18px;
		opacity: 0.6;
		cursor: pointer;
		margin-left: auto;
		margin: 10px 10px 0 0;
	}
	.close-btn {
		margin-left: auto;
	}
	.component-selector {
		text-decoration: none;
	}
	.file-btn {
		font-family: "Work Sans";
		border: 1px solid #69696936;
		border-radius: 10px 0 0 10px;
		text-transform: none;
		color: black;
		padding: 2px;
	}
	.folder-btn {
		font-family: "Work Sans";
		border: 1.5px solid #69696936;
		border-radius: 0 10px 10px 0;
		text-transform: none;
		color: black;
		padding: 2px;
	}
	.active {
		background: #4ab7ff;
		border: none;
		outline: 1px solid #4ab7ff;
		color: white;
		:hover {
			background: #4ab7ff;
		}
	}
	.create-btn {
		font-family: "Work Sans";
		text-transform: none;
		background: #4ab7ff;
		color: #fff;
		width: 250px;
		border-radius: 12px;
		padding: 10px;
		font-size: 18px;
		:hover : {
			outline: 1px solid #4ab7ff;
			color: #4ab7ff !important;
		}
	}
	.css-1e6y48t-MuiButtonBase-root-MuiButton-root:hover {
		outline: 1px solid #4ab7ff;
		color: #4ab7ff !important;
	}
	button {
		background: transparent;
		border: none;
	}
`;

function AddComponent({ folderlist, filelist, folderId }) {
	const [open, setOpen] = React.useState(false);
	const [isFileSelected, setIsFileSelected] = React.useState(true);
	const [newFilename, setNewFilename] = React.useState("");
	const [newFilenameError, setNewFilenameError] = React.useState(false);
	const driveContext = useDriveContext();

	const DriveData =
		JSON.parse(localStorage.getItem("Drive")) ??
		driveContext?.directoryState;

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setNewFilename("");
		console.log("close");
	};

	// for files to have extension
	let extension;
	if (newFilename.includes(".")) {
		var index = newFilename.lastIndexOf(".");
		extension = newFilename.substring(index + 1);
	}

	React.useEffect(() => {
		let isNameMatching = false;

		if (isFileSelected) {
			if (filelist) {
				filelist.map((file) => {
					if (file.name === newFilename) isNameMatching = true;
				});
			}
		} else {
			if (folderlist) {
				folderlist.map((folder) => {
					if (folder.name === newFilename) isNameMatching = true;
				});
			}
		}

		// deciding error
		if (isNameMatching || newFilename.length === 0)
			setNewFilenameError(true);
		else if (isFileSelected && (!extension || extension.length === 0))
			setNewFilenameError(true);
		else setNewFilenameError(false);
	}, [newFilename]);

	function getErrorName() {
		if (newFilenameError) {
			if (newFilename.length === 0) {
				return "Filename can't be empty";
			} else if (
				isFileSelected &&
				(!extension || extension.length === 0)
			) {
				return "Files should have extensions.";
			} else return "File/Folder name already exists.";
		}
		return null;
	}

	return (
		<FolderIconDiv>
			<button onClick={handleOpen}>
				<div className="compact-div">
					<img
						src={AddComponentIcon}
						alt="AddComponent"
						className="add-icon"
					/>
				</div>
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				hideBackdrop={true}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalDiv className="modal-div">
					<div className="add-dialog">
						<button onClick={handleClose} className="close-btn">
							<img
								src={CloseIcon}
								alt="Close"
								className="close-icon"
							/>
						</button>
						<p className="modal-heading">Create new</p>
						<div className="component-selector">
							<Button
								className={`${
									isFileSelected ? "active" : ""
								} file-btn`}
								onClick={() => setIsFileSelected(true)}
							>
								File
							</Button>
							<Button
								className={`${
									!isFileSelected ? "active" : ""
								} folder-btn`}
								onClick={() => setIsFileSelected(false)}
							>
								Folder
							</Button>
						</div>

						<StyledTextField
							value={newFilename}
							error={newFilenameError}
							id="outlined-error-helper-text"
							placeholder="Enter name"
							variant="outlined"
							classes={{ root: "root-styles" }}
							helperText={getErrorName()}
							onChange={(event) => {
								setNewFilename(event.target.value);
							}}
							inputRef={useFocusableInput}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									addDirectory(
										folderId,
										DriveData,
										newFilename,
										isFileSelected,
										driveContext
									);
									handleClose();
								}
							}}
						/>
						<Button
							className="create-btn"
							disabled={newFilenameError}
							onClick={() => {
								addDirectory(
									folderId,
									DriveData,
									newFilename,
									isFileSelected,
									driveContext
								);
								handleClose();
								console.log("reached here");
							}}
						>
							Create
						</Button>
					</div>
				</ModalDiv>
			</Modal>
		</FolderIconDiv>
	);
}

export default AddComponent;
