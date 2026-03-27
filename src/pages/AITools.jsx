import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function AITools() {
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [useRealApi, setUseRealApi] = useState(false);

  useEffect(() => {
    // Check if key is in .env file
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey) {
      setApiKey(envKey);
      setUseRealApi(true);
    }
  }, []);

  // Mock AI Responses (Perfect for learning!)
  const generateMockSummary = (topic) => {
    const summaries = {
      photosynthesis: `Photosynthesis is the fundamental process by which plants convert sunlight into chemical energy. This occurs in two main stages: the light-dependent reactions that occur in the thylakoid membranes of chloroplasts, and the light-independent reactions (Calvin Cycle) that take place in the stroma.

During the light-dependent reactions, chlorophyll molecules absorb photons from sunlight, exciting electrons to higher energy states. This energy powers the splitting of water molecules, releasing oxygen as a byproduct while generating ATP and NADPH. These energy carriers are then used in the Calvin Cycle to convert carbon dioxide into glucose.

The overall equation is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. This process is critical for life on Earth, as it produces the oxygen we breathe and forms the base of most food chains. Plants, algae, and some bacteria are the primary photosynthesizers.

Understanding photosynthesis helps explain how ecosystems work and why plants are essential for life. It also provides insights into renewable energy research and biofuel development.`,

      python: `Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, Python emphasizes code clarity with significant whitespace and straightforward syntax that closely resembles natural English.

Python is dynamically typed, meaning you don't need to declare variable types explicitly. This makes it beginner-friendly but requires careful attention to data types during development. The language supports multiple programming paradigms including procedural, object-oriented, and functional programming.

Common applications include web development (Django, Flask), data science (NumPy, Pandas), artificial intelligence (TensorFlow, PyTorch), automation, and scientific computing. Python's extensive standard library and third-party packages make it incredibly versatile for various domains.

Learning Python opens doors to many career paths in technology. Its syntax and concepts translate well to other languages, making it an excellent starting point for programming beginners.`,

      loops: `Loops are fundamental programming constructs that allow code to repeat until a specific condition is met. There are two primary types: 'for' loops and 'while' loops, each serving different purposes in program flow control.

A 'for' loop iterates over a sequence (like a list or range) a predetermined number of times. It's ideal when you know exactly how many iterations you need. For example, looping through items in a shopping list or processing each element in an array. The 'in' keyword makes Python's for loop intuitive for iterating over collections.

A 'while' loop continues executing as long as a condition remains true. It's perfect for scenarios where you don't know precisely how many iterations are needed, such as reading user input until they enter valid data. However, be careful of infinite loops if the condition never becomes false.

Both loop types support 'break' (exit the loop immediately) and 'continue' (skip to the next iteration) statements. Understanding loops efficiently is crucial for writing clean, non-repetitive code.`,

      javascript: `JavaScript is a versatile, dynamically-typed programming language primarily designed for web browsers. Initially created to add interactivity to static HTML pages, JavaScript has evolved into a full-featured language supporting both client-side and server-side development.

Modern JavaScript (ES6+) introduced significant improvements including arrow functions, classes, promises, and async/await for handling asynchronous operations. These features make JavaScript more powerful and easier to work with than ever before. The language is event-driven, making it natural for responding to user interactions.

JavaScript powers interactive web applications through DOM manipulation, event handling, and AJAX for communicating with servers. Frameworks like React, Vue, and Angular provide structured approaches to building complex single-page applications. Beyond the browser, Node.js allows JavaScript to run on servers.

Learning JavaScript is essential for web development careers. Its versatility and the vast ecosystem of libraries and frameworks make it one of the most sought-after programming skills today.`,

      mathematics: `Mathematics is the study of numbers, quantities, shapes, and patterns. It's fundamental to understanding the physical world and is used extensively in science, engineering, economics, and many other fields. Mathematics is built on logic and proof, making conclusions reliable and universal.

Key areas include algebra (solving equations and working with variables), geometry (studying shapes and spatial relationships), calculus (analysis of change and motion), and statistics (data analysis and probability). Each area builds upon previous knowledge, creating a hierarchical structure of understanding.

Mathematics develops critical thinking and problem-solving skills that extend beyond mathematics itself. The process of tackling challenging problems builds mental resilience and analytical thinking. Many real-world applications rely on mathematical models and computations.

Mastering mathematics requires practice, patience, and understanding concepts deeply rather than just memorizing formulas. With regular practice and genuine interest, anyone can become proficient in mathematics.`,

      biology: `Biology is the study of living organisms and life processes. The word 'biology' literally means 'study of life' (from Greek words 'bio' meaning life and 'logy' meaning study). It encompasses everything from microscopic single-celled organisms to massive ecosystems and entire biomes.

Major branches include molecular biology (study of cells and DNA), genetics (inheritance of traits), ecology (interactions between organisms and environments), and physiology (how living systems function). At its core, biology seeks to answer fundamental questions about how life arose, how it evolves, and how different organisms interact.

The cell is the basic unit of life, and understanding cellular structures and processes is crucial to biology. DNA carries genetic information that determines traits and is passed to offspring. Evolution, driven by natural selection, explains the diversity of life on Earth over millions of years.

Biology has practical applications in medicine, agriculture, biotechnology, and conservation. Understanding biology helps us address challenges like disease, food security, and environmental protection.`,

      default: `Understanding "${topic}" opens up fascinating insights into how the world works. Here's a comprehensive overview:

The topic of "${topic}" is important because it provides fundamental knowledge in its field. Breaking it down into smaller concepts helps build a solid foundation of understanding. Learning involves not just memorizing facts, but grasping the underlying principles and relationships between ideas.

Key concepts in this topic include recognizing patterns, understanding cause-and-effect relationships, and seeing how different elements connect. Most complex topics can be understood better by starting with basics and gradually building toward more advanced ideas. Practice and repetition reinforce learning.

Real-world applications of this knowledge extend far beyond textbooks. They appear in everyday situations, professional careers, and solving contemporary problems. Taking time to understand the "why" behind concepts leads to deeper learning than just knowing the "what."

To master this topic, try different learning approaches: read textbooks, watch educational videos, work through practice problems, and discuss with peers. Everyone learns differently, so find methods that work best for you.`
    };

    return summaries[topic.toLowerCase()] || summaries.default;
  };

  // Simulate AI response or fetch real AI response
  const handleGenerateSummary = async () => {
    if (topic.trim() === '') {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    if (useRealApi && apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an AI study companion. Explain the following topic comprehensively but concisely, suitable for a student: ${topic}`
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || `API Error: ${response.status} - Check if your API key is correct and active.`);
        }

        const data = await response.json();
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!textContent) {
           throw new Error('Received an unexpected response format from the API.');
        }

        setSummary(textContent);
      } catch (err) {
        setError(`Failed connecting to Gemini API: ${err.message}\nNote: AI models from ChatGPT/Groq often block browser calls (CORS). Gemini is supported!`);
      } finally {
        setLoading(false);
      }
    } else {
      // Simulate API delay (1-2 seconds) for mock
      setTimeout(() => {
        const mockSummary = generateMockSummary(topic);
        setSummary(mockSummary);
        setLoading(false);
      }, 1500);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleGenerateSummary();
    }
  };

  return (
    <div className="ai-tools">
      <h2>AI Study Companion</h2>

      <div className="ai-section">
        <div className="ai-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3>Generate AI-Powered Summary</h3>
            <p className="description">Ask about any topic and get instant, intelligent explanations!</p>
          </div>
          {useRealApi && <span className="status-badge completed" style={{ height: 'fit-content' }}>Live API Active</span>}
        </div>

        <div className="input-section ai-input-section">
          <input
            type="text"
            placeholder="Enter a topic (e.g., Photosynthesis, Python Loops, Quantum Physics)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-input ai-input"
            disabled={loading}
          />
          <button
            onClick={handleGenerateSummary}
            className="btn btn-primary ai-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Message with Animation */}
        {loading && (
          <div className="loading-container">
            <div className="ai-thinking">
              <div className="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>AI is analyzing your question...</p>
            </div>
          </div>
        )}

        {/* Summary Display with Enhanced UI */}
        {summary && !loading && (
          <div className="summary-box enhanced-summary">
            <div className="summary-header">
              <h4>Summary for "<span className="topic-highlight">{topic}</span>"</h4>
              <span className="ai-badge">AI Generated</span>
            </div>
            <div className="summary-content">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
            <div className="summary-actions">
              <button
                onClick={() => {
                  setSummary('');
                  setTopic('');
                }}
                className="btn btn-secondary"
              >
                Ask Another Topic
              </button>
              <button
                onClick={() => {
                  const element = document.createElement('a');
                  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(summary));
                  element.setAttribute('download', `${topic}-summary.txt`);
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="btn btn-success"
              >
                Download Summary
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
