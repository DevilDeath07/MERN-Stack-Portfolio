import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const query = async (question) => {
        const response = await fetch(
            "https://cloud.flowiseai.com/api/v1/prediction/64e45ec6-edad-4506-8b0d-89a0d9758755",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question })
            }
        );
        const result = await response.json();
        return result;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await query(userMessage);

            // Add bot response
            setMessages(prev => [...prev, {
                type: 'bot',
                text: response.text || response.answer || 'Sorry, I could not process that.'
            }]);
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                className={`chat-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <i className='bx bx-x'></i>
                ) : (
                    <i className='bx bx-message-dots'></i>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-header-content">
                            <div className="chat-avatar">
                                <i className='bx bx-bot'></i>
                            </div>
                            <div>
                                <h4>Portfolio Assistant</h4>
                                <span className="chat-status">Online</span>
                            </div>
                        </div>
                        <button
                            className="chat-close"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            <i className='bx bx-x'></i>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.type}`}
                            >
                                {msg.type === 'bot' && (
                                    <div className="message-avatar">
                                        <i className='bx bx-bot'></i>
                                    </div>
                                )}
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chat-message bot">
                                <div className="message-avatar">
                                    <i className='bx bx-bot'></i>
                                </div>
                                <div className="message-bubble typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="chat-input-container">
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button
                            className="chat-send"
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            aria-label="Send message"
                        >
                            <i className='bx bx-send'></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
