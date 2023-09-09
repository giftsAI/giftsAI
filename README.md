<p align="center">
  <h1 align="center"><b>Gifts AI</b></h1>
</p>
<h2 align="center">
  AI assistance software for recommending gifts. 
</h2>
  
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#installation--getting-started">Installation / Getting Started</a></li>
    <li><a href="#functionality">Functionality / Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#meet-our-team">Meet our Team</a></li>
  </ol>
</details>

## <b>Overview</b>

<p align="left">
Gifts AI is an AI-powered web application that provides users with gift recommendations based on: one's relationship to the recipient, the recipient's interest(s), the occasion and the user's desired budget. Therefore, each of the recommendations provided will be tailored to meet each user's gift-giving needs!
</p>

## <b>Installation / Getting Started</b>

Perform the following steps to install Gifts AI locally:

1. Clone this Gifts AI repository onto your local machine.
2. Open Gifts AI repo in VS Code or your favorite IDE.
3. Run the following command in the terminal. This will npm install node modules in the root, client, and server folders:

```
npm install && cd client && npm install && cd ../server && npm install
```

4. While in the server directory, create a new `.env` file and add your OpenAI API Key, PostgreSQL database URI and a JWT Secret (can be any string, to be used to sign JWTs) to the `.env` file like the example below:

```
OPENAI_API_KEY={YOUR_OPENAI_API_KEY}
PG_URI={YOUR_POSTGRESQL_URI}
JWT_SECRET={YOUR_JWT_SECRET_KEY}
```

5. Run `npm run dev` in both server and client directories to start the backend server and frontend.
6. Visit `http://localhost:3000/` in your browser to start getting gift ideas!

## <b>Functionality / Features</b>

### Main Page

Users can enter preliminary details such as who the gift is for, the occasion, the recipient's interests, and their budget. This will help our AI provide the most suitable gift recommendations for the user.
<br />
<br />
<img width="1569" alt="image" src="https://github.com/giftsAI/giftsAI/assets/28611254/047e5178-1696-4fb6-b926-8971d5cc375c">
<br />
<br />

### Gift Recommendations

Gifts AI will provide gift recommendations utilizing ChatGPT along with our specifically defined prompting to receive succinct responses. DALL•E 2 is also integrated to provide AI-generated images to visually display what the gift recommendations look like.
<br />
<br />
<img width="1593" alt="image" src="https://github.com/giftsAI/giftsAI/assets/28611254/71a0642c-a8b9-4e6f-aac8-e8298ffee0ec">
<br />
<br />

### Saved Lists

Users will also be able to view the past gift recommendations they saved for recipients by searching the recipient's name. Saved lists include recipient name, relationship, interest, budget, gift, and occasion date.
<br />
<br />
<img width="1617" alt="image" src="https://github.com/giftsAI/giftsAI/assets/28611254/00286259-b164-41f7-803a-dab5cb478fb0">
<br />
<br />

## <b>Tech Stack</b>

<div align="center">
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/>
	<img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" title="Jest"/>
</div>

## <b>Contributing</b>

As part of the open-source community, we'd like to welcome those who'd like to contribute to this product. We released Gifts AI in hopes of helping developers efficiently onboard new codebases. If you found this project useful, feel free to give it a star to help increase the visibility of this product. If you find any issues with this product, please report them with the 'Issues' tab or submit a PR.

Thank you!

  <p align="left">
      <a href="https://github.com/giftsAI/giftsAI/issues">Report Bug / Request Feature</a>
  </p>

## <b>Meet Our Team</b>

- David An • [LinkedIn](https://www.linkedin.com/in/david-h-an/) • [Github](https://github.com/davidan1989)
- Ted Chu • [LinkedIn](https://www.linkedin.com/in/tedcchu/) • [Github](https://github.com/tcchu)
- Yeong Sil Yoon • [LinkedIn](https://www.linkedin.com/in/yeong-sil-yoon/) • [Github](https://github.com/wendyys96)
- Yi Sun  • [LinkedIn](https://www.linkedin.com/in/yi-sun-swe/) • [Github](https://github.com/YiSun88)
