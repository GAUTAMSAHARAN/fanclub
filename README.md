# fanclubApi
**fanclub is a web chatting app, where you can creater groups send messages and images via websockets with dark and light mode, also have google and facebook registration**

This is the repository for the **frontend** application of fanclub. Click [here](https://github.com/GAUTAMSAHARAN/fanclubApi) to go to the backend repository.

# Setup instructions:

- Clone this repository to a folder on your device.

- If you want to run google and facebook registration
  - Go into src/components/forms/registration now you have to put google Client Id into `googleRegistration.jsx` and facebook App Id into `facebookRegistration.jsx`
  ```javascript
              <GoogleLogin
                clientId="<put your google client id here>"
                render={renderProps => (
                    <Button
                        className="google-login-button"
                        color='google plus'
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <Icon name='google' /> Google
                    </Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
  ```
- In the root directory of the project run:
  - Run `yarn install` in project directory.
  - `yarn start` to... run the server! your development server is running at localhost:3000
  
- You are ready to use the app! Bon testing :)

