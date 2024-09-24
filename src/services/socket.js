// src/services/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Substitua pela URL do seu backend

export default socket;
