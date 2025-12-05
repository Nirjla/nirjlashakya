 CREATE POLICY "Public select" ON public.about FOR SELECT TO PUBLIC USING (true);
  CREATE POLICY "Public select" ON public.experience FOR SELECT TO PUBLIC USING (true);
   CREATE POLICY "Public select" ON public.skills FOR SELECT TO PUBLIC USING (true);



   -- create table if not exists health_logs (
--   id serial primary key,
--   checked_at timestamptz default now()
-- );

-- create or replace function public.health_check()
-- returns void
-- language plpgsql
-- as $$
-- begin
--   insert into health_logs default values;
-- end;
-- $$;

-- select
--   cron.schedule(
--     'supabase_health_check',
--     '0 8 * * 1,4',   -- run at 08:00 UTC on Monday & Thursday
--     $$ select public.health_check(); $$
--   );

select * from cron.job;


-- insert into skills (
--   id,
--   languages,
--   frameworks,
--   databases,
--   devops_tools,
--   others
-- )
-- values (
--   1,
--   '{"JavaScript","TypeScript","PHP"}',
--   '{"Express.js","React.js","Redux","Shadcn","TailwindCSS","Langchain"}',
--   '{"MySQL","MongoDB","PostgreSQL","Weaviate"}',
--   '{"Git","GitHub","GitLab","Jenkins","Portainer","Github Actions"}',
--   '{"Linux","Docker","REST API","OpenAI","Socket.io","CPanel"}'
-- );

-- insert into experience (company_name, position, content_lists, join_date, end_date)
-- values 
-- (
--   'Amnil Technologies Pvt. Ltd.',
--   'Associate Software Engineer',
--   '{"Contributed significantly to the development of a RAG-based Generative AI application, using OpenAI, Weaviate, and Jina AI APIs for real-time search queries.",
--     "Integrated OpenAI APIs for text-to-speech (TTS) and speech-to-text (STT) functionalities, enhancing user interactions.",
--     "Customized Botpress to design and implement chatbots tailored to client requirements, improving engagement."}',
--   '2024-12-01',
--   null
-- ),
-- (
--   'Amnil Technologies Pvt. Ltd.',
--   'Node.js Intern',
--   '{"Implemented Role-Based Access Control (RBAC) for secure user access and integrated OAuth.",
--     "Integrated payment gateway and applied rate-limiting for optimized security and performance.",
--     "Developed a real-time chat application using Socket.io, created DTOs for data handling, and built an interactive UI with React and custom hooks.",
--     "Utilized Microsoft Clarity and Google Analytics to optimize the application based on user behavior insights."}',
--   '2024-09-01',
--   '2024-11-30'
-- ),
-- (
--   'Infinity Infosys Pvt. Ltd.',
--   'Frontend Developer Intern',
--   '{"Built user interfaces using React JSX and implemented animations and transitions with Framer Motion.",
--     "Styled React components using Styled Components and Bootstrap to ensure responsive, mobile-first designs.",
--     "Integrated dynamic API data fetching to improve user interaction."}',
--   '2023-10-01',
--   '2024-03-31'
-- );


insert into education (degree, college, university, join_date, end_date, course_details)
values (
  'Bachelors in Computer Applications',
  'Prime College',
  'Tribhuvan University',
  '2022-01-01',
  null,
  '{"Relevant Coursework: Web Development Fundamentals",
    "Database Management Systems",
    "Programming Languages"}'
);
p

password for databe in supabase z@l@@Sha