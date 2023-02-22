import React, { useState, useEffect } from "react";
import FileIcon from "../assets/file.png";
import styled from "styled-components";
import ContextMenu from "./ContextMenu";

const FileIconDiv = styled.div`
	flex: 1 0 16.5%;
	max-width: 16.5%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.file-icon {
		width: 72px;
	}
	.file-label {
		margin-top: auto;
		font-size: 15px;
		font-family: "lato";
	}
	.compact-div {
		padding: 20px;
		max-width: 125px;
		margin: auto;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.ext-div {
		background: #ce3817;
		color: #fff;
		padding: 5px;
		font-size: 15px;
		border-radius: 5px;
		position: absolute;
		bottom: 40px;
		right: 20px;
	}
`;

function File({ file, parentFolderId, sendDataToParent }) {
	let extension = undefined;
	if (file.name.includes(".")) {
		var index = file.name.lastIndexOf(".");
		extension = file.name.substring(index + 1);
	}
	const [show, setShow] = useState(false);
	const [points, setPoints] = useState({ x: 0, y: 0 });
	useEffect(() => {
		const handleClick = () => setShow(false);
		window.addEventListener("click", handleClick);
		const ele = document.getElementById(`file${file.name}`);
		document.addEventListener("contextmenu", function (e) {
			const isClickedOutside = !ele.contains(e.target);
			if (isClickedOutside) setShow(false);
		});
		return () => window.removeEventListener("click", handleClick);
	}, []);
	return (
		<>
			<FileIconDiv
				onContextMenu={(e) => {
					// console.log("right-clicked", e);
					// console.log(e.target.id);
					e.preventDefault();
					setShow(true);
					// console.log(e.pageX);
					// console.log(e.pageY);
					setPoints({ x: e.pageX, y: e.pageY });
				}}
				id={`file${file.name}`}
			>
				<div className="compact-div">
					<img src={FileIcon} alt="File" className="file-icon" />
					<p className="file-label">{file.name}</p>
					{extension && <div className="ext-div">{extension}</div>}
				</div>
			</FileIconDiv>
			{show && (
				<ContextMenu
					points={points}
					file={file}
					parentFolderId={parentFolderId}
					sendDataToParent={sendDataToParent}
				/>
			)}
		</>
	);
}

export default File;
