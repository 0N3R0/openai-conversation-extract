# openai-conversation-extract
Extract your conversation from chatgpt[.]com, and save it into a single file.

Info about how to use the script:
1. The file you download will be named after your conversation ID. This helps you easily identify and manage your conversation files.
2. If you have any concerns or uncertainties about the script's safety, you can ask ChatGPT for more information. It’s always a good idea to clarify any doubts if you're unsure about the script's functionality or security.

Step 1:
Go to https://chatgpt.com.

Step 2:
Open the Developer Tools (DevTools).

Step 3:
Paste the script into the console and press Enter.

Step 4:
Select one of your conversations.

Step 5:
Reopen DevTools if you closed them.

Step 6:
To check if the script has captured your conversation history, type conversation.conversation into the console.

Step 7:
Press Enter.

Step 8:
To download the conversation data, type conversation.download_as_file() into the console.

Step 9:
Press Enter again to initiate the download.


Info about how the script works:
1. This script is designed to intercept data from the URL https://chatgpt.com/backend-api/conversation/...conversation_id. This URL is used by the site to download your conversation.
2. Once the data is intercepted, the script stores your conversation in a format that resembles how the official ChatGPT API handles it. For reference, you can check out the details in the: https://platform.openai.com/docs/guides/chat-completions/getting-started.
3. After processing the data, the script allows you to download the information as a .json file. This feature makes it easy for you to keep a copy of your conversation if you wish.
4. Rest assured, the script is designed to be safe and user-friendly. It does not perform any actions that would harm your system or data. Its sole purpose is to help you manage and save your conversation data effectively.


Thanks for visiting that project.
