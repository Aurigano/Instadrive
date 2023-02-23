import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import CloseIcon from "../assets/close.png";
import { useDriveContext } from "../Hooks/DriveContext";
import renameDirectory from "../Hooks/renameDirectory";
import { useFocusableInput } from "../Hooks/useFocusableInput";

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

function RenameModal({ folder, file, parentFolderId, folderlist, filelist }) {
	const isFileSelected = !!file;
	const [newFilename, setNewFilename] = useState("");
	const [newFilenameError, setNewFilenameError] = useState(false);
	const driveContext = useDriveContext();
	const { isModalOpen, setModalOpen } = driveContext;
	const handleOpen = () => {
		setModalOpen(true);
	};
	const handleClose = () => {
		setModalOpen(false);
		setNewFilename("");
	};
	const DriveData =
		JSON.parse(localStorage.getItem("Drive")) ??
		driveContext?.directoryState;

	function getErrorName() {
		if (newFilenameError) {
			if (newFilename.length === 0) {
				return "Filename can't be empty";
			} else return "File/Folder name already exists.";
		}
		return null;
	}

	useEffect(() => {
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
		const itemName = isFileSelected ? file.name : folder.name;
		if (newFilename === itemName) setNewFilenameError(false);
		else if (isNameMatching || newFilename.length === 0)
			setNewFilenameError(true);
		else setNewFilenameError(false);
	}, [newFilename]);

	return (
		<Modal
			open={isModalOpen}
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
					<p className="modal-heading">Rename</p>

					<StyledTextField
						value={newFilename}
						error={newFilenameError}
						id="outlined-error-helper-text"
						placeholder="Enter name"
						variant="outlined"
						helperText={getErrorName()}
						onChange={(event) => {
							setNewFilename(event.target.value);
						}}
						inputRef={useFocusableInput}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								renameDirectory(
									parentFolderId,
									DriveData,
									isFileSelected ? file.name : folder.name,
									isFileSelected,
									newFilename,
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
							renameDirectory(
								parentFolderId,
								DriveData,
								isFileSelected ? file.name : folder.name,
								isFileSelected,
								newFilename,
								driveContext
							);
							handleClose();
						}}
					>
						Rename
					</Button>
				</div>
			</ModalDiv>
		</Modal>
	);
}

export default RenameModal;
