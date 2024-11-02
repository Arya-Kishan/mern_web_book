import React, { useContext } from 'react'
import { MyContext } from './SocketContext';

const GameContext = () => {
    const { globalSocket, onlineUsers } = useContext(MyContext);

  return (
    <div>
    
    </div>
  )
}

export default GameContext