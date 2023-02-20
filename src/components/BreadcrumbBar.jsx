import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Arrow from "../assets/arrow_up.png";

const BreadcrumbDiv = styled.div`
	background-color: transparent;
	border-bottom: 1px solid #69696950;
	padding: 0 10px;
	margin: 0 10px;
	height: 50px;
	display: flex;
	.backBtnClass {
		background: transparent;
		border: none;
		opacity: 0.8;
		cursor: pointer;
	}
	.imgClass {
		transform: rotate(270deg);
	}
`;

function BreadcrumbBar() {
	const navigate = useNavigate();
	return (
		<BreadcrumbDiv>
			<button className="backBtnClass" onClick={() => navigate(-1)}>
				<img src={Arrow} alt="back-btn" className="imgClass" />
			</button>
		</BreadcrumbDiv>
	);
}

export default BreadcrumbBar;
