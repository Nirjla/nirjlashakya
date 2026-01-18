import supabase from "../utils/supabase";
import { Github, Linkedin, Mail, Globe, ExternalLink } from "lucide-react";
import type React from "react";

// ============ Data Fetching Functions ============

const getAboutMe = async () => {
  const { data, error } = await supabase.from("about").select("*");
  if (error) {
    console.error("error in about", error);
  }
  return data;
};

const getExperience = async () => {
  const { data, error } = await supabase.from("experience").select("*").order("join_date", { ascending: false });
  if (error) {
    console.error("error in experience", error);
  }
  return data;
};

const getSkills = async () => {
  const { data, error } = await supabase.from("skills").select("*");
  if (error) {
    console.error("error in skills", error);
  }
  return data;
};

const getEducation = async () => {
  const { data, error } = await supabase.from("education").select("*");
  if (error) {
    console.error("error in education", error);
  }
  return data;
};

const getLeadership = async () => {
  const { data, error } = await supabase.from("college_involvement").select("*");
  if (error) {
    console.error("error in college involvement", error);
  }
  return data;
};

// ============ Utility Functions ============

const displayMonth = (date: string) => {
  const months: Record<string, string> = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
  };
  return months[date] || "";
};

const extractYear = (date: string, requireMonth: boolean = false) => {
  if (date) {
    return requireMonth
      ? displayMonth(date.split("-")[1]) + " " + date.split("-")[0]
      : date.split("-")[0];
  }
  return "Present";
};

// ============ Section Renderers ============

export const sections: Record<string, () => Promise<React.ReactNode>> = {
  about: async () => {
    const data = await getAboutMe();
    return (
      <div className="py-2 fade-in">
        <h2 className="text-lg font-bold text-accent mb-3 flex items-center gap-2">
          <span className="text-glow-subtle"></span> About Me
        </h2>
        <div className="pl-4 border-l-2 border-accent/30">
          <p className="mb-3 text-primary-foreground leading-relaxed">
            {data?.[0]?.tagline}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {data?.[0]?.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className="skill-badge">Available for hire</span>
          <span className="skill-badge">Open to opportunities</span>
          <span className="skill-badge">Remote-friendly</span>
        </div>
      </div>
    );
  },

  experience: async () => {
    const data = await getExperience();
    return (
      <div className="py-2 fade-in">
        <h2 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
          <span className="text-glow-subtle"></span> Work Experience
        </h2>

        <div className="space-y-6">
          {data?.map((exp, index) => (
            <div
              key={exp.id || index}
              className="relative pl-6 border-l-2 border-border hover:border-accent/50 transition-colors stagger-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-terminal-background border-2 border-accent"></div>

              <div className="mb-1">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <h3 className="font-bold text-primary-foreground">{exp.position}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-secondary text-accent border border-border">
                    {extractYear(exp.join_date, true)} - {extractYear(exp.end_date, true) || "Present"}
                  </span>
                </div>
                <p className="text-accent text-sm mt-1">{exp.company_name}</p>
              </div>

              <ul className="mt-3 space-y-2">
                {exp.content_lists?.map((item: string, idx: number) => (
                  <li key={idx} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="text-accent mt-1">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  },

  skills: async () => {
    const data = await getSkills();

    const skillCategories = [
      { key: "languages", title: "Languages" },
      { key: "frameworks", title: "Frameworks & Libraries" },
      { key: "databases", title: "Databases" },
      { key: "devops_tools", title: "DevOps & Tools" },
      { key: "others", title: "Other Skills" },
    ];

    return (
      <div className="py-2 fade-in">
        <h2 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
          <span className="text-glow-subtle"></span> Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => {
            const skills = data?.[0]?.[category.key];
            if (!skills || skills.length === 0) return null;

            return (
              <div
                key={category.key}
                className="stagger-item"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <h3 className="font-semibold text-primary-foreground mb-3 flex items-center gap-2">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, idx: number) => (
                    <span key={idx} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },

  education: async () => {
    const data = await getEducation();
    return (
      <div className="py-2 fade-in">
        <h2 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
          <span className="text-glow-subtle"></span> Education
        </h2>

        {data?.map((edu, index) => (
          <div
            key={edu.id || index}
            className="project-card stagger-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
              <h3 className="font-bold text-primary-foreground">{edu.degree}</h3>
              <span className="text-xs px-2 py-1 rounded bg-secondary text-accent border border-border">
                {extractYear(edu.join_date)} - {extractYear(edu.end_date) || "Present"}
              </span>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
              <p className="text-accent">{edu.university}</p>
              <p className="text-muted-foreground text-sm">{edu.college}</p>
            </div>

            {edu.course_details && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Coursework</p>
                <ul className="space-y-1">
                  {edu.course_details.map((item: string, idx: number) => (
                    <li key={idx} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-accent">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  },

  projects: async () => {
    // Sample projects - you can later move this to Supabase
    const projects = [
      {
        name: "Terminal Portfolio",
        description: "Interactive terminal-style portfolio website built with React and TypeScript",
        tech: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
        github: "https://github.com/nirjla/nirjlashakya",
        live: "https://nirjalashakya.com.np",
        // stars: 5,
        // forks: 2
      },
      {
        name: "Node.js Repo Insights",
        description: "A tool to get insights about a node.js repository",
        tech: ["Node.js", "Express", "Flask", "Tailwind CSS", "PostgreSQL", "Typescript", "Python", "ML"],
        github: "https://github.com/nirjla/repo-insights",
        // live: "https://nodejs-repo-insights.vercel.app/",
        // stars: 5,
        // forks: 2
      }
    ];

    return (
      <div className="py-2 fade-in">
        <h2 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
          <span className="text-glow-subtle"></span> Projects
        </h2>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card stagger-item relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* {project.featured && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                  Featured
                </span>
              )} */}

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-primary-foreground flex items-center gap-2">
                    {project.name}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                </div>

                {/* <div className="flex items-center gap-3 text-muted-foreground text-sm"> */}
                {/* {project.stars !== undefined && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {project.stars}
                    </span>
                  )}
                  {project.forks !== undefined && (
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {project.forks}
                    </span>
                  )} */}
                {/* </div> */}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="skill-badge text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://github.com/nirjla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border hover:border-accent hover:text-accent transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    );
  },
  leadership: async () => {
    const data = await getLeadership();
    return (
      <div className="py-2 fade-in">
        <h2 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
          <span className="text-glow-subtle"></span> Leadership & Involvement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.map((leadership, index) => (
            <div
              key={leadership.id || index}
              className="project-card stagger-item"
              style={{ animationDelay: `${0 * 0.1}s` }}
            >
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <h3 className="font-bold text-primary-foreground">{leadership.title}</h3>
                <span className="text-xs px-2 py-1 rounded bg-secondary text-accent border border-border">
                  {extractYear(leadership.join_date)} - {extractYear(leadership.end_date) || "Present"}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">{leadership.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
  contact: async () => {
    const socials = [
      {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/nirjla",
        handle: "@nirjla",
        color: "hover:text-white"
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://linkedin.com/in/nirjlashakya",
        handle: "nirjlashakya",
        color: "hover:text-blue-400"
      },
      {
        name: "Email",
        icon: Mail,
        url: "mailto:shakyanirjala6@gmail.com",
        handle: "shakyanirjala6@gmail.com",
        color: "hover:text-red-400"
      },
      {
        name: "Website",
        icon: Globe,
        url: "https://nirjalashakya.com.np",
        handle: "nirjalashakya.com.np",
        color: "hover:text-accent"
      }
    ];

    return (
      <div className="py-2 fade-in">
        <h2 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
          <span className="text-glow-subtle"></span> Get in Touch
        </h2>

        <p className="text-muted-foreground mb-6">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card flex items-center gap-4 stagger-item ${social.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 rounded-lg bg-secondary">
                <social.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">{social.name}</p>
                <p className="text-sm text-muted-foreground">{social.handle}</p>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
            </a>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-accent/10 border border-accent/30">
          <p className="text-center text-accent">
            Pro tip: Run <code className="px-2 py-0.5 bg-secondary rounded">sudo hire me</code> for a surprise!
          </p>
        </div>
      </div>
    );
  },
};
