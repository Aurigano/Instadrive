import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import FolderIcon from "../assets/folder.png";

const FolderIconDiv = styled.div`
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
	}
	.folder-label {
		margin-top: auto;
		color: #000;
	}
`;

function Folder({ folder }) {
	return (
		<FolderIconDiv>
			<Link
				to={`/mydrive/folder/${folder.id}`}
				state={{ folder: folder }}
				className="link-btn"
			>
				<img src={FolderIcon} alt="Folder" className="folder-icon" />
				<p className="folder-label">{folder.name}</p>
			</Link>
		</FolderIconDiv>
	);
}

export default Folder;
