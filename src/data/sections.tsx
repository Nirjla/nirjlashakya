export const sections: Record<string, JSX.Element> = {
  about: (
    <div className="py-2">
      <h2 className="text-lg font-bold text-primary-foreground mb-2">About Me</h2>
      <p className="mb-2">
        Hi, I’m Nirjala/Nirjla, a human with a passion for learning and growth.
      </p>
      <p className="mb-2">
        As a inspiring full-stack developer with in the interest in AI,I’m all about writing clean, innovative solutions.
      </p>
      <p>
        When I’m not deep in code, you’ll probably find me on YouTube, diving into trending topics or dissecting interesting theories and real-world cases. It’s all part of my drive to stay curious, expand my knowledge, and apply fresh insights to my work.
      </p>
    </div>
  ),

  experience: (
    <div className="py-2">
      <h2 className="text-lg font-bold text-primary-foreground mb-3">Work Experience</h2>

      <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-accent">Associate Frontend Developer</h3>
          <span className="text-muted-foreground text-sm">Oct 2023 - Mar 2024</span>
        </div>
        <p className="text-primary-foreground">Infinity Infosys Pvt. Ltd.</p>
        <ul className="list-disc ml-5 mt-2 text-muted-foreground">
          <li>Built and maintained client websites using React, Tailwind CSS, and JavaScript</li>
          <li>Collaborated with designers to implement pixel-perfect UIs</li>
          <li>Worked on a variety of projects, including e-commerce sites and landing pages</li>
        </ul>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-accent">Node.js Intern</h3>
          <span className="text-muted-foreground text-sm">Sep 2024 - Nov 2024</span>
        </div>
        <p className="text-primary-foreground">Amnil Tech Pvt. Ltd.</p>
        <ul className="list-disc ml-5 mt-2 text-muted-foreground">
          <li>Developed and maintained server-side applications using Node.js and Express</li>
          <li>Implemented real-time communication using WebSocket and Socket.io.</li>
          <li>Worked with MongoDB, PostgreSQL, and Redis for data management and caching.</li>
        </ul>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-accent">Associate Software Engineer</h3>
          <span className="text-muted-foreground text-sm">Dec 2024 - Present</span>
        </div>
        <p className="text-primary-foreground">Amnil Tech Pvt. Ltd.</p>
        <ul className="list-disc ml-5 mt-2 text-muted-foreground">
          <li>Contributed to GenAI-based projects.</li>
          <li>Built a chatbot using LLM models and Botpress.</li>
          <li>Performed bug fixes and conducted code reviews to ensure high-quality code.</li>
        </ul>
      </div>
    </div>
  ),

  skills: (
    <div className="py-2">
      <h2 className="text-lg font-bold text-primary-foreground mb-3">Technical Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold text-accent mb-2">Frontend</h3>
          <ul className="list-disc ml-5 text-muted-foreground">
            <li>React</li>
            <li>TypeScript / JavaScript</li>
            <li>HTML5 / CSS3</li>
            <li>Tailwind CSS / Styled Components / Material UI / Bootstrap / Chakra UI </li>
            <li>Redux / Context API / React Query </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-accent mb-2">Backend</h3>
          <ul className="list-disc ml-5 text-muted-foreground">
            <li>Node.js / Express</li>
            <li>RESTful APIs</li>
            <li>MongoDB / PostgreSQL</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-accent mb-2">Backend</h3>
          <ul className="list-disc ml-5 text-muted-foreground">
            <li>AI / LLM / RAG / Embeddings / Vector Databases </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-accent mb-2">Tools & Others</h3>
          <ul className="list-disc ml-5 text-muted-foreground">
            <li>Git / GitHub / GitLab</li>
            <li>Docker</li>
            <li>CI/CD (Jenkins)</li>
          </ul>
        </div>

        {/* <div>
          <h3 className="font-bold text-accent mb-2">Design & UX</h3>
          <ul className="list-disc ml-5 text-muted-foreground">
            <li>Figma / Adobe XD</li>
            <li>Responsive Design</li>
            <li>Accessibility (WCAG)</li>
            <li>UI/UX Principles</li>
            <li>Design Systems</li>
          </ul>
        </div> */}
      </div>
    </div>
  ),

  education: (
    <div className="py-2">
      <h2 className="text-lg font-bold text-primary-foreground mb-3">Education</h2>

      {/* <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-accent">Master of Computer Science</h3>
          <span className="text-muted-foreground text-sm">2014 - 2016</span>
        </div>
        <p className="text-primary-foreground">University of Technology</p>
        <p className="text-muted-foreground mt-1">
          Specialized in Human-Computer Interaction and Software Engineering. Thesis on "Improving User Experience in
          Web Applications through Adaptive Interfaces."
        </p>
      </div> */}

      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-accent">Bachelor of Computer Application</h3>
          <span className="text-muted-foreground text-sm">2022 - 2025</span>
        </div>
        <p className="text-primary-foreground">Tribhuvan University</p>
        <p className="text-muted-foreground mt-1">
          Coursework included Data Structures, Algorithms, Database Systems, and Web Development.
        </p>
      </div>

      {/* <div className="mt-4">
        <h3 className="font-bold text-accent mb-2">Certifications</h3>
        <ul className="list-disc ml-5 text-muted-foreground">
          <li>Advanced React Patterns - Frontend Masters</li>
          <li>TypeScript Professional - Certification Board</li>
          <li>Web Accessibility - A11Y Organization</li>
        </ul>
      </div> */}
    </div>
  ),
}

