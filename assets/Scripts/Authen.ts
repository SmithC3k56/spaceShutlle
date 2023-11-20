import { _decorator, Component, director, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Authen')
export class Authen extends Component {

    @property({ type: EditBox })
    usernameInput: EditBox;

    @property({ type: EditBox })
    passwordInput: EditBox;

    // Called when the login button is clicked
    async onLoginButtonClick() {
        const username = this.usernameInput.string;
        const password = this.passwordInput.string;

        // Make a request to your backend server
        await this.sendLoginRequest(username, password);
    }

    // Send login request to the backend server
    async sendLoginRequest(username, password) {
        fetch('http://localhost:4000/Users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the JSON response
            const token = data.token; // Adjust this based on your actual JSON structure
            if(token) this.loadScene("MainGame");
            // Now you can use the token for further actions
            console.log('Token:', token);
        })
        .catch(error => {
            console.error('Error during login request:', error);
        });
    }


    // Called when you want to load a new scene
    loadScene( nameScene:string) {
        director.loadScene(nameScene, () => {
            console.log(`Scene ${nameScene} loaded`);
            // Additional logic after the scene is loaded can go here
        });
    }
    
}


