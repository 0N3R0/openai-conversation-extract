class Conversation {
    constructor() {
        this.conversation = {
            conversation_id: "",
            history: {
                model: undefined,
                messages: [],
            },
        };
    };

    set_conversation_id(conversation_response) {
        this.conversation.conversation_id = conversation_response?.conversation_id;
    };

    set_model(mapping_node_id) {        
        if (!this.conversation.history.model)
           this.conversation.history.model = mapping_node_id?.message?.metadata?.model_slug;
    };

    set_messages(mapping_node_id) {
        let message = mapping_node_id?.message;
        let role = message?.author?.role;
        let content = message?.content?.parts.join("\n\n");

        if (!role)
            return;

        if (this.conversation.history.messages.length > 0 && role == "system") {
            if (this.conversation.history.messages[0].role == "system") {
                return;
            }
        }
        
        this.conversation.history.messages.push(
            {role: role, content: content}
        );
    };

    download_as_file () {
        if (!this.conversation.conversation_id)
            throw("You have to privide conversation_id");
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.conversation, null, 4));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `${this.conversation.conversation_id}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    }
}
let conversation = new Conversation();

const originalFetch = window.fetch;
window.fetch = async (...args) => {
    const [resource, config] = args;
    const urlToWatch = "https://chatgpt.com/backend-api/conversation/";
    
    if (resource.includes(urlToWatch)) {
        console.log(`Intercepted request to: ${resource}`);
    }

    const response = await originalFetch(...args);

    if (resource.includes(urlToWatch) && resource.split("/")[resource.split("/").length - 1].includes("-")) {
        const clonedResponse = response.clone();
        try {
            const content = await clonedResponse.json();
            console.log(`Response content: ${content}`);

            conversation.set_conversation_id(content);

            let keys = Object.keys(content.mapping);
            for (let key of keys) {            
                conversation.set_model(content.mapping[key]);
                conversation.set_messages(content.mapping[key]);
            }

            console.log(conversation.conversation);
        } catch(e) {
            console.log(e);
        }
    }

    return response;
};
