import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import FolderIcon from "../assets/folder.png";
import ContextMenu from "./ContextMenu";

const FolderIconDiv = styled.div`
	flex: 1 0 16.5%;
	max-width: 16.5%;

	.link-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		height: 100%;
	}
	.folder-icon {
		width: 72px;
		margin-bottom: 15px;
	}
	.folder-label {
		font-size: 15px;
		font-family: "lato";
		margin-top: auto;
		color: #000;
	}
	.compact-div {
		padding: 20px;
		max-width: 125px;
		margin: auto;
		border-radius: 12px;
		:hover {
			background: #e6f5ff;
		}
	}
`;

function Folder({ folder, parentFolderId, sendDataToParent }) {
	const [show, setShow] = useState(false);
	const [points, setPoints] = useState({ x: 0, y: 0 });
	useEffect(() => {
		const handleClick = () => setShow(false);
		window.addEventListener("click", handleClick);
		const ele = document.getElementById(`folder${folder.id}`);
		document.addEventListener("contextmenu", function (e) {
			const isClickedOutside = !ele.contains(e.target);
			if (isClickedOutside) setShow(false);
		});
		return () => window.removeEventListener("click", handleClick);
	}, []);
	return (
		<>
			<FolderIconDiv
				onContextMenu={(e) => {
					// console.log("right-clicked", e);
					// console.log(e.target.id);
					e.preventDefault();
					setShow(true);
					// console.log(e.pageX);
					// console.log(e.pageY);
					setPoints({ x: e.pageX, y: e.pageY });
				}}
				id={`folder${folder.id}`}
			>
				<div className="compact-div">
					<Link
						to={`/mydrive/folder/${folder.id}`}
						state={{ folder: folder }}
						className="link-btn"
					>
						<img
							src={FolderIcon}
							alt="Folder"
							className="folder-icon"
						/>
						<p className="folder-label">{folder.name}</p>
					</Link>
				</div>
			</FolderIconDiv>
			{show && (
				<ContextMenu
					points={points}
					folder={folder}
					parentFolderId={parentFolderId}
					sendDataToParent={sendDataToParent}
				/>
			)}
		</>
	);
}

export default Folder;
