# React + Vite
The provided code is a React application that implements a Todo list functionality with user authentication. It consists of several components including SignUp, SignIn, Verify, SignOut, and TodoList. 
 
The SignUp component allows users to register by providing their email, password, and nickname. Upon successful registration, an API call is made to create a new user, and a success message is displayed. 
 
The SignIn component enables users to log in using their email and password. After successful authentication, the user's token is retrieved from the server and stored in the state. The token can be used for subsequent authorized API requests. 
 
The Verify component is responsible for verifying the user's token. It allows users to enter their token and sends a GET request to the server to validate the token. If the token is valid, a success message is displayed. 
 
The SignOut component allows users to log out by sending a POST request to the server to invalidate the token. 
 
The TodoList component displays a list of todos fetched from the server. It provides functionality to add, delete, update, and toggle the status of todos. Users can input a new todo, which is then sent to the server to be added to the list. Existing todos can be deleted, updated, or their status can be toggled between done and unfinished. 
 
The App component is the main component that renders all the other components. It manages the authentication token, retrieves the token from cookies, and sets it in the state. The TodoList component is conditionally rendered only if a valid token is present. 
 
In summary, this application allows users to register, log in, verify their token, manage a todo list, and log out. It utilizes Axios for making API requests to the server and manages user authentication using tokens. 
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

使用React構建的一個待辦事項清單功能，並具有用戶身份驗證。它包括了幾個組件，包括SignUp（註冊）、SignIn（登錄）、Verify（驗證）、SignOut（登出）和TodoList（待辦事項列表）。
 
SignUp組件允許用戶通過提供電子郵件、密碼和暱稱來進行註冊。在成功註冊後，會向服務器發送API請求以創建新用戶，並顯示註冊成功的消息。
 
SignIn組件允許用戶使用電子郵件和密碼進行登錄。在成功驗證身份後，會從服務器獲取用戶的令牌並將其存儲在狀態中。該令牌可用於後續的授權API請求。
 
Verify組件用於驗證用戶的令牌。用戶可以輸入令牌，並向服務器發送GET請求以驗證令牌的有效性。如果令牌有效，則顯示驗證成功的消息。
 
SignOut組件允許用戶通過向服務器發送POST請求來註銷。該請求會使令牌失效。
 
TodoList組件顯示從服務器獲取的待辦事項列表。它提供了添加、刪除、更新和切換待辦事項狀態的功能。用戶可以輸入新的待辦事項，然後將其發送到服務器以添加到列表中。現有的待辦事項可以被刪除、更新，或者其狀態可以在完成和未完成之間切換。
 
App組件是主要的組件，用於渲染其他所有組件。它管理身份驗證令牌，從cookie中獲取令牌並將其設置在狀態中。只有在存在有效的令牌時，TodoList組件才會被條件性地渲染。
 
總而言之，這個應用程序允許用戶註冊、登錄、驗證令牌、管理待辦事項列表和註銷。它使用Axios庫向服務器發送API請求，並使用令牌管理用戶身份驗證。

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
