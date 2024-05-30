const {Prisma} = require('@prisma/client')

const users = [
    {
        id: 'clwrxrnf10000116pakduatio',
        name: 'test',
        evaluation: false,
    }
]


const categories = [
    {
      id: 'clwrxdud700001451wajtf3bk',
      name: 'HTML & CSS',
      summary: 'HTML and CSS form the backbone of web development. HTML is used to structure content on the web, while CSS is used to style and layout web pages. Understanding both is crucial for creating visually appealing and well-structured websites. Advanced techniques like responsive design and CSS frameworks enhance user experience across different devices.',
      order: 1
    },
    {
      id: 'clwrxdud9000114516ciqu487',
      name: 'JavaScript',
      summary: 'JavaScript is a powerful, versatile language that enables dynamic content and interactivity on web pages. Mastery of JavaScript includes understanding its basic syntax, DOM manipulation, and advanced concepts like asynchronous programming and event handling.',
      order: 2
    },
    {
      id: 'clwrxdud9000214511uv2u18j',
      name: 'JavaScript Frameworks',
      summary: 'JavaScript frameworks and libraries like React, Vue.js, and Angular streamline the development of complex web applications by providing reusable components, state management, and efficient data handling.',
      order: 3
    },
    {
      id: 'clwrxdud900031451u0qdb59q',
      name: 'Backend Development Basics',
      summary: 'Backend development involves building and managing the server-side logic and databases that power web applications. Node.js and Express.js are popular tools for backend development in JavaScript.',
      order: 4
    },
    {
      id: 'clwrxdud900041451wbeewhon',
      name: 'Database Basics',
      summary: 'Databases are essential for storing and managing data in web applications. SQL and NoSQL databases offer different approaches to data management, each with its strengths and use cases.',
      order: 5
    },
    {
      id: 'clwrxdud900051451j433h5kd',
      name: 'Authentication & Security',
      summary: 'Security is paramount in web development, involving protecting applications from threats and ensuring user data privacy. Authentication verifies user identity, while security practices prevent common vulnerabilities.',
      order: 6
    },
    {
      id: 'clwrxdud90006145170unarul',
      name: 'DevOps Basics',
      summary: 'DevOps practices integrate development and operations to streamline the software lifecycle. Version control systems like Git enable collaborative development, while CI/CD pipelines automate testing and deployment.',
      order: 7
    },
    {
      id: 'clwrxduda00071451dm53txgk',
      name: 'Web Hosting & Deployment',
      summary: 'Web hosting and deployment involve making web applications accessible on the internet. This includes choosing the right hosting service and deploying applications efficiently.',
      order: 8
    },
    {
      id: 'clwrxduda00081451tk7xzx3p',
      name: 'APIs',
      summary: 'APIs (Application Programming Interfaces) enable communication between different software systems. RESTful APIs and GraphQL are popular methods for building and consuming APIs.',
      order: 9
    },
    {
      id: 'clwrxduda00091451i16dnpsm',
      name: 'Testing',
      summary: 'Testing ensures the reliability and functionality of web applications. Frontend testing includes unit tests and end-to-end tests, while backend testing focuses on API endpoints and database interactions.',
      order: 10
    }
  ]


const questions = [
    {
      id: 'clwrxg3fe000d1451ea0kpljc',
      question: 'What is CSS, and how do you apply it to an HTML document?',
      expected_answer: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It can be applied via inline styles, internal styles within the <style> tag, or external stylesheets linked using <link rel="stylesheet" href="styles.css">.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxdud700001451wajtf3bk'
    },
    {
      id: 'clwrxg3fe000e1451nl6q6sc5',
      question: 'How do you create a responsive web design using CSS?',
      expected_answer: "Responsive web design is achieved using media queries to apply different styles based on the device's screen size.",
      order: 2,
      difficulty: null,
      categoryId: 'clwrxdud700001451wajtf3bk'
    },
    {
      id: 'clwrxg3fe000f14518g5qyyxg',
      question: 'What is HTML, and how do you structure a basic HTML document?',
      expected_answer: 'HTML (HyperText Markup Language) is the standard language for creating web pages. A basic HTML document is structured with <!DOCTYPE html>, <html>, <head>, and <body> tags.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxdud700001451wajtf3bk'
    },
    {
      id: 'clwrxh67c000g1451py2xtfdm',
      question: 'What is JavaScript, and how is it used in web development?',
      expected_answer: 'JavaScript is a scripting language used to create dynamic and interactive content on web pages, enabling features like form validation, animations, and asynchronous data fetching.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxdud9000114516ciqu487'
    },
    {
      id: 'clwrxh67d000h1451glb0jfe5',
      question: 'How do you declare variables in JavaScript? Provide examples.',
      expected_answer: 'Variables can be declared using var, let, or const.',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxdud9000114516ciqu487'
    },
    {
      id: 'clwrxh67i000i1451dgeqwryl',
      question: 'What are JavaScript promises, and how do you use them?',
      expected_answer: 'Promises are objects representing the eventual completion or failure of an asynchronous operation, handled using .then() and .catch().',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxdud9000114516ciqu487'
    },
    {
      id: 'clwrxii9z000j1451dvjyxjvv',
      question: 'What is React, and how do you create a simple React component?',
      expected_answer: 'React is a JavaScript library for building user interfaces. A simple React component can be created as a function or class.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxdud9000214511uv2u18j'
    },
    {
      id: 'clwrxiia0000k14511gusdaxw',
      question: 'What is Vue.js, and how do you create a basic Vue component?',
      expected_answer: 'Vue.js is a progressive JavaScript framework for building user interfaces. A basic Vue component can be created using the Vue.component method.',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxdud9000214511uv2u18j'
    },
    {
      id: 'clwrxiia2000l1451vgai3g3k',
      question: 'What is Angular, and how do you set up an Angular project?',
      expected_answer: 'Angular is a platform for building mobile and desktop web applications. An Angular project can be set up using the Angular CLI with the command ng new project-name.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxdud9000214511uv2u18j'
    },
    {
      id: 'clwrxjndv000m1451kj81y5hc',
      question: 'What is Node.js, and how is it used in backend development?',
      expected_answer: "Node.js is a JavaScript runtime built on Chrome's V8 engine, enabling server-side execution of JavaScript.",
      order: 1,
      difficulty: null,
      categoryId: 'clwrxdud900031451u0qdb59q'
    },
    {
      id: 'clwrxjndv000n1451vrmcjxlu',
      question: 'How do you create a simple HTTP server using Node.js?',
      expected_answer: 'A simple HTTP server can be created using the http module.',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxdud900031451u0qdb59q'
    },
    {
      id: 'clwrxjndw000o1451c0837zmj',
      question: 'What is Express.js, and how do you create a basic Express application?',
      expected_answer: 'Express.js is a minimal and flexible Node.js web application framework.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxdud900031451u0qdb59q'
    },
    {
      id: 'clwrxkq8n000p145199eewnrc',
      question: 'What is SQL, and how do you perform basic CRUD operations using SQL?',
      expected_answer: 'SQL (Structured Query Language) is used to communicate with databases. CRUD operations include creating, reading, updating, and deleting data.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxdud900041451wbeewhon'
    },
    {
      id: 'clwrxkq8n000q1451zoscnit2',
      question: 'What is a NoSQL database, and how is it different from SQL databases?',
      expected_answer: 'NoSQL databases store data in formats other than relational tables, such as document, key-value, graph, or wide-column stores.',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxdud900041451wbeewhon'
    },
    {
      id: 'clwrxkq8n000r1451oe2u87dr',
      question: 'How do you perform CRUD operations in MongoDB?',
      expected_answer: 'CRUD operations in MongoDB are performed using methods like insertOne, find, updateOne, and deleteOne.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxdud900041451wbeewhon'
    },
    {
      id: 'clwrxlmz6000s1451fzav640h',
      question: 'What is authentication, and how do you implement it in a web application?',
      expected_answer: 'Authentication is the process of verifying the identity of users, often implemented using session management or token-based systems like JWT.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxdud900051451j433h5kd'
    },
    {
      id: 'clwrxlmz7000t14518546g5b5',
      question: 'What are common web security vulnerabilities?',
      expected_answer: 'Common web security vulnerabilities include SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxdud900051451j433h5kd'
    },
    {
      id: 'clwrxlmz7000u14510ad2j32c',
      question: 'How do you prevent SQL injection attacks?',
      expected_answer: 'SQL injection attacks can be prevented by using prepared statements, parameterized queries, and input validation.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxdud900051451j433h5kd'
    },
    {
      id: 'clwrxmwde000v1451awehvmpv',
      question: 'What is version control, and how do you use Git for version control?',
      expected_answer: 'Version control is a system that records changes to files over time so that specific versions can be recalled later. Git is a version control system that allows for branching, merging, and collaborative development.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxdud90006145170unarul'
    },
    {
      id: 'clwrxmwde000w1451ym9ez1n1',
      question: 'What is Continuous Integration/Continuous Deployment (CI/CD), and why is it important?',
      expected_answer: 'CI/CD automates the building, testing, and deployment of applications, ensuring faster and more reliable software releases.',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxdud90006145170unarul'
    },
    {
      id: 'clwrxmwde000x1451uyqrmby4',
      question: 'How do you set up a CI/CD pipeline?',
      expected_answer: 'A CI/CD pipeline can be set up using tools like Jenkins, Travis CI, or GitHub Actions to automate the process of testing and deploying code.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxdud90006145170unarul'
    },
    {
      id: 'clwrxo5ej000y1451w3pslode',
      question: 'What is web hosting, and what are the common types of web hosting services?',
      expected_answer: 'Web hosting provides the infrastructure to make web applications accessible over the internet. Common types include shared hosting, dedicated hosting, and cloud hosting.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxduda00071451dm53txgk'
    },
    {
      id: 'clwrxo5ek000z1451tpve27rf',
      question: 'How do you deploy a web application to a hosting service?',
      expected_answer: 'Deploying a web application typically involves transferring files to a web server, configuring the server, and ensuring the application runs correctly in the new environment.',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxduda00071451dm53txgk'
    },
    {
      id: 'clwrxo5ek001014514b9be5hx',
      question: 'What is the process of deploying a Node.js application?',
      expected_answer: 'Deploying a Node.js application involves installing Node.js on the server, transferring application files, installing dependencies with npm, and starting the application using a process manager like PM2.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxduda00071451dm53txgk'
    },
    {
      id: 'clwrxpaep00111451s50hkvhq',
      question: 'What is a RESTful API, and how do you design one?',
      expected_answer: 'A RESTful API uses HTTP requests to perform CRUD operations on resources, adhering to principles like statelessness and resource representation.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxduda00081451tk7xzx3p'
    },
    {
      id: 'clwrxpaeq00121451mgo3ygqs',
      question: 'How do you implement CRUD operations in a RESTful API?',
      expected_answer: 'CRUD operations in a RESTful API are implemented using HTTP methods: POST for create, GET for read, PUT/PATCH for update, and DELETE for delete.',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxduda00081451tk7xzx3p'
    },
    {
      id: 'clwrxpaeq00131451hnl35igo',
      question: 'What is GraphQL, and how is it different from REST?',
      expected_answer: 'GraphQL is a query language for APIs that allows clients to request exactly the data they need, reducing the number of API calls compared to REST.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxduda00081451tk7xzx3p'
    },
    {
      id: 'clwrxq9jj00141451xv6o1ex7',
      question: 'What are the different types of testing for web applications?',
      expected_answer: 'Different types of testing include unit testing, integration testing, end-to-end testing, and performance testing.',
      order: 1,
      difficulty: null,
      categoryId: 'clwrxduda00091451i16dnpsm'
    },
    {
      id: 'clwrxq9jj00151451g3ltd7ru',
      question: 'How do you write unit tests for a React application?',
      expected_answer: 'Unit tests for a React application can be written using testing libraries like Jest and React Testing Library.',
      order: 2,
      difficulty: null,
      categoryId: 'clwrxduda00091451i16dnpsm'
    },
    {
      id: 'clwrxq9jj00161451v96rsfl2',
      question: 'How do you test an API endpoint?',
      expected_answer: 'API endpoints can be tested using tools like Postman or automated tests written with libraries like Mocha or Jest.',
      order: 3,
      difficulty: null,
      categoryId: 'clwrxduda00091451i16dnpsm'
    }
  ]


const answers = [
  {
    id: 'clwry7uq40001wekeriw0ec71',
    answer: 'Javascript is a programming language and it in web development it is used to add functionality to the website',
    correct: true,
    rating: 90,
    review: "The user's answer correctly identifies JavaScript as a programming language and mentions its use in adding functionality to websites.",
    questionId: 'clwrxh67c000g1451py2xtfdm',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsa7bge0003r2zo6zodmdo7',
    answer: "CSS stands for Cascading Style Sheets, and it makes your website look good. You can put CSS in the same file as HTML using the <style> tag, but I think it's better to use an external file and link it with <link>.",
    correct: false,
    rating: 0,
    review: "The user's answer did not address the question of how to create a responsive web design. Instead, it provided a general description of CSS and how it can be added to HTML.",
    questionId: 'clwrxg3fe000e1451nl6q6sc5',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsa8dma0007r2zoif6udqqx',
    answer: 'You declare variables using var, let, or const. For example, var x = 5;, let name = "Alice";, and const pi = 3.14;.',
    correct: true,
    rating: 100,
    review: 'The user correctly explained that variables in JavaScript can be declared using `var`, `let`, or `const`. They also provided appropriate examples for each type of declaration.',
    questionId: 'clwrxh67d000h1451glb0jfe5',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsa8nrw0009r2zoqam26kmr',
    answer: "Promises are used to handle asynchronous operations. You create a promise with new Promise, and then you use .then() to handle the result. I haven't used them much, though.",
    correct: true,
    rating: 80,
    review: 'The user correctly identifies that JavaScript promises are used for handling asynchronous operations and mentions the use of `new Promise` to create a promise and `.then()` to handle the result. However, they did not provide as much detail as possible.',
    questionId: 'clwrxh67i000i1451dgeqwryl',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsa8zky000br2zo4klirocw',
    answer: 'React is a library for building user interfaces. A simple component can be created using a function. For example, function MyComponent() { return <h1>Hello, world!</h1>; }.',
    correct: true,
    rating: 100,
    review: 'The user correctly identified React as a library for building user interfaces and provided a correct example of a simple React component using a function.',
    questionId: 'clwrxii9z000j1451dvjyxjvv',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsa979u000dr2zo2b3106gq',
    answer: "Vue.js is a framework for building user interfaces. To create a component, you use Vue.component('my-component', { template: '<p>Hello, Vue!</p>' });.",
    correct: true,
    rating: 100,
    review: "The user's answer correctly identifies Vue.js as a framework for building user interfaces and provides a valid example of creating a basic Vue component using Vue.component().",
    questionId: 'clwrxiia0000k14511gusdaxw',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsa9fqw000fr2zokx3caobx',
    answer: 'Angular is a platform for building web applications. You set up a project using Angular CLI with the command ng new project-name.',
    correct: true,
    rating: 100,
    review: "The user's answer is correct. Angular is indeed a platform for building web applications, and setting up a project can be done using the Angular CLI with the command 'ng new project-name'.",
    questionId: 'clwrxiia2000l1451vgai3g3k',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaa8g2000hr2zofsdw9ttb',
    answer: "Node.js is a JavaScript runtime for building server-side applications. It's used to create scalable server-side applications. I think it's built on Chrome's V8 engine.",
    correct: true,
    rating: 95,
    review: "The user's answer correctly identifies Node.js as a JavaScript runtime for building server-side applications and notes its use in creating scalable server-side applications. Additionally, the user correctly mentions that Node.js is built on Chrome's V8 engine.",
    questionId: 'clwrxjndv000m1451kj81y5hc',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaagfh000jr2zokbohtz06',
    answer: "You use the http module in Node.js. Something like this: const http = require('http'); const server = http.createServer((req, res) => { res.end('Hello, World!'); }); server.listen(3000);.",
    correct: true,
    rating: 100,
    review: 'The user correctly explained how to create a simple HTTP server using the http module in Node.js and provided an accurate code snippet.',
    questionId: 'clwrxjndv000n1451vrmcjxlu',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaalrd000lr2zov1yatw5y',
    answer: "Express.js is a framework for Node.js to build web applications. To create an app, you do const express = require('express'); const app = express(); app.get('/', (req, res) => { res.send('Hello, World!'); }); app.listen(3000);.",
    correct: true,
    rating: 100,
    review: "The user's answer is correct. Express.js is indeed a framework for Node.js used to build web applications. The provided code snippet accurately demonstrates how to create a basic Express application that listens on port 3000 and responds with 'Hello, World!' when the root URL is accessed.",
    questionId: 'clwrxjndw000o1451c0837zmj',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaaur2000nr2zofz124t3k',
    answer: 'SQL stands for Structured Query Language, used for managing data in relational databases. CRUD operations are Create, Read, Update, Delete. For example, INSERT INTO table_name VALUES (...), SELECT * FROM table_name, UPDATE table_name SET column = value WHERE condition, DELETE FROM table_name WHERE condition.',
    correct: true,
    rating: 100,
    review: "The user's answer correctly defines SQL and outlines the basic CRUD operations with respective SQL commands for each operation: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE).",
    questionId: 'clwrxkq8n000p145199eewnrc',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsab23r000pr2zoa78h07xy',
    answer: "NoSQL databases store data in formats like documents, key-value pairs, or graphs. They are different from SQL databases because they don't use tables and SQL queries. MongoDB is a popular NoSQL database.",
    correct: true,
    rating: 95,
    review: "The user's answer correctly identifies that NoSQL databases store data in formats like documents, key-value pairs, or graphs. It also correctly states that NoSQL databases do not use tables and SQL queries, which are characteristic of SQL databases. Additionally, mentioning MongoDB as a popular NoSQL database is accurate and relevant.",
    questionId: 'clwrxkq8n000q1451zoscnit2',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsab7y7000rr2zophrce6pv',
    answer: 'In MongoDB, you use methods like db.collection.insertOne(), db.collection.find(), db.collection.updateOne(), and db.collection.deleteOne() to perform CRUD operations.',
    correct: true,
    rating: 95,
    review: "The user's answer correctly identifies the methods used for Create (insertOne), Read (find), Update (updateOne), and Delete (deleteOne) operations in MongoDB.",
    questionId: 'clwrxkq8n000r1451oe2u87dr',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsacd8h000vr2zos4rw80ap',
    answer: "Authentication is verifying a user's identity, typically using usernames and passwords. You can implement it using sessions or JWT tokens.",
    correct: true,
    rating: 90,
    review: "The user's answer correctly identifies the purpose of authentication as verifying a user's identity and mentions common methods to implement it (sessions and JWT tokens). The provided answer is concise and covers the basics of authentication in web applications.",
    questionId: 'clwrxlmz6000s1451fzav640h',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsacl3c000xr2zokm6rchmm',
    answer: 'Common vulnerabilities include SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).',
    correct: true,
    rating: 100,
    review: "The user's answer correctly identified common web security vulnerabilities such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).",
    questionId: 'clwrxlmz7000t14518546g5b5',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsacpx8000zr2zoa9xze857',
    answer: 'To prevent SQL injection, you should use prepared statements and parameterized queries, and validate user input.',
    correct: true,
    rating: 100,
    review: 'The user mentioned the key techniques for preventing SQL injection attacks, which include using prepared statements and parameterized queries, as well as validating user input.',
    questionId: 'clwrxlmz7000u14510ad2j32c',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsadvjx0011r2zocwoxobli',
    answer: 'Version control is a system to track changes in code. Git is a tool for version control, where you can create branches, commit changes, and merge them.',
    correct: true,
    rating: 90,
    review: "The user's answer correctly identifies that version control is a system to track changes in code and explains that Git is a tool used for this purpose. They also mention creating branches, committing changes, and merging them, which are fundamental aspects of using Git.",
    questionId: 'clwrxmwde000v1451awehvmpv',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsae5e30013r2zosdwo39jh',
    answer: "CI/CD is a practice to automate the building, testing, and deploying of applications. It's important because it helps catch errors early and makes the deployment process faster and more reliable.",
    correct: true,
    rating: 100,
    review: 'The user correctly explained that CI/CD involves the automation of building, testing, and deploying applications. They also accurately identified the importance of CI/CD in catching errors early and making the deployment process faster and more reliable.',
    questionId: 'clwrxmwde000w1451ym9ez1n1',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaefay0015r2zos1tcs9v2',
    answer: 'You can set up a CI/CD pipeline using tools like Jenkins, Travis CI, or GitHub Actions. You define the steps to build, test, and deploy your code in configuration files.',
    correct: true,
    rating: 90,
    review: "The user's answer correctly mentions the use of tools like Jenkins, Travis CI, and GitHub Actions to set up a CI/CD pipeline. They also mention defining steps to build, test, and deploy the code, which aligns well with the expected answer.",
    questionId: 'clwrxmwde000x1451uyqrmby4',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaesp70017r2zo1z0dyki8',
    answer: 'Web hosting is a service that makes your website accessible on the internet. Common types include shared hosting, VPS hosting, and dedicated hosting.',
    correct: true,
    rating: 95,
    review: "The user's answer correctly identifies web hosting as a service that makes websites accessible on the internet and accurately lists common types of web hosting services such as shared hosting, VPS hosting, and dedicated hosting.",
    questionId: 'clwrxo5ej000y1451w3pslode',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaf0s80019r2zouijmr0um',
    answer: 'To deploy a web application, you upload your files to a web server, configure the server, and ensure the application runs correctly. You might use FTP or a platform like Heroku or AWS.',
    correct: false,
    rating: 60,
    review: "The user's answer is too generic and does not describe the full expected process of deploying a web application to a hosting service. It lacks details such as setting up domain names, configuring environment variables, setting up a database, and ensuring security measures.",
    questionId: 'clwrxo5ek000z1451tpve27rf',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaf5uv001br2zoj1i3ltj9',
    answer: 'Deploying a Node.js application involves installing Node.js on the server, transferring your files, installing dependencies with npm install, and starting the app with a process manager like PM2.',
    correct: false,
    rating: 50,
    review: "The user has provided an answer, but the expected answer is missing. Without knowing the expected answer, it's difficult to evaluate how closely the given answer aligns with it.",
    questionId: 'clwrxo5ek001014514b9be5hx',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsafjm8001dr2zo8tdawh2s',
    answer: 'A RESTful API uses HTTP requests to perform CRUD operations on resources. You design it by defining endpoints for each resource, using HTTP methods like GET, POST, PUT, DELETE.',
    correct: true,
    rating: 90,
    review: "The user's answer correctly identifies that a RESTful API uses HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on resources. It also correctly states that designing a RESTful API involves defining endpoints for each resource and using HTTP methods such as GET, POST, PUT, and DELETE.",
    questionId: 'clwrxpaep00111451s50hkvhq',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsafouy001fr2zocuprx6fc',
    answer: 'You use HTTP methods: GET for reading data, POST for creating data, PUT/PATCH for updating data, and DELETE for deleting data.',
    correct: true,
    rating: 100,
    review: "The user's answer accurately mentions the correct HTTP methods corresponding to each CRUD operation for a RESTful API.",
    questionId: 'clwrxpaeq00121451mgo3ygqs',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaful5001hr2zolnp6xkg3',
    answer: 'GraphQL is a query language for APIs that lets clients request exactly the data they need. Unlike REST, which requires multiple endpoints, GraphQL typically uses a single endpoint.',
    correct: true,
    rating: 90,
    review: "The user's answer correctly describes GraphQL as a query language for APIs that allows clients to request specific data. It also correctly contrasts GraphQL with REST by noting that REST often requires multiple endpoints, while GraphQL usually utilizes a single endpoint.",
    questionId: 'clwrxpaeq00131451hnl35igo',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsag3nt001jr2zo81qlrcgu',
    answer: 'Types of testing include unit testing, integration testing, end-to-end testing, and performance testing.',
    correct: true,
    rating: 100,
    review: "The user's answer correctly mentions different types of testing such as unit testing, integration testing, end-to-end testing, and performance testing, which are all valid types of testing for web applications.",
    questionId: 'clwrxq9jj00141451xv6o1ex7',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsagax8001lr2zoc0046cnt',
    answer: "You write unit tests for React components using libraries like Jest and React Testing Library. You test the component's output and interactions.",
    correct: false,
    rating: 60,
    review: "The user's answer, although mentioning Jest and React Testing Library which are commonly used tools, is overly broad. It lacks detailed steps or instructions on how to set up and write the unit tests. For a complete answer, one would expect an explanation of writing test cases, rendering components, simulating events, and assertions.",
    questionId: 'clwrxq9jj00151451g3ltd7ru',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsaglct001nr2zofk3wdlzw',
    answer: 'You can test API endpoints using tools like Postman to send requests and check responses. Automated tests can be written using libraries like Mocha or Jest.',
    correct: true,
    rating: 100,
    review: "The user's answer is correct. They mentioned using tools like Postman to send requests and check responses, which is a common manual testing approach. Additionally, they mentioned writing automated tests using libraries like Mocha or Jest, which is also an appropriate and common method for testing API endpoints.",
    questionId: 'clwrxq9jj00161451v96rsfl2',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsymjy90001n8qvn6fikk5g',
    answer: 'HTML stands for HyperText Markup Language. A basic HTML document starts with <!DOCTYPE html>, and then it has <html>, <head>, and <body> tags. Inside the <body> tag, you put your content like headings and paragraphs.',
    correct: false,
    rating: 0,
    review: "The user's answer does not address the question about CSS (Cascading Style Sheets) and how to apply it to an HTML document. Instead, the user provided an explanation of HTML (HyperText Markup Language) and the basic structure of an HTML document.",
    questionId: 'clwrxg3fe000d1451ea0kpljc',
    userId: 'clwrxrnf10000116pakduatio'
  },
  {
    id: 'clwsyt9c5000bn8qvlrizbygq',
    answer: 'Responsive design means the website works on all devices. You can use media queries to change the style based on the screen size, like @media (max-width: 600px) { ... }.',
    correct: false,
    rating: 0,
    review: "The user's answer does not address the question asked. The question is about HTML and the structure of a basic HTML document, while the user's answer covers responsive design and media queries, which are related to CSS. Therefore, the user's answer is incorrect.",
    questionId: 'clwrxg3fe000f14518g5qyyxg',
    userId: 'clwrxrnf10000116pakduatio'
  }
]


module.exports = {
  users,
  categories,
  questions,
  answers
}