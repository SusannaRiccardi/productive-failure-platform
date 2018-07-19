# Online platform for Productive Failure
This is a platform I developed for my Bachelor Project in University. It's an online platform that implements the Productive Failure approach, which is a way of designing teaching so that it addresses failure, instead of waiting for it to happen. 

For a more detailed description of the project, you can read the [report](report/SusannaRiccardi.pdf).

## Structure
The platform has a server written in Ruby on Rails, and the Frontend is written in React. 

### Backend
The Ruby on Rails server, that you can find in the `productive-failure-api` folder, implements a REST API, to which the React app performs AJAX requests.

Before starting the server, you must install the dependencies with `bundle install` in the folder. To start the server, you can use `rails s -p [port number]`.

For organizational matters, if you want to add a new activity, you can add the controllers to the `/app/controllers/api` folder, by adding a new folder with the name of your activity.

### Frontend
The Frontend was generated using `create-react-app`: you can find it in the `productive-failure-platform` folder. Before starting the app, you have to `npm install` all the dependencies. After that, you can start the Frontend app with `npm run start`. 

The folder contains the following subfolders:
- `public` that contains all the static content that is loaded at the beginning, like `index.html`.
- `src` consists of all the JavaScript files. This contains `index.js`, which is the first JavaScript file
that is loaded, `App.css`, which contains all the styling for the website, and two other folders:
`img`, which contains all the images for the website, and `components`, which contains all the
React components about the different (possible) activities on the application. Inside this
last folder there are subfolders used for organizing the different components. For example,
there is the `iteration` folder, that contains all the components related to the created activity.
