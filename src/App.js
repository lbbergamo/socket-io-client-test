import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
const socket = io(process.env.WEBSOCKET_CONNECT ?? 'https://fifo-server.herokuapp.com/', {
	withCredentials: true,
	extraHeaders: {
		"my-custom-header": "abcd"
	}
});
function App() {
	const [status, setStatus] = useState('');
	const [count, setCount] = useState();
	// eslint-disable-next-line no-new-object
	const user = new Object();
	user.localization = 16;
	user.service = 15;
	user.user = 1;

	// exit() {
	// 	socket.emit('exit', user)
	// };

	useEffect(() => {
		socket.on('status', (code) => {
			setStatus(code);
		});
		socket.on('queue', (count) => {
			setCount(count);
		});
		socket.emit('entryQueue', user)
	}, []);
	return (
		<div>
			{/* <h2>{ code }</h2> */}
			{<h2>{ status }</h2> }	
			{<h2>{ count }</h2> }
			<button onclick={() => function(){ this.socket.emit('exit');}}> opa </button>
		</div>
	);
}

export default App;
