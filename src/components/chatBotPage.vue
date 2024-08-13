<template>
  <div class="chatbot-page"> 
    <div id="chatbot-container" /> 
  </div>
</template>
  
  <script>
  export default {
    mounted() {
      // Initialize the chatbot when the component is mounted
      this.loadChatbot();
    },
    methods: {
      loadChatbot() {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
        script.onload = () => {
          window.Chatbot.init({
            chatflowid: "8dc593d4-ceb7-4383-8a99-8d2f3d40f980",
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
          autoOpen: true, //parameter to control automatic window opening
          openDelay: 2, // Optional parameter for delay time in seconds
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
        welcomeMessage: 'Hello! This is custom welcome message',
        errorMessage: 'This is a custom error message',
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
          avatarSrc: 'http://localhost:8080/img/icon.389fc109.png' ,
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
  