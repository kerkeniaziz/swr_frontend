<template>
  <div class="chatbot-page"> 
    <div id="chatbot-container" /> 
    <img
      src="../assets/img/bot-icon.png"
      class="d-none"
    >
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
          let name = ''
           if(this.$store.state.profileData?.firstName != undefined)
            name = this.$store.state.profileData?.firstName
          else if(this.$store.state.profileData?.companyName != undefined)
          name = this.$store.state.profileData?.companyName
        else if(this.$store.state.profileData?.companyId?.companyName != undefined)
        name = this.$store.state.profileData?.companyId?.companyName
            
                setTimeout(() => {
                    this.loadChatbot(name)
                }, 4000);
            
        },
      loadChatbot(name) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
        script.onload = () => {
          window.Chatbot.init({
            chatflowid: "22c92709-96e4-42d1-9614-85c610b972df",
            apiHost: "https://swrchatbot.azurewebsites.net",
            theme: {
      button: {
        backgroundColor: 'rgb(13 110 253)',
        right: 20,
        bottom: 20,
        size: 48, // small | medium | large | number
        dragAndDrop: true,
        iconColor: 'white',
        customIconSrc: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-messages-icon.png',
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
        titleAvatarSrc: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-messages-icon.png',
        welcomeMessage: `Hello! ${name}, how can I help?`,
        errorMessage: `Oops! ${name}, look like there's a problem`,
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
          avatarSrc: 'https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478849771.jpg' ,
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
          maxChars: 500,
          maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 500 characters.',
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
  
