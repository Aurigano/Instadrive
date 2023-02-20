import React from "react";
import FileIcon from "../assets/file.png";
import styled from "styled-components";

const FileIconDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.file-icon {
		width: 72px;
	}
	.file-label {
		margin-top: auto;
	}
`;

function File({ file }) {
	return (
		<FileIconDiv>
			<img src={FileIcon} alt="File" className="file-icon" />
			<p className="file-label">{file.name}</p>
		</FileIconDiv>
	);
}

export default File;
