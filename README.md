# polling-system

## Getting Started

To get the API up and running on your local machine, follow these steps:

1. Clone the repository:
   git clone https://github.com/nikisrma/polling-system.git

3. Install dependencies:
    cd polling-system
    npm install

4. Set up MongoDB:
    Update the MongoDB connection string in `db.config.js` to connect to your database.

5. Start the server:
    The server will run on http://localhost:8000 by default.
   
6. Routes

    - `GET /` - Render the index page.
    
    - `POST /questions/create` - Create a new question. (validation using the ValidateQuestion middleware)
    
    - `POST /questions/:id/options/create` - Create a new option for a question. (validation using the validateOption middleware)
    
    - `GET /questions/list` - Get a list of all questions.
    
    - `GET /options/list` - Get a list of all options.
    
    - `GET /questions/:id/delete` - Delete a question by ID. (Requires validation using the validateQuestionId middleware)
    
    - `GET /options/:id/delete` - Delete an option by ID. (Requires validation using the validateOptionId middleware)
    
    - `GET /options/:id/add_vote` - Add a vote to an option by ID. (Requires validation using the validateOptionId middleware)
    
    - `GET /questions/:id` - View details of a question by ID. (Requires validation using the validateQuestionId middleware)

A custom validator to validate incoming data for creating questions and options. The validation logic can be found in the `validator/validate.js` file.
The API routes are handled by controllers located in the `controllers/home_controller.js` file.
