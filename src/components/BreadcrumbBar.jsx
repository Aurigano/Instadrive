import React from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Arrow from "../assets/arrow_up.png";
import { useDriveContext } from "../Hooks/DriveContext";
import getBreadcrumb from "../Hooks/getBreadcrumb";

const BreadcrumbDiv = styled.div`
	background-color: transparent;
	border-bottom: 1px solid #69696950;
	padding: 0 10px;
	margin: 0 10px;
	height: 50px;
	display: flex;
	gap: 10px;
	.backBtnClass {
		background: transparent;
		border: none;
		opacity: 0.8;
		cursor: pointer;
		position: relative;
		top: 2px;
	}
	.imgClass {
		transform: rotate(270deg);
	}
	.parent-btn {
		background: transparent;
		border: none;
		display: inline-flex;
		align-content: center;
		text-align: center;
		flex-wrap: wrap;
		font-size: 18px;
	}
	.breadcrumb-text {
		color: #69696980;
		cursor: pointer;
	}
	.current-route {
		color: #000;
		cursor: auto;
	}
	.divider {
		font-weight: 300;
	}
`;

function BreadcrumbBar() {
	const driveContext = useDriveContext();
	const { folderId } = useParams();
	const { state = {} } = useLocation();
	const DriveData =
		JSON.parse(localStorage.getItem("Drive")) ??
		driveContext?.directoryState;
	const breadcrumbArray = getBreadcrumb(folderId, DriveData).reverse();
	const navigate = useNavigate();
	return (
		<BreadcrumbDiv>
			<button className="backBtnClass" onClick={() => navigate(-1)}>
				<img src={Arrow} alt="back-btn" className="imgClass" />
			</button>
			{breadcrumbArray.length === 0 && (
				<p className="current-route parent-btn">root</p>
			)}
			{breadcrumbArray &&
				breadcrumbArray.map((parent, index) => {
					const link =
						parent.id !== null
							? `/mydrive/folder/${parent.id}`
							: "/mydrive";
					return (
						<button
							key={`${parent.id}`}
							id={`${parent.id}`}
							className="parent-btn"
							onClick={() => navigate(link)}
						>
							<p
								className={`${
									index === breadcrumbArray.length - 1 &&
									"current-route"
								} breadcrumb-text`}
								id={`${parent.id}`}
							>
								{parent.name}
							</p>
							{index !== breadcrumbArray.length - 1 && (
								<p className="divider">&nbsp;/</p>
							)}
						</button>
					);
				})}
		</BreadcrumbDiv>
	);
}

export default BreadcrumbBar;
