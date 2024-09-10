import { GoogleGenerativeAI } from "@google/generative-ai"
  
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
export const ai_prompt = "Create a time table for {task} within {days} days working for {hours} hours a day in JSON format"
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
  
export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
          role: "user",
          parts: [
            {text: "Create a time table for developing a todo app using react.js within 2 days working for 4 hours a day in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"day1\": {\n    \"morning\": [\n      {\n        \"task\": \"Set up React Development Environment\",\n        \"description\": \"Install Node.js, npm/yarn, create-react-app, and set up a new project\",\n        \"duration\": \"1 hour\"\n      },\n      {\n        \"task\": \"Create Basic Todo List Structure\",\n        \"description\": \"Create components for adding, displaying, and deleting tasks\",\n        \"duration\": \"1 hour\"\n      },\n      {\n        \"task\": \"Implement Task Input and Addition\",\n        \"description\": \"Create a form to add new tasks and handle input events\",\n        \"duration\": \"1 hour\"\n      },\n      {\n        \"task\": \"Display Todo List Items\",\n        \"description\": \"Render a list of tasks dynamically based on state\",\n        \"duration\": \"1 hour\"\n      }\n    ],\n    \"afternoon\": [\n      {\n        \"task\": \"Implement Task Completion Feature\",\n        \"description\": \"Add functionality to mark tasks as complete and display completed status\",\n        \"duration\": \"1 hour\"\n      },\n      {\n        \"task\": \"Add Task Editing Functionality\",\n        \"description\": \"Implement a way to edit existing tasks\",\n        \"duration\": \"1 hour\"\n      },\n      {\n        \"task\": \"Implement Task Deletion Functionality\",\n        \"description\": \"Add functionality to remove completed or unwanted tasks\",\n        \"duration\": \"1 hour\"\n      },\n      {\n        \"task\": \"Basic Styling and Layout\",\n        \"description\": \"Apply basic CSS for visual appeal and layout\",\n        \"duration\": \"1 hour\"\n      }\n    ]\n  },\n  \"day2\": {\n    \"morning\": [\n      {\n        \"task\": \"Implement Local Storage Persistence\",\n        \"description\": \"Save and retrieve todo list data using local storage\",\n        \"duration\": \"1.5 hours\"\n      },\n      {\n        \"task\": \"Add Sorting and Filtering Options\",\n        \"description\": \"Implement functionality to sort and filter tasks by different criteria\",\n        \"duration\": \"1.5 hours\"\n      }\n    ],\n    \"afternoon\": [\n      {\n        \"task\": \"Refactoring and Code Optimization\",\n        \"description\": \"Review code, apply best practices, and optimize for performance\",\n        \"duration\": \"1 hour\"\n      },\n      {\n        \"task\": \"Testing and Debugging\",\n        \"description\": \"Write unit tests to ensure functionality and fix any bugs\",\n        \"duration\": \"1 hour\"\n      },\n      {\n        \"task\": \"Final Polishing and Deployment\",\n        \"description\": \"Review and refine the app, then deploy to a hosting service\",\n        \"duration\": \"1 hour\"\n      }\n    ]\n  }\n}\n```\n\n**Notes:**\n\n* This is a sample timetable and may need adjustments based on your individual skill level and project requirements.\n* The durations are estimates and may vary depending on the complexity of each task.\n* It's important to take breaks throughout the day to avoid burnout.\n* You can add more tasks if necessary, but try to focus on the essential features first.\n* Don't be afraid to deviate from this schedule if you find yourself falling behind or if you need to prioritize certain tasks."},
          ],
        },
      ],
});

