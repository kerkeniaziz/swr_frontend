<template>
  <div class="chatbot-page" > 
    <div id="chatbot-container" /> 
    <img src="../assets/img/bot-icon.png" class="d-none">
  </div>
</template>
  
  <script>
  export default {
    name: 'ChatBotPage',
    mounted() {
        this.loadStart()
    },
    
    beforeUnmount() {
  // Remove the flowise-chatbot element if it exists
  const chatbotElement = document.querySelector("flowise-chatbot");
  if (chatbotElement) {
    chatbotElement.remove();
  }
},
    methods: {
        loadStart(){
            if (this.$store.state.profileData?.firstName ||this.$store.state.profileData?.companyId?.companyName){
                this.loadChatbot()
            }
            else
            {
                setTimeout(() => {
                    this.loadChatbot()
                }, 2000);
            }
            
        },
      loadChatbot() {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
        script.onload = () => {
          window.Chatbot.init({
            chatflowid: "1b949032-4b25-4e10-a537-2513ee650681",
            apiHost: "https://swrchatbot.azurewebsites.net",
            theme: {
      button: {
        backgroundColor: 'rgb(13 110 253)',
        right: 20,
        bottom: 20,
        size: 48, // small | medium | large | number
        dragAndDrop: true,
        iconColor: 'white',
        customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
        autoWindowOpen: {
          autoOpen: false, //parameter to control automatic window opening
          openDelay: 1, // Optional parameter for delay time in seconds
          autoOpenOnMobile: false, //parameter to control automatic window opening in mobile
        },
      },
      tooltip: {
        showTooltip: true,
        tooltipMessage: 'Hi There 👋!',
        tooltipBackgroundColor: 'rgb(13 110 253)',
        tooltipTextColor: 'white',
        tooltipFontSize: 16,
      },
      chatWindow: {
        showTitle: true,
        showAgentMessages: true,
        title: 'SWR ChatBot',
        titleAvatarSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
        welcomeMessage: `Hello! ${this.$store.state.profileData?.firstName ||this.$store.state.profileData?.companyId?.companyName} how can I help?`,
        errorMessage: `Oops!  ${this.$store.state.profileData?.firstName ||this.$store.state.profileData?.companyId?.companyName} look like there's a problem`,
        backgroundColor: '#ffffff',
        backgroundImage: 'enter image path or link', // If set, this will overlap the background color of the chat window.
        height: 600,
        width: 400,
        fontSize: 16,
        starterPromptFontSize: 15,
        botMessage: {
          backgroundColor: '#f7f8ff',
          textColor: '#303235',
          showAvatar: true,
          avatarHeight:20,
          avatarSrc: 'http://localhost:8080/img/bot-icon.48db3e8f.png' ,
        },
        userMessage: {
          backgroundColor: '#3B81F6',
          textColor: '#ffffff',
          showAvatar: true,
          avatarSrc: `${this.$store.state.profileImage}`,
        },
        textInput: {
          placeholder: 'Type your question',
          backgroundColor: '#ffffff',
          textColor: '#303235',
          sendButtonColor: '#3B81F6',
          maxChars: 50,
          maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 50 characters.',
          autoFocus: true, // If not used, autofocus is disabled on mobile and enabled on desktop. true enables it on both, false disables it on both.
          sendMessageSound: true,
          // sendSoundLocation: "send_message.mp3", // If this is not used, the default sound effect will be played if sendSoundMessage is true.
          receiveMessageSound: true,
          // receiveSoundLocation: "receive_message.mp3", // If this is not used, the default sound effect will be played if receiveSoundMessage is true.
        },
        feedback: {
          color: '#303235',
        },
        footer: {
          textColor: '#303235',
          text: 'Powered by',
          company: 'SWR',
          companyLink: 'https://swrfrontend.azurewebsites.net/',
        },
      },
    },
          });
        };
        document.getElementById("chatbot-container").appendChild(script);
      },
    },
  };
  </script>
  
  <style scoped>
  .chatbot-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  flowise-chatbot:shadow-root span.w-full{
    display: none !important;
  }
  </style>
  