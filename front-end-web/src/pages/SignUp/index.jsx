import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "./styles";
import Header from "../../components/Header";

function SignUp() {
	// 사업자등록번호 형식 - 숫자 10자리
	const storeRegNumEx = /^[0-9]{10}$/;
	// 사장님ID 형식 - 영어 소문자, 숫자로 이루어진 5~15글자
	const idRegEx = /^[a-z0-9]{5,15}$/
	// 비밀번호 형식 - 영어 대/소문자, 숫자, 특수문자를 포함하여 8~20글자
	const passwordRegEx = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]).{8,20}$/;

	return (
		<div>
			<Header />
			<div> {/*  Wrapper 변경 예정 */}
				<form>
					<div>
						<label>상점 정보</label>
						<div>
							<label>상점 이름*</label>
							<InputGroup>
								<Form.Control
									placeholder="상점 이름"
									aria-label="storeName"
								/>
							</InputGroup>
						</div>
						<div>
							<label>사업자등록번호*</label>
							<InputGroup>
								<Form.Control
									placeholder="사업자등록번호"
									aria-label="storeRegNum"
								/>
								<button>인증하기</button>
							</InputGroup>
							<label>오류메세지</label>
						</div>
						<div>
							<label>상점 위치*</label>
							<InputGroup>
								<Form.Control
									placeholder="우편번호 조회"
									aria-label="storeAdress01"
								/>
								<button>검색</button>
							</InputGroup>
							<InputGroup>
								<Form.Control
									placeholder="상세주소"
									aria-label="storeAdress02"
								/>
							</InputGroup>
						</div>						
						<div>
							<label>사업장 카테고리*</label>
							<InputGroup>
								<Form.Control
									placeholder="사업장 카테고리"
									aria-label="storeCartegory"
								/>
								<button>드롭다운 알아보자</button>
							</InputGroup>
						</div>
					</div>
					
					<div>
						<label>사장님 정보</label>						
						<div>
							<label>아이디*</label>
							<InputGroup>
								<Form.Control
									placeholder="아이디"
									aria-label="storeId"
								/>
								<button>중복 확인</button>
							</InputGroup>
							<label>오류메세지</label>

						</div>
						<div>
							<label>휴대전화번호*</label>
							<InputGroup>
								<Form.Control
									placeholder="휴대전화번호"
									aria-label="storePhone"
								/>
								<button>전송하기</button>
							</InputGroup>
							<InputGroup>
								<Form.Control
									placeholder="인증번호"
									aria-label="storeVerifiNum"
								/>
								<button>인증하기</button>
							</InputGroup>
						</div>
						<div>
							<label>비밀번호*</label>
							<InputGroup>
								<Form.Control
									placeholder="비밀번호"
									aria-label="storePW01"
								/>
							</InputGroup>
							<label>오류메세지</label>
							<InputGroup>
								<Form.Control
									placeholder="비밀번호 확인"
									aria-label="storePW02"
								/>
							</InputGroup>
							<label>오류메세지</label>
						</div>
					</div>

					<div>
						<label>부가 정보</label>
						<div>
							<label>상점 전화번호</label>
							<InputGroup>
								<Form.Control
									placeholder="상점 전화번호"
									aria-label="storeCallNum"
								/>
							</InputGroup>
						</div>
						<div>
							<label>주차장</label>
							<InputGroup>
								<Form.Control
									placeholder="주차가능대수"
									aria-label="storeParking"
								/>
								<button>라디오버튼</button>
							</InputGroup>
						</div>
						<div>
							<label>영업시간</label>
							<InputGroup>
								<Form.Control
									placeholder="영업시간 시계모양 Input  찾기"
									aria-label="storeHour"
								/>
							</InputGroup>
						</div>						
						<div>
							<label>상점 휴무일</label>
							<InputGroup>
								<Form.Control
									placeholder="휴무일 달력? 라디오버튼?"
									aria-label="storeClosed"
								/>
							</InputGroup>
						</div>
						<div>
							<label>상점 설명</label>
							<InputGroup>
								<Form.Control
									placeholder="짱큰거 필요"
									aria-label="storeInfo"
								/>
							</InputGroup>
						</div>
						<div>
							<label>상점 홈페이지</label>
							<InputGroup>
								<Form.Control
									placeholder="상점 홈페이지"
									aria-label="storeURL"
								/>
							</InputGroup>
						</div>
						<div>
							<label>상점 키워드</label>
							<button>키워드01</button>
							<button>키워드02</button>
							<button>키워드03</button>
							<button>키워드04</button>
							<button>키워드05</button>
							<button>키워드06</button>
							<button>키워드07</button>
							<button>키워드08</button>
							<button>키워드09</button>
							<button>키워드10</button>
							<button>키워드11</button>
							<button>키워드12</button>
						</div>
					</div>

				</form>
			</div>
		</div>
	);
}

export default SignUp;