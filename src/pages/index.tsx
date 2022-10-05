import type { NextPage } from 'next';
import styled from 'styled-components';

const A = styled.div`
	height: 500px;
	width: 500px;
	background: black;
`;

const Home: NextPage = () => {
	return (
		<>
			<div>hello world</div>
			<A>df</A>
		</>
	);
};

export default Home;
