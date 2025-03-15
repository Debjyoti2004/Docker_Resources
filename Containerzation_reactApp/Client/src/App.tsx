import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  Send, Hash, Search, Menu, MessageSquare, Sparkles,
  Radio, Shield, Crown, X,MoreVertical,
  UserPlus, Share2, Video, MessageCircle
} from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const [showSidebar] = useState(true);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const localStorageKey = `chatMessages_${roomId}`;

  useEffect(() => {
    if (!roomId) return;
    const savedMessages = localStorage.getItem(localStorageKey);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, [roomId]);


  useEffect(() => {
    if (!roomId) return;
    localStorage.setItem(localStorageKey, JSON.stringify(messages));
  }, [messages, roomId]);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const connectToRoom = (rid) => {
    if (!rid.trim()) return;

    setMessages([]);
    const wss = new WebSocket(`wss://${import.meta.env.VITE_BACKEND_URL}`);

    wss.onopen = () => {
      wss.send(JSON.stringify({
        type: "join",
        payload: { roomId: rid }
      }));
      setIsJoined(true);
      setRoomId(rid);
    };

    wss.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setMessages(m => {
        if (!m.some(msg => msg.id === receivedData.id)) {
          return [...m, {
            text: receivedData.text,
            isMe: false,
            id: receivedData.id,
            timestamp: new Date().toISOString(),
            status: 'received'
          }];
        }
        return m;
      });
    };

    wsRef.current = wss;
    return () => wss.close();
  };


  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomInput.trim()) {
      connectToRoom(roomInput);
    }
  };


  const handleSend = () => {
    if (!inputValue.trim()) return;

    const messageId = uuidv4();
    const newMessage = {
      text: inputValue,
      isMe: true,
      id: messageId,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    setMessages(m => [...m, newMessage]);
    wsRef.current?.send(JSON.stringify({
      type: "chat",
      payload: {
        message: inputValue,
        id: messageId
      }
    }));
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDisconnect = () => {
    wsRef.current?.close();
    setIsJoined(false);
    setRoomId("");
    setMessages([]);
    localStorage.removeItem(localStorageKey);
  };


  if (!isJoined) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] overflow-hidden relative flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-600/30 to-cyan-600/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-1000" />
        </div>

        <div className="relative w-full max-w-md">
          <div className="relative bg-[#111111]/90 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/5">
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-blue-600 p-[2px]">
                  <div className="w-full h-full rounded-3xl bg-[#111111] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 backdrop-blur-xl" />
                    <MessageSquare className="w-12 h-12 text-white relative z-10" />
                  </div>
                </div>
                <Sparkles className="w-6 h-6 text-blue-400 absolute -top-2 -right-2 animate-bounce" />
              </div>

              <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
                  NovaRoom
                </h1>
                <p className="text-gray-400">Enterprise-Grade Secure Communications</p>
              </div>

              <form onSubmit={handleJoinRoom} className="w-full space-y-5">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                  <input
                    type="text"
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                    placeholder="Enter Room ID"
                    className="relative w-full px-5 py-4 bg-[#111111] rounded-xl border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-gray-100 placeholder-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                  <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium text-lg shadow-lg shadow-purple-600/20 flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-purple-600/30 transition duration-300">
                    <span>Enter Workspace</span>
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                </button>
              </form>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm">Premium Features</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <div className={`w-80 bg-[#111111]/90 backdrop-blur-2xl border-r border-white/5 p-6 flex flex-col transition-all duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 p-[1px]">
              <div className="w-full h-full rounded-xl bg-[#111111] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">NovaRoom</span>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <button className="flex-1 py-2 text-sm font-medium text-white bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Messages</button>
          <button className="flex-1 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 rounded-lg transition-colors">Channels</button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-4 py-3 pl-10 bg-white/5 rounded-xl border border-white/5 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-gray-100 placeholder-gray-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-400 font-medium">
              <span>Active Room</span>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                  <UserPlus className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">{roomId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-400 font-medium">
              <span>Online Members</span>
              <span className="px-2 py-1 text-xs bg-white/5 rounded-lg">12 online</span>
            </div>
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#111111]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium">User {i}</div>
                    <div className="text-xs text-gray-400">Active now</div>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                      <Video className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <button
            onClick={handleDisconnect}
            className="w-full p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Leave Room</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-gray-900/60 backdrop-blur-xl border-b border-gray-800 flex items-center px-4">
          <div className="lg:hidden mr-4">
            <Menu className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex items-center space-x-3">
            <Hash className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">{roomId}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] ${message.isMe ? "items-end" : "items-start"}`}>
                <div
                  className={`p-3 rounded-2xl ${message.isMe
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-gray-800/70 text-gray-100"
                    } ${message.isMe ? "rounded-br-none" : "rounded-bl-none"}`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-2">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-gray-900/60 backdrop-blur-xl border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows={1}
                className="w-full px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-gray-100 placeholder-gray-500 resize-none"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;