# User Login & Registration Auth Using Flask (for logic) & React (for UI)
This is a simple login and logout app, made using react and flask. you can follow the steps below to set ths app on your own device and try out. It uses the JWT token authorization to validate the password while logging in.

The UI is kept simple, as the functionality and working was the main motive here

## Folder Structure
- 'frontend' - contains the react files
- 'backend' - contains the flask.py file

## Setup
### Backend
1. Move to 'backend' folder
   ```bash
   cd backend
   ```
2. Install the python dependencies
   ```bash
   pip install -r requirements.txt
    ```
3. Create a .env file to store your 'JWT_SECRET_KEY'
4. Start the flask app
   ```bash
   python app.py
   ```
   
### Frontend
1. Move to 'frontend' folder
   ```bash
   cd frontend
   ```
2. Install the node.js dependencies
   ```bash
   npm install
   ```
3. Start the React app
   ```bash
   npm start
   ```

## Testing
Now the backend is running `http://127.0.0.1:5000` while the frontend is running on `http://localhost:3000`, both synced to each other.

## Alternate Way To Run The Files (recommended)
To run the flask and react app, you need to have two terminals running at the same moment, but you can save the effort with the following set of commands. Make sure you first install the necessary dependencies and then run these steps.
1. Move the folder where you haev backend and frontend file located and move to the terminal
    ```bash
    npm install -g concurrently
    ```
2.  ```bash
    concurrently "cd backend && python app.py" "cd backend && npm start"
    ```
3. The above command works on Windows, but for Linux, one additionaly step is needed
    ```bash
    chmod +x start.sh
    ```
   And then just
    ```bash
    ./start.sh
    ```
   

Feel free to submit issues or pull requests to improve this API. Was just learning about flask and dockerfiles.

**Connect with me on**:
* [Linkedin](https://www.linkedin.com/in/siddharth-chaberia/)
* [Telegram](https://t.me/SiddharthChaberia)
* [Facebook](https://www.facebook.com/chaberia.siddharth/)
* [Instagram](https://www.instagram.com/siddharth_chaberia_02/)
* [Twitter](https://x.com/03Chaberia)
