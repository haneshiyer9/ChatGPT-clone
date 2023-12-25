// import {useEffect, useState} from 'react';
// import axios from "axios";
// import PromptInput from "../PromptInput/PromptInput";
// import './App.css';
// import {ResponseInterface} from "../PromptResponseList/response-interface";
// import PromptResponseList from "../PromptResponseList/PromptResponseList";

// type ModelValueType = 'gpt' | 'codex' | 'image';
// const App = () => {

//   const [responseList, setResponseList] = useState<ResponseInterface[]>([]);
//   const [prompt, setPrompt] = useState<string>('');
//   const [promptToRetry, setPromptToRetry] = useState<string | null>(null);
//   const [uniqueIdToRetry, setUniqueIdToRetry] = useState<string | null>(null);
//   const [modelValue, setModelValue] = useState<ModelValueType>('gpt');
//   const [isLoading, setIsLoading] = useState(false);
//   const [chatInstances, setChatInstances] = useState<string[]>([]);
//   const [activeChatInstance, setActiveChatInstance] = useState<string>('');
//   const [chatResponses, setChatResponses] = useState<Record<string, ResponseInterface[]>>({ [activeChatInstance]: [] });
  

//   let loadInterval: number | undefined;


//   const generateUniqueId = () => {
//     const timestamp = Date.now();
//     const randomNumber = Math.random();
//     const hexadecimalString = randomNumber.toString(16);

//     return `id-${timestamp}-${hexadecimalString}`;
//   }

//   const htmlToText = (html: string) => {
//     const temp = document.createElement('div');
//     temp.innerHTML = html;
//     return temp.textContent;
//   }

//   const delay = (ms: number) => {
//     return new Promise( resolve => setTimeout(resolve, ms) );
//   }

//   const addLoader = (uid: string) => {
//     const element = document.getElementById(uid) as HTMLElement;
//     element.textContent = ''

//     // @ts-ignore
//     loadInterval = setInterval(() => {
//       // Update the text content of the loading indicator
//       element.textContent += '.';

//       // If the loading indicator has reached three dots, reset it
//       if (element.textContent === '....') {
//         element.textContent = '';
//       }
//     }, 300);
//   }


//   const addResponse = (selfFlag: boolean, response?: string) => {
//     const uid = generateUniqueId()
//     setResponseList(prevResponses => [
//       ...prevResponses,
//       {
//         id: uid,
//         response,
//         selfFlag
//       },
//     ]);
//     return uid;
//   }


//   const updateResponse = (uid: string, updatedObject: Record<string, unknown>) => {
//     setResponseList(prevResponses => {
//       const updatedList = [...prevResponses]
//       const index = prevResponses.findIndex((response) => response.id === uid);
//       if (index > -1) {
//         updatedList[index] = {
//           ...updatedList[index],
//           ...updatedObject
//         }
//       }
//       return updatedList;
//     });
//   }

//   const regenerateResponse = async () => {
//     await getGPTResult(promptToRetry, uniqueIdToRetry);
//   }

//   const getGPTResult = async (_promptToRetry?: string | null, _uniqueIdToRetry?: string | null) => {
//     console.log('Entering getGPTResult function');
//     // Get the prompt input
//     const _prompt = _promptToRetry ?? htmlToText(prompt);

//     // If a response is already being generated or the prompt is empty, return
//     if (isLoading || !_prompt) {
//       return;
//     }

//     setIsLoading(true);

//     // Clear the prompt input
//     setPrompt('');

//     let uniqueId: string;
//     if (_uniqueIdToRetry) {
//       uniqueId = _uniqueIdToRetry;
//     } else {
//       // Add the self prompt to the response list
//       addResponse(true, _prompt);
//       uniqueId = addResponse(false);
//       await delay(50);
//       addLoader(uniqueId);
//     }

//     try {
//       console.log('Before axios.post');
//       // Send a POST request to the API with the prompt in the request body
//       const response = await axios.post('http://localhost:3001/get-prompt-result', {
//         prompt: _prompt,
//         model: modelValue
//       });
      
//       console.log('After axios.post', response);

//       const responseData = modelValue === 'image' ? response.data.copies[0].content : response.data.copies[0].content.trim();
//     // Log the responseData object
//     console.log('Response Data:', responseData);

//     updateResponse(uniqueId, {
//       response: responseData,
//     });
//     console.log('Updated Response List:', responseList);

//     // Updated section to store responses for each chat instance
//     const updatedChatResponses = [...chatResponses[activeChatInstance], {
//       id: uniqueId,
//       response: responseData,
//       selfFlag: false,
//     }];
//     setChatResponses((prevChatResponses) => ({
//       ...prevChatResponses,
//       [activeChatInstance]: updatedChatResponses,
//     }));

//       setPromptToRetry(null);
//       setUniqueIdToRetry(null);
//     } catch (err) {
//       console.error('Error from server:', err);
//       setPromptToRetry(_prompt);
//       setUniqueIdToRetry(uniqueId);
//       updateResponse(uniqueId, {
//         // @ts-ignore
//         response: `Error: ${err.message}`,
//         error: true
//       });
//     } finally {
//       console.log('Leaving getGPTResult function');
//       // Clear the loader interval
//       clearInterval(loadInterval);
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="App">
//       <div id="response-list">
//         <PromptResponseList responseList={responseList} key="response-list"/>
//       </div>
//       { uniqueIdToRetry &&
//         (<div id="regenerate-button-container">
//           <button id="regenerate-response-button" className={isLoading ? 'loading' : ''} onClick={() => regenerateResponse()}>
//             Regenerate Response
//           </button>
//         </div>
//         )
//       }
//       <div id="model-select-container">
//         <label htmlFor="model-select">Select model:</label>
//         <select id="model-select" value={modelValue} onChange={(event) => setModelValue(event.target.value as ModelValueType)}>
//           <option value="gpt">GPT-3 (Understand and generate natural language )</option>
//           <option value="codex">Codex (Understand and generate code, including translating natural language to code)
//           </option>
//           <option value="image">Create Image (Create AI image using DALL·E models)</option>
//         </select>
//       </div>
//       <div id="input-container">
//         <PromptInput
//           prompt={prompt}
//           onSubmit={() => getGPTResult()}
//           key="prompt-input"
//           updatePrompt={(prompt) => setPrompt(prompt)}
//         />
//         <button id="submit-button" className={isLoading ? 'loading' : ''} onClick={() => getGPTResult()}></button>
//       </div>
//       </div>
//   );
// }

// export default App;


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PromptInput from '../PromptInput/PromptInput';
// // import './App.css';
// import { ResponseInterface } from '../PromptResponseList/response-interface';
// import PromptResponseList from '../PromptResponseList/PromptResponseList';
// import Sidebar from '../Sidebar/Sidebar'
// import '../../styles/tailwind.css';

// const App = () => {
//   const [responseList, setResponseList] = useState<ResponseInterface[]>([]);
//   const [prompt, setPrompt] = useState<string>('');
//   const [promptToRetry, setPromptToRetry] = useState<string | null>(null);
//   const [uniqueIdToRetry, setUniqueIdToRetry] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chatInstances, setChatInstances] = useState<string[]>([]);
//   const [activeChatInstance, setActiveChatInstance] = useState<string>('');
//   const [chatResponses, setChatResponses] = useState<Record<string, ResponseInterface[]>>({
//     'Chat 1': [], // Include the first chat in the initial state
//   });

//   let loadInterval: number | undefined;


//   const loadChatInstances = () => {
//     // Load chat instances from localStorage
//     const storedChatInstances = localStorage.getItem('chatInstances');
//     if (storedChatInstances) {
//       const parsedChatInstances = JSON.parse(storedChatInstances);
//       setChatResponses(parsedChatInstances);
  
//       // Set the first chat instance as active if it exists
//       const firstChatInstance = Object.keys(parsedChatInstances)[0];
//       if (firstChatInstance) {
//         setActiveChatInstance(firstChatInstance);
//       }
//     }
//   };

//   useEffect(() => {
//     // Load chat instances from localStorage
//     const storedChatInstances = localStorage.getItem('chatInstances');
//     if (storedChatInstances) {
//       const parsedChatInstances = JSON.parse(storedChatInstances);
//       setChatResponses(parsedChatInstances);
  
//       // Set the first chat instance as active if it exists
//       const firstChatInstance = Object.keys(parsedChatInstances)[0];
//       if (firstChatInstance) {
//         setActiveChatInstance(firstChatInstance);
//       }
//     }
//   }, []);
  
  

//   const saveChatInstances = (chatInstances: Record<string, ResponseInterface[]>) => {
//     // Save chat instances to localStorage
//     localStorage.setItem('chatInstances', JSON.stringify(chatInstances));
//     console.log('Chat instances saved locally:', chatInstances);
//   };
  
//   const handleCreateChat = () => {
//     console.log('Entering handleCreateChat');
  
//     const chatCount = Object.keys(chatResponses).length;
//     const newChatNumber = chatCount + 1;
//     const newChatName = `Chat ${newChatNumber}`;
  
//     console.log('Chat count:', chatCount);
//     console.log('New chat number:', newChatNumber);
//     console.log('New chat name:', newChatName);
  
//     // Save the current chat only if it's not the first chat
//     if (chatCount > 0) {
//       const currentChatInstance = activeChatInstance;
//       setChatResponses((prevChatResponses) => ({
//         ...prevChatResponses,
//         [currentChatInstance]: responseList,
//       }));
//       console.log(`Saved responses for ${currentChatInstance}:`, responseList);
//     }
  
//     // Create a new chat instance
//     setChatResponses((prevChatResponses) => ({
//       ...prevChatResponses,
//       [newChatName]: [],
//     }));
  
//     // Set the new chat as active
//     setActiveChatInstance(newChatName);
//     console.log(`Created new chat: ${newChatName}`);
  
//     console.log('Leaving handleCreateChat');
//   };  
  
//   const handleSwitchChat = (chatInstance: string) => {
//     setActiveChatInstance(chatInstance);
//   };

//   const generateUniqueId = () => {
//     const timestamp = Date.now();
//     const randomNumber = Math.random();
//     const hexadecimalString = randomNumber.toString(16);

//     return `id-${timestamp}-${hexadecimalString}`;
//   };

//   const htmlToText = (html: string) => {
//     const temp = document.createElement('div');
//     temp.innerHTML = html;
//     return temp.textContent;
//   };

//   const delay = (ms: number) => {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   };

//   const addLoader = (uid: string) => {
//     const element = document.getElementById(uid) as HTMLElement;
//     element.textContent = '';

//     // @ts-ignore
//     loadInterval = setInterval(() => {
//       // Update the text content of the loading indicator
//       element.textContent += '.';

//       // If the loading indicator has reached three dots, reset it
//       if (element.textContent === '....') {
//         element.textContent = '';
//       }
//     }, 300);
//   };

//   const addResponse = (selfFlag: boolean, response?: string) => {
//     const uid = generateUniqueId();
//     setResponseList((prevResponses) => [
//       ...prevResponses,
//       {
//         id: uid,
//         response,
//         selfFlag,
//       },
//     ]);
//     return uid;
//   };

//   const updateResponse = (uid: string, updatedObject: Record<string, unknown>) => {
//     setResponseList((prevResponses) => {
//       const updatedList = [...prevResponses];
//       const index = prevResponses.findIndex((response) => response.id === uid);
//       if (index > -1) {
//         updatedList[index] = {
//           ...updatedList[index],
//           ...updatedObject,
//         };
//       }
//       return updatedList;
//     });
//   };

//   const regenerateResponse = async () => {
//     await getGPTResult(promptToRetry, uniqueIdToRetry);
//   };

//   const getGPTResult = async (_promptToRetry?: string | null, _uniqueIdToRetry?: string | null) => {
//     console.log('Entering getGPTResult function');
//     // Get the prompt input
//     const _prompt = _promptToRetry ?? htmlToText(prompt);

//     // If a response is already being generated or the prompt is empty, return
//     if (isLoading || !_prompt) {
//       return;
//     }

//     setIsLoading(true);

//     // Clear the prompt input
//     setPrompt('');

//     let uniqueId: string;
//     if (_uniqueIdToRetry) {
//       uniqueId = _uniqueIdToRetry;
//     } else {
//       // Add the self prompt to the response list
//       addResponse(true, _prompt);
//       uniqueId = addResponse(false);
//       await delay(50);
//       addLoader(uniqueId);
//     }

//     try {
//       console.log('Before axios.post');
//       // Send a POST request to the API with the prompt in the request body
//       const response = await axios.post('http://localhost:3001/get-prompt-result', {
//         prompt: _prompt,
//         model: 'gpt', // Set the model value directly to 'gpt'
//       });

//       console.log('After axios.post', response);

//       const responseData = response.data.copies[0].content.trim();
//       // Log the responseData object
//       console.log('Response Data:', responseData);

//       updateResponse(uniqueId, {
//         response: responseData,
//       });
//       console.log('Updated Response List:', responseList);

//       // Updated section to store responses for each chat instance
//       const updatedChatResponses = [...chatResponses[activeChatInstance], {
//         id: uniqueId,
//         response: responseData,
//         selfFlag: false,
//       }];
//       setChatResponses((prevChatResponses) => ({
//         ...prevChatResponses,
//         [activeChatInstance]: updatedChatResponses,
//       }));

//       setPromptToRetry(null);
//       setUniqueIdToRetry(null);
//     } catch (err) {
//       console.error('Error from server:', err);
//       setPromptToRetry(_prompt);
//       setUniqueIdToRetry(uniqueId);
//       updateResponse(uniqueId, {
//         // @ts-ignore
//         response: `Error: ${err.message}`,
//         error: true,
//       });
//     } finally {
//       console.log('Leaving getGPTResult function');
//       // Clear the loader interval
//       clearInterval(loadInterval);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     saveChatInstances(chatResponses);
//   }, [chatResponses]);

//   return (
//     <div className="flex">
//       <div className="w-1/5 bg-custom-color">
//       <Sidebar
//        chats={Object.keys(chatResponses)}
//        onCreateChat={handleCreateChat}
//        onSwitchChat={handleSwitchChat}
//        activeChatInstance={activeChatInstance}
//       />
//       </div>
//       <div className="flex-1 chat-container">
//         <div className="response-list">
//           <PromptResponseList responseList={responseList} key="response-list" />
//         </div>
//         {uniqueIdToRetry && (
//           <div className="regenerate-button-container">
//             <button
//               id="regenerate-response-button"
//               className={`regenerate-response-button ${isLoading ? 'loading' : ''}`}
//               onClick={() => regenerateResponse()}
//             >
//               Regenerate Response
//             </button>
//           </div>
//         )}
//         <div className="input-container">
//           <PromptInput
//             prompt={prompt}
//             onSubmit={() => getGPTResult()}
//             key="prompt-input"
//             updatePrompt={(prompt) => setPrompt(prompt)}
//             className="prompt-input" />
//           <button
//             id="submit-button"
//             className={`submit-button ${isLoading ? 'loading' : ''}`}
//             onClick={() => getGPTResult()}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PromptInput from '../PromptInput/PromptInput';
// import { ResponseInterface } from '../PromptResponseList/response-interface';
// import PromptResponseList from '../PromptResponseList/PromptResponseList';
// import Sidebar from '../Sidebar/Sidebar';
// import '../../styles/tailwind.css';

// const App = () => {
//   const [prompt, setPrompt] = useState<string>('');
//   const [promptToRetry, setPromptToRetry] = useState<string | null>(null);
//   const [uniqueIdToRetry, setUniqueIdToRetry] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chatInstances, setChatInstances] = useState<string[]>([]);
//   const [activeChatInstance, setActiveChatInstance] = useState<string>('Chat 1');
//   const [chatResponses, setChatResponses] = useState<Record<string, ResponseInterface[]>>({
//     'Chat 1': [], // Include the first chat in the initial state
//   });

//   let loadInterval: number | undefined;

//   const loadChatInstances = () => {
//     // Load chat instances from localStorage
//     const storedChatInstances = localStorage.getItem('chatInstances');
//     if (storedChatInstances) {
//       const parsedChatInstances = JSON.parse(storedChatInstances);
//       setChatResponses(parsedChatInstances);

//       // Set the first chat instance as active if it exists
//       const firstChatInstance = Object.keys(parsedChatInstances)[0];
//       if (firstChatInstance) {
//         setActiveChatInstance(firstChatInstance);
//       }
//     }
//   };

//   useEffect(() => {
//     // Load chat instances from localStorage
//     const storedChatInstances = localStorage.getItem('chatInstances');
//     if (storedChatInstances) {
//       const parsedChatInstances = JSON.parse(storedChatInstances);
//       setChatResponses(parsedChatInstances);

//       // Set the first chat instance as active if it exists
//       const firstChatInstance = Object.keys(parsedChatInstances)[0];
//       if (firstChatInstance) {
//         setActiveChatInstance(firstChatInstance);
//       }
//     }
//   }, []);

//   const saveChatInstances = (chatInstances: Record<string, ResponseInterface[]>) => {
//     // Save chat instances to localStorage
//     localStorage.setItem('chatInstances', JSON.stringify(chatInstances));
//     console.log('Chat instances saved locally:', chatInstances);
//   };

//   const handleCreateChat = () => {
//     console.log('Entering handleCreateChat');
  
//     const chatCount = Object.keys(chatResponses).length;
//     const newChatNumber = chatCount + 1;
//     const newChatName = `Chat ${newChatNumber}`;
  
//     console.log('Chat count:', chatCount);
//     console.log('New chat number:', newChatNumber);
//     console.log('New chat name:', newChatName);
  
//     // Save the current chat before creating a new one
//     setChatResponses((prevChatResponses) => ({
//       ...prevChatResponses,
//       [activeChatInstance]: chatResponses[activeChatInstance] || [],
//     }));
  
//     // Create a new chat instance
//     setChatResponses((prevChatResponses) => ({
//       ...prevChatResponses,
//       [newChatName]: [],
//     }));
  
//     // Set the new chat as active
//     setActiveChatInstance(newChatName);
//     console.log(`Created new chat: ${newChatName}`);
  
//     console.log('Leaving handleCreateChat');
//   };
  

//   const handleSwitchChat = (chatInstance: string) => {
//     setActiveChatInstance(chatInstance);
//   };

//   const generateUniqueId = () => {
//     const timestamp = Date.now();
//     const randomNumber = Math.random();
//     const hexadecimalString = randomNumber.toString(16);

//     return `id-${timestamp}-${hexadecimalString}`;
//   };

//   const htmlToText = (html: string) => {
//     const temp = document.createElement('div');
//     temp.innerHTML = html;
//     return temp.textContent;
//   };

//   const delay = (ms: number) => {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   };

//   const addLoader = (uid: string) => {
//     const element = document.getElementById(uid) as HTMLElement;
//     element.textContent = '';

//     // @ts-ignore
//     loadInterval = setInterval(() => {
//       // Update the text content of the loading indicator
//       element.textContent += '.';

//       // If the loading indicator has reached three dots, reset it
//       if (element.textContent === '....') {
//         element.textContent = '';
//       }
//     }, 300);
//   };

//   const addResponse = (selfFlag: boolean, response?: string) => {
//     const uid = generateUniqueId();
//     setChatResponses((prevChatResponses) => ({
//       ...prevChatResponses,
//       [activeChatInstance]: [
//         ...(prevChatResponses[activeChatInstance] || []),
//         {
//           id: uid,
//           response,
//           selfFlag,
//         },
//       ],
//     }));
//     return uid;
//   };

//   const updateResponse = (uid: string, updatedObject: Record<string, unknown>) => {
//     setChatResponses((prevChatResponses) => {
//       const updatedList = [...(prevChatResponses[activeChatInstance] || [])];
//       const index = updatedList.findIndex((response) => response.id === uid);
//       if (index > -1) {
//         updatedList[index] = {
//           ...updatedList[index],
//           ...updatedObject,
//         };
//       }
//       return {
//         ...prevChatResponses,
//         [activeChatInstance]: updatedList,
//       };
//     });
//   };

//   const regenerateResponse = async () => {
//     await getGPTResult(promptToRetry, uniqueIdToRetry);
//   };

//   const handleDeleteChat = (chatInstance: string) => {
//     const updatedChats = { ...chatResponses };
  
//     // Delete the specified chat instance
//     delete updatedChats[chatInstance];
  
//     // Set the updated chats
//     setChatResponses(updatedChats);
  
//     // Save the updated chat instances
//     saveChatInstances(updatedChats);
  
//     // If the deleted chat was the active chat, switch to the first chat instance
//     if (activeChatInstance === chatInstance) {
//       const updatedChatInstances = Object.keys(updatedChats);
//       const newActiveChatInstance =
//         updatedChatInstances.length > 0 ? updatedChatInstances[0] : '';
//       setActiveChatInstance(newActiveChatInstance);
//     }
//   };
  
  
  

//   const getGPTResult = async (_promptToRetry?: string | null, _uniqueIdToRetry?: string | null) => {
//     console.log('Entering getGPTResult function');
//     // Get the prompt input
//     const _prompt = _promptToRetry ?? htmlToText(prompt);

//     // If a response is already being generated or the prompt is empty, return
//     if (isLoading || !_prompt) {
//       return;
//     }

//     setIsLoading(true);

//     // Clear the prompt input
//     setPrompt('');

//     let uniqueId: string;
//     if (_uniqueIdToRetry) {
//       uniqueId = _uniqueIdToRetry;
//     } else {
//       // Add the self prompt to the response list
//       addResponse(true, _prompt);
//       uniqueId = addResponse(false);
//       await delay(50);
//       addLoader(uniqueId);
//     }

//     try {
//       console.log('Before axios.post');
//       // Send a POST request to the API with the prompt in the request body
//       const response = await axios.post('http://localhost:3001/get-prompt-result', {
//         prompt: _prompt,
//         model: 'gpt', // Set the model value directly to 'gpt'
//       });

//       console.log('After axios.post', response);

//     const responseData = response.data.copies[0].content.trim();
//     // Log the responseData object
//     console.log('Response Data:', responseData);

//     updateResponse(uniqueId, {
//       response: responseData,
//     });
//     console.log('Updated Response List:', chatResponses[activeChatInstance] || []);

//       setPromptToRetry(null);
//       setUniqueIdToRetry(null);
//     } catch (err) {
//       console.error('Error from server:', err);
//       setPromptToRetry(_prompt);
//       setUniqueIdToRetry(uniqueId);
//       updateResponse(uniqueId, {
//         // @ts-ignore
//         response: `Error: ${err.message}`,
//         error: true,
//       });
//     } finally {
//       console.log('Leaving getGPTResult function');
//     // Clear the loader interval
//     clearInterval(loadInterval);
//     setIsLoading(false);

//     // Save the updated chat instances after each response
//     saveChatInstances(chatResponses);
//     }
//   };

//   useEffect(() => {
//     saveChatInstances(chatResponses);
//   }, [chatResponses, activeChatInstance]);

//   return (
//     <div className="flex">
//       <div className="w-1/5 bg-custom-color">
//         <Sidebar
//           chats={Object.keys(chatResponses)}
//           onCreateChat={handleCreateChat}
//           onSwitchChat={handleSwitchChat}
//           onDeleteChat={handleDeleteChat}
//           activeChatInstance={activeChatInstance}
//         />
//       </div>
//       <div className="flex-1 chat-container">
//         <div className="response-list">
//           <PromptResponseList responseList={chatResponses[activeChatInstance] || []} key="response-list" />
//         </div>
//         {uniqueIdToRetry && (
//           <div className="regenerate-button-container">
//             <button
//               id="regenerate-response-button"
//               className={`regenerate-response-button ${isLoading ? 'loading' : ''}`}
//               onClick={() => regenerateResponse()}
//             >
//               Regenerate Response
//             </button>
//           </div>
//         )}
//         <div className="input-container">
//           <PromptInput
//             prompt={prompt}
//             onSubmit={() => getGPTResult()}
//             key="prompt-input"
//             updatePrompt={(prompt) => setPrompt(prompt)}
//             className="prompt-input"
//           />
//           <button
//             id="submit-button"
//             className={`submit-button ${isLoading ? 'loading' : ''}`}
//             onClick={() => getGPTResult()}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



import { useEffect, useState } from 'react';
import axios from 'axios';
import PromptInput from '../PromptInput/PromptInput';
import { ResponseInterface } from '../PromptResponseList/response-interface';
import PromptResponseList from '../PromptResponseList/PromptResponseList';
import Sidebar from '../Sidebar/Sidebar';
import { HiOutlineUpload } from "react-icons/hi";
import '../../styles/tailwind.css';

const App = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [promptToRetry, setPromptToRetry] = useState<string | null>(null);
  const [uniqueIdToRetry, setUniqueIdToRetry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatInstances, setChatInstances] = useState<string[]>([]);
  const [activeChatInstance, setActiveChatInstance] = useState<string>('Chat 1');
  const [chatResponses, setChatResponses] = useState<Record<string, ResponseInterface[]>>({
    'Chat 1': [], // Include the first chat in the initial state
  });


  let loadInterval: number | undefined;

  const loadChatInstances = () => {
    // Load chat instances from localStorage
    const storedChatInstances = localStorage.getItem('chatInstances');
    if (storedChatInstances) {
      const parsedChatInstances = JSON.parse(storedChatInstances);
      setChatResponses(parsedChatInstances);

      // Set the first chat instance as active if it exists
      const firstChatInstance = Object.keys(parsedChatInstances)[0];
      if (firstChatInstance) {
        setActiveChatInstance(firstChatInstance);
      }
    }
  };

  useEffect(() => {
    // Load chat instances from localStorage
    const storedChatInstances = localStorage.getItem('chatInstances');
    if (storedChatInstances) {
      const parsedChatInstances = JSON.parse(storedChatInstances);
      setChatResponses(parsedChatInstances);

      // Set the first chat instance as active if it exists
      const firstChatInstance = Object.keys(parsedChatInstances)[0];
      if (firstChatInstance) {
        setActiveChatInstance(firstChatInstance);
      }
    }
  }, []);

  const saveChatInstances = (chatInstances: Record<string, ResponseInterface[]>) => {
    // Save chat instances to localStorage
    localStorage.setItem('chatInstances', JSON.stringify(chatInstances));
    console.log('Chat instances saved locally:', chatInstances);
  };

  const handleCreateChat = () => {
    console.log('Entering handleCreateChat');

    const chatCount = Object.keys(chatResponses).length;
    const newChatNumber = chatCount + 1;
    const newChatName = `Chat ${newChatNumber}`;

    console.log('Chat count:', chatCount);
    console.log('New chat number:', newChatNumber);
    console.log('New chat name:', newChatName);

    // Save the current chat only if it's not the first chat
    if (chatCount > 0) {
      const currentChatInstance = activeChatInstance;
      setChatResponses((prevChatResponses) => ({
        ...prevChatResponses,
        [currentChatInstance]: chatResponses[currentChatInstance],
      }));
      console.log(`Saved responses for ${currentChatInstance}:`, chatResponses[currentChatInstance]);
    }

    // Create a new chat instance
    setChatResponses((prevChatResponses) => ({
      ...prevChatResponses,
      [newChatName]: [],
    }));

    // Set the new chat as active
    setActiveChatInstance(newChatName);
    console.log(`Created new chat: ${newChatName}`);

    console.log('Leaving handleCreateChat');
  };

  const handleSwitchChat = (chatInstance: string) => {
    setActiveChatInstance(chatInstance);
  };

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  };

  const htmlToText = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent;
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // const addLoader = (uid: string) => {
  //   const element = document.getElementById(uid) as HTMLElement;
  //   element.textContent = '';

  //   // @ts-ignore
  //   loadInterval = setInterval(() => {
  //     // Update the text content of the loading indicator
  //     element.textContent += '.';

  //     // If the loading indicator has reached three dots, reset it
  //     if (element.textContent === '....') {
  //       element.textContent = '';
  //     }
  //   }, 300);
  // };

  const addLoader = (uid: string) => {
    const element = document.getElementById(uid) as HTMLElement;
    element.textContent = '';
  
    // @ts-ignore
    loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';
  
      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  };

  const clearLoader = (uid: string) => {
    const element = document.getElementById(uid) as HTMLElement;
    element.textContent = '';
    clearInterval(loadInterval);
  };

  const addResponse = (selfFlag: boolean, response?: string) => {
    const uid = generateUniqueId();
    setChatResponses((prevChatResponses) => ({
      ...prevChatResponses,
      [activeChatInstance]: [
        ...(prevChatResponses[activeChatInstance] || []),
        {
          id: uid,
          response,
          selfFlag,
        },
      ],
    }));
    return uid;
  };

  const updateResponse = (uid: string, updatedObject: Record<string, unknown>) => {
    setChatResponses((prevChatResponses) => {
      const updatedList = [...(prevChatResponses[activeChatInstance] || [])];
      const index = updatedList.findIndex((response) => response.id === uid);
      if (index > -1) {
        updatedList[index] = {
          ...updatedList[index],
          ...updatedObject,
        };
      }
      return {
        ...prevChatResponses,
        [activeChatInstance]: updatedList,
      };
    });
  };

  // const regenerateResponse = async () => {
  //   await getGPTResult(promptToRetry, uniqueIdToRetry);
  // };

  const regenerateResponse = async () => {
    // Check if there is a response associated with the uniqueIdToRetry
    const responseExists = chatResponses[activeChatInstance]?.some(
      (response) => response.id === uniqueIdToRetry
    );
  
    // If there is a response, call getGPTResult
    if (responseExists) {
      await getGPTResult(promptToRetry, uniqueIdToRetry);
    }
  
    // Reset promptToRetry and uniqueIdToRetry
    setPromptToRetry(null);
    setUniqueIdToRetry(null);
  };

  //   const regenerateResponse = async () => {
  //   await getGPTResult(promptToRetry, uniqueIdToRetry);
  // }

  // const handleDeleteChat = (chatInstance: string) => {
  //   const updatedChats = { ...chatResponses };
  //   delete updatedChats[chatInstance];
  //   setChatResponses(updatedChats);

  //   // Switch to the first chat if the deleted chat was the active one
  //   if (activeChatInstance === chatInstance) {
  //     const remainingChats = Object.keys(updatedChats);
  //     if (remainingChats.length > 0) {
  //       setActiveChatInstance(remainingChats[0]);
  //     } else {
  //       // If no chats remaining, create a new chat
  //       handleCreateChat();
  //     }
  //   }
  // };

  const handleDeleteChat = (chatInstance: string) => {
    const updatedChats = { ...chatResponses };
    delete updatedChats[chatInstance];

    // Display a confirmation dialog
    const confirmDeletion = window.confirm(`Are you sure you want to delete the chat "${chatInstance}"?`);

    if (!confirmDeletion) {
      // If the user cancels the deletion, do nothing
      return;
    }
  
    // Check if the deleted chat was the active one
    if (activeChatInstance === chatInstance) {
      const remainingChats = Object.keys(updatedChats);
  
      if (remainingChats.length > 0) {
        // If there are remaining chats, set the active chat instance to the first available chat
        setActiveChatInstance(remainingChats[0]);
      } else {
        // If no chats remaining, set the active chat instance to "Chat 1"
        setActiveChatInstance("Chat 1");
      }
    }
  
    // Update the state with the modified chat responses
    setChatResponses(updatedChats);
  };

  // const handleRenameChat = (oldChatName: string, newChatName: string) => {
  //   setChatResponses((prevChatResponses) => {
  //     const updatedChats = { ...prevChatResponses };
  
  //     if (updatedChats.hasOwnProperty(oldChatName) && oldChatName !== newChatName) {
  //       // Rename the chat
  //       updatedChats[newChatName] = updatedChats[oldChatName];
  //       delete updatedChats[oldChatName];
  
  //       // If the renamed chat was active, update the active chat instance
  //       if (activeChatInstance === oldChatName) {
  //         setActiveChatInstance(newChatName);
  //       }
  //     }
  
  //     return updatedChats;
  //   });
  // };
  
  
  
  
  const getGPTResult = async (_promptToRetry?: string | null, _uniqueIdToRetry?: string | null) => {
    console.log('Entering getGPTResult function');
    // Get the prompt input
    const _prompt = _promptToRetry ?? htmlToText(prompt);

    // If a response is already being generated or the prompt is empty, return
    if (isLoading || !_prompt) {
      return;
    }

    setIsLoading(true);

    // Clear the prompt input
    setPrompt('');

    let uniqueId: string;
    if (_uniqueIdToRetry) {
      uniqueId = _uniqueIdToRetry;
    } else {
      // Add the self prompt to the response list
      addResponse(true, _prompt);
      uniqueId = addResponse(false);
      await delay(50);
      addLoader(uniqueId);
    }

    try {
      console.log('Before axios.post');
      // Send a POST request to the API with the prompt in the request body
      const response = await axios.post('https://chat-gpt-clone-backend.vercel.app/get-prompt-result', {
        prompt: _prompt,
        model: 'gpt', // Set the model value directly to 'gpt'
      });

      console.log('After axios.post', response);

      const responseData = response.data.copies[0].content.trim();
      // Log the responseData object
      console.log('Response Data:', responseData);

      updateResponse(uniqueId, {
        response: responseData,
      });
      console.log('Updated Response List:', chatResponses[activeChatInstance] || []);

      setPromptToRetry(null);
      setUniqueIdToRetry(null);
    } catch (err) {
      console.error('Error from server:', err);
      setPromptToRetry(_prompt);
      setUniqueIdToRetry(uniqueId);
      updateResponse(uniqueId, {
        // @ts-ignore
        response: `Error: ${err.message}`,
        error: true,
      });
    } finally {
      console.log('Leaving getGPTResult function');
      // Clear the loader interval
      // clearInterval(loadInterval);
      clearLoader(uniqueId);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    saveChatInstances(chatResponses);
  }, [chatResponses, activeChatInstance]);

  return (
    <div className="flex">
      <div className="w-1/5 bg-custom-color">
        <Sidebar
          chats={Object.keys(chatResponses)}
          onCreateChat={handleCreateChat}
          onSwitchChat={handleSwitchChat}
          onDeleteChat={handleDeleteChat} 
          // onRenameChat={handleRenameChat}
          activeChatInstance={activeChatInstance}
        />
      </div>
      <div className="flex-1 chat-container">
        <div className="response-list">
        {Object.keys(chatResponses[activeChatInstance] || {}).length === 0 && (
          <h1 className="title">LongShotGPT</h1>
        )}
          <PromptResponseList responseList={chatResponses[activeChatInstance] || []} key="response-list" />
        </div>
        {uniqueIdToRetry && chatResponses[activeChatInstance]?.some((response) => response.id === uniqueIdToRetry) && (
          <div className="regenerate-button-container">
            <button
              id="regenerate-response-button"
              className={`regenerate-response-button ${isLoading ? 'loading' : ''}`}
              onClick={() => regenerateResponse()}
            >
              Regenerate Response
            </button>
          </div>
        )}
        <div className="input-container">
          <PromptInput
            prompt={prompt}
            onSubmit={() => getGPTResult()}
            key="prompt-input"
            updatePrompt={(prompt) => setPrompt(prompt)}
            placeholder="Type your message here..."
            className="prompt-input"
          />
          <button
            id="submit-button"
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            onClick={() => getGPTResult()}
          >
            <HiOutlineUpload size={20} className="upload-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;