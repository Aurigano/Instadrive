import React, { useState } from "react";
import styled, { css } from "styled-components";
import deleteDirectory from "../Hooks/deleteDirectory";
import { useDriveContext } from "../Hooks/DriveContext";

const ContextMenuDiv = styled.div`
	border-radius: 15px;
	box-sizing: border-box;
	position: absolute;
	width: 200px;
	background-color: #fff;
	box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.4);
	// top: ${(props) => `${props.top}px`};
	// left: ${({ left }) => `${left}px`};
	${({ top, left }) => css`
		top: ${top}px;
		left: ${left}px;
	`}
	z-index:1;
	display: flex;
	flex-direction: column;
	.context-btn {
		background: transparent;
		border: none;
		padding: 15px;
		font-size: 15px;
		font-weight: 500;
		text-align: left;
		color: #4c545b;
		cursor: pointer;
		:hover {
			background: #eeeff1;
			border-radius: 15px;
		}
	}
	.rename-btn {
		:hover {
			border-radius: 15px 15px 0 0;
		}
	}
	.delete-btn {
		color: #ff4f37;
		:hover {
			background: #ffe0dc;
			border-radius: 0 0 15px 15px;
		}
	}
`;

function ContextMenu({
	points,
	folder,
	file,
	parentFolderId,
	sendDataToParent,
}) {
	const driveContext = useDriveContext();
	const { isModalOpen, setModalOpen } = driveContext;
	const handleOpen = () => {
		setModalOpen(true);
	};

	// React.useEffect(() => {
	// 	console.log("from context", isModalOpen);
	// }, [isModalOpen]);

	const DriveData =
		JSON.parse(localStorage.getItem("Drive")) ??
		driveContext?.directoryState;
	// console.log("from context", DriveData);
	// console.log(parentFolderId);
	const isFileSelected = !!file; // boolean shorthand to check if it exists

	return (
		<ContextMenuDiv top={points.y} left={points.x}>
			<button
				onClick={() => {
					handleOpen();
					sendDataToParent(
						isFileSelected,
						isFileSelected ? file : folder
					);
				}}
				className="context-btn rename-btn"
			>
				Rename
			</button>
			<button
				onClick={() =>
					deleteDirectory(
						parentFolderId,
						DriveData,
						isFileSelected ? file.name : folder.name,
						isFileSelected,
						driveContext
					)
				}
				className="context-btn delete-btn"
			>
				Delete
			</button>
		</ContextMenuDiv>
	);
}

export default ContextMenu;

/**
 * <ModalDiv className="modal-div">
					<div className="add-dialog">
						<Button onClick={handleClose} className="close-btn">
							<img
								src={CloseIcon}
								alt="Close"
								className="close-icon"
							/>
						</Button>
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
						<TextField
							value={newFilename}
							error={newFilenameError}
							id="outlined-error-helper-text"
							placeholder="Outlined"
							variant="outlined"
							helperText={
								newFilenameError
									? "File/Folder name already exists."
									: null
							}
							onChange={(event) => {
								setNewFilename(event.target.value);
							}}
						/>
						<Button
							className="create-btn"
							disabled={newFilenameError}
							onClick={() => {
								addToDirectory(
									isFileSelected,
									folderId,
									driveContext,
									newFilename
								);
								handleClose();
							}}
						>
							Create
						</Button>
					</div>
				</ModalDiv>
 */
