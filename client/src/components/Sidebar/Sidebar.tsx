// // Sidebar.tsx
// import React, { FC, useState } from 'react';
// import { HiMenu } from 'react-icons/hi';
// import '../../styles/tailwind.css';

// interface SidebarProps {
//   chats: string[];
//   onCreateChat: () => void;
//   onSwitchChat: (chatInstance: string) => void;
//   activeChatInstance: string;
// }

// const Sidebar: FC<SidebarProps> = ({ chats, onCreateChat, onSwitchChat, activeChatInstance }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   const handleToggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
//       <button className="toggle-button" onClick={handleToggleCollapse}>
//         <HiMenu size={24} /> {/* Adjust the size as needed */}
//       </button>
//       {!collapsed && (
//         <div>
//           <div className="chat-list">
//             <h2>Chats</h2>
//             <ul>
//               {chats.map((chatInstance) => (
//                 <li
//                   key={chatInstance}
//                   className={activeChatInstance === chatInstance ? 'active-chat' : ''}
//                   onClick={() => onSwitchChat(chatInstance)}
//                 >
//                   {chatInstance}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="create-chat">
//             <button onClick={onCreateChat}>Create New Chat</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// // Sidebar.tsx
// import React, { FC, useState } from 'react';
// import { HiMenu } from 'react-icons/hi';
// import { HiOutlinePlus } from "react-icons/hi";
// import '../../styles/tailwind.css';

// interface SidebarProps {
//   chats: string[];
//   onCreateChat: () => void;
//   onSwitchChat: (chatInstance: string) => void;
//   activeChatInstance: string;
// }

// const Sidebar: FC<SidebarProps> = ({ chats, onCreateChat, onSwitchChat, activeChatInstance }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   const handleToggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
//       <button className="toggle-button" onClick={handleToggleCollapse}>
//         <HiMenu size={24} /> {/* Adjust the size as needed */}
//       </button>
//       {!collapsed && (
//         <div>
//           <div className="chat-list">
//             <h2>Chats</h2>
//             <ul>
//               {chats.map((chatInstance) => (
//                 <li
//                   key={chatInstance}
//                   className={`chat-item ${activeChatInstance === chatInstance ? 'active-chat' : ''}`}
//                   onClick={() => onSwitchChat(chatInstance)}
//                 >
//                   {chatInstance}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="create-chat">
//             <button onClick={onCreateChat} className="flex items-center">
//                 <HiOutlinePlus size={20} className="plusicon"/> New Chat
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { FC, useState } from 'react';
// import { HiMenu } from 'react-icons/hi';
// import { HiOutlinePlus } from "react-icons/hi";
// import '../../styles/tailwind.css';

// interface SidebarProps {
//   chats: string[];
//   onCreateChat: () => void;
//   onSwitchChat: (chatInstance: string) => void;
//   activeChatInstance: string;
// }

// const Sidebar: FC<SidebarProps> = ({ chats, onCreateChat, onSwitchChat, activeChatInstance }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   const handleToggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
//       <button className="toggle-button" onClick={handleToggleCollapse}>
//         <HiMenu size={24} /> {/* Adjust the size as needed */}
//       </button>
//       {!collapsed && (
//         <div>
//           <div className="chat-list">
//             <h2>Chats</h2>
//             <ul>
//               {chats.map((chatInstance) => (
//                 <li
//                   key={chatInstance}
//                   className={`chat-item ${activeChatInstance === chatInstance ? 'active-chat' : ''}`}
//                   onClick={() => onSwitchChat(chatInstance)}
//                 >
//                   {chatInstance}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="create-chat">
//             <button onClick={onCreateChat} className="flex items-center">
//                 <HiOutlinePlus size={20} className="plusicon"/> New Chat
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { FC, useState } from 'react';
// import { HiMenu } from 'react-icons/hi';
// import { HiOutlinePlus } from 'react-icons/hi';
// import '../../styles/tailwind.css';

// interface SidebarProps {
//   chats: string[];
//   onCreateChat: () => void;
//   onSwitchChat: (chatInstance: string) => void;
//   activeChatInstance: string;
// }

// const Sidebar: FC<SidebarProps> = ({ chats, onCreateChat, onSwitchChat, activeChatInstance }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   const handleToggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
//       <div className="top-section flex items-center justify-between">
//         <div className="flex items-center">
//           <div className="create-chat">
//             <button onClick={onCreateChat} className="flex items-center">
//               <HiOutlinePlus size={20} className="plusicon" /> New Chat
//             </button>
//           </div>
//           <button className="toggle-button" onClick={handleToggleCollapse}>
//             <HiMenu size={24} />
//           </button>
//         </div>
//         {/* Additional buttons or components can be added here */}
//       </div>
//       {!collapsed && (
//         <div className="chat-list">
//           <h2>Chats</h2>
//           <ul>
//             {chats.map((chatInstance) => (
//               <li
//                 key={chatInstance}
//                 className={`chat-item ${activeChatInstance === chatInstance ? 'active-chat' : ''}`}
//                 onClick={() => onSwitchChat(chatInstance)}
//               >
//                 {chatInstance}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import React, { FC, useState } from 'react';
import { HiMenu, HiOutlinePlus,  HiOutlineTrash, HiOutlinePencilAlt } from 'react-icons/hi';
import '../../styles/tailwind.css';

interface SidebarProps {
    chats: string[];
    onCreateChat: () => void;
    onSwitchChat: (chatInstance: string) => void;
    onDeleteChat: (chatInstance: string) => void;
    // onRenameChat: (chatInstance: string, newChatName: string) => void;
    activeChatInstance: string;
}

const Sidebar: FC<SidebarProps> = ({ chats, onCreateChat, onSwitchChat, onDeleteChat, activeChatInstance }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

//   const handleRenameChat = (event: React.FormEvent, chatInstance: string) => {
//     event.preventDefault();
//     if (newChatName.trim() !== "") {
//       onRenameChat(chatInstance, newChatName);
//       setNewChatName("");
//     }
//   };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="top-section">
        <div className="flex items-center">
          {!collapsed && (
            <div className="create-chat">
              <button onClick={onCreateChat} className="flex items-center">
                <HiOutlinePencilAlt size={20} className="plusicon" /> New Chat
              </button>
            </div>
          )}
          <button className="toggle-button" onClick={handleToggleCollapse}>
            <HiMenu size={24} />
          </button>
        </div>
        {/* Additional buttons or components can be added here */}
      </div>
      {!collapsed && (
        <div className={`chat-list`}>
        <h2>Chats</h2>
        <ul>
          {chats.map((chatInstance) => (
            <li
              key={chatInstance}
              className={`chat-item ${activeChatInstance === chatInstance ? 'active-chat' : ''}`}
              onClick={() => onSwitchChat(chatInstance)}
            >
              {chatInstance}
              <button onClick={() => onDeleteChat(chatInstance)} title="Delete" className='deletebtn'>
                <HiOutlineTrash size={16}/>
              </button>
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
};

export default Sidebar;

// import React, { FC, useState } from 'react';
// import { HiMenu, HiOutlinePlus, HiPencilAlt, HiTrash } from 'react-icons/hi';
// import '../../styles/tailwind.css';

// interface SidebarProps {
//   chats: string[];
//   onCreateChat: () => void;
//   onSwitchChat: (chatInstance: string) => void;
//   onDeleteChat: (chatInstance: string) => void; // Add onDeleteChat prop
//   activeChatInstance: string;
// }

// const Sidebar: FC<SidebarProps> = ({ chats, onCreateChat, onSwitchChat, onDeleteChat, activeChatInstance }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [renameChat, setRenameChat] = useState<string | null>(null);

//   const handleToggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   const handleRenameChat = (chatInstance: string) => {
//     setRenameChat(chatInstance);
//   };

//   const handleSaveRename = (newName: string) => {
//     const updatedChats = chats.map((chat) => (chat === renameChat ? newName : chat));
//     setRenameChat(null);
//     // Implement logic to save the updated chat list
//     console.log('Renamed chat:', renameChat, 'to:', newName);
//   };

//   const handleCancelRename = () => {
//     setRenameChat(null);
//   };

//   return (
//     <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
//       <div className="top-section">
//         <div className="flex items-center">
//           {!collapsed && (
//             <div className="create-chat">
//               <button onClick={onCreateChat} className="flex items-center">
//                 <HiOutlinePlus size={20} className="plusicon" /> New Chat
//               </button>
//             </div>
//           )}
//           <button className="toggle-button" onClick={handleToggleCollapse}>
//             <HiMenu size={24} />
//           </button>
//         </div>
//         {/* Additional buttons or components can be added here */}
//       </div>
//       {!collapsed && (
//         <div className="chat-list">
//           <h2>Chats</h2>
//           <ul>
//             {chats.map((chatInstance) => (
//               <li key={chatInstance} className={`chat-item ${activeChatInstance === chatInstance ? 'active-chat' : ''}`}>
//                 {renameChat === chatInstance ? (
//                   <div className="rename-input">
//                     <input
//                       type="text"
//                       defaultValue={chatInstance}
//                       autoFocus
//                       onBlur={(e) => handleSaveRename(e.target.value)}
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                           handleSaveRename(e.currentTarget.value);
//                         } else if (e.key === 'Escape') {
//                           handleCancelRename();
//                         }
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   <>
//                     <span>{chatInstance}</span>
//                     <div className="chat-buttons">
//                       <button onClick={() => handleRenameChat(chatInstance)} title="Rename">
//                         <HiPencilAlt size={16} />
//                       </button>
//                       <button onClick={() => onDeleteChat(chatInstance)} title="Delete">
//                         <HiTrash size={16} />
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
