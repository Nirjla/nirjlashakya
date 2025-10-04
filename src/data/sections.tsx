import supabase from "../utils/supabase";
const getAboutMe = async () => {
  const { data, error } = await supabase.from("about").select("*");
  if (error) {
    console.error(error);
  }
  return data;
};

const getExperience = async () => {
  const { data, error } = await supabase.from("experience").select("*").order("join_date", { ascending: false });
  if (error) {
    console.error(error);
  }
  return data;
};

const getSkills = async () => {
  const { data, error } = await supabase.from("skills").select("*");
  if (error) {
    console.error(error);
  }
  return data;
};

const getEducation = async () => {
  const { data, error } = await supabase.from("education").select("*");
  if (error) {
    console.error(error);
  }
  return data;
};
const displayMonth = (date: string) => {
  switch (date) {
    case "01":
      return "Jan";
    case "02":
      return "Feb";
    case "03":
      return "Mar";
    case "04":
      return "Apr";
    case "05":
      return "May";
    case "06":
      return "Jun";
    case "07":
      return "Jul";
    case "08":
      return "Aug";
    case "09":
      return "Sep";
    case "10":
      return "Oct";
    case "11":
      return "Nov";
    case "12":
      return "Dec";
    default:
      return "";
  }
}

const extractYear = (date: string, requireMonth: boolean = false) => {
  if (date) {
    return requireMonth ? displayMonth(date.split("-")[1]) + " " + date.split("-")[0] : date.split("-")[0];
  }
  return "Present";
}
export const sections: Record<string, () => Promise<JSX.Element>> = {
  about: async () => {
    const data = await getAboutMe();
    return (
      <div className="py-2">
        <h2 className="text-lg font-bold text-primary-foreground mb-2">About Me</h2>
        <p className="mb-2">
          {data?.[0]?.tagline}
        </p>
        <p className="mb-2">
          {data?.[0]?.description}
        </p>
      </div>
    )
  },

  experience: async () => {
    const data = await getExperience();
    return (
      <div className="py-2">
        <h2 className="text-lg font-bold text-primary-foreground mb-3">Work Experience</h2>

        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-accent">{data?.[0]?.position}</h3>
            <span className="text-muted-foreground text-sm">{extractYear(data?.[0]?.join_date, true)} - {extractYear(data?.[0]?.end_date, true) || "Present"}</span>
          </div>
          <p className="text-primary-foreground">{data?.[0]?.company_name}</p>
          <ul className="list-disc ml-5 mt-2 text-muted-foreground">
            {data?.[0]?.content_lists?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-accent">{data?.[1]?.position}</h3>
            <span className="text-muted-foreground text-sm">{extractYear(data?.[1]?.join_date, true)} - {extractYear(data?.[1]?.end_date, true) || "Present"}</span>
          </div>
          <p className="text-primary-foreground">{data?.[1]?.company_name}</p>
          <ul className="list-disc ml-5 mt-2 text-muted-foreground">
            {data?.[1]?.content_lists?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-accent">{data?.[2]?.position}</h3>
            <span className="text-muted-foreground text-sm">{extractYear(data?.[2]?.join_date, true)} - {extractYear(data?.[2]?.end_date, true) || "Present"}</span>
          </div>
          <p className="text-primary-foreground">{data?.[2]?.company_name}</p>
          <ul className="list-disc ml-5 mt-2 text-muted-foreground">
            {data?.[2]?.content_lists?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  },

  skills: async () => {
    const data = await getSkills();
    return (
      <div className="py-2">
        <h2 className="text-lg font-bold text-primary-foreground mb-3">Technical Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-accent mb-2">Languages</h3>
            <ul className="list-disc ml-5 text-muted-foreground">
              {data?.[0]?.languages?.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-accent mb-2">Frameworks</h3>
            <ul className="list-disc ml-5 text-muted-foreground">
              {data?.[0]?.frameworks?.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-2">Databases</h3>
            <ul className="list-disc ml-5 text-muted-foreground">
              {data?.[0]?.databases?.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-2">DevOps Tools</h3>
            <ul className="list-disc ml-5 text-muted-foreground">
              {data?.[0]?.devops_tools?.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-2">Others</h3>
            <ul className="list-disc ml-5 text-muted-foreground">
              {data?.[0]?.others?.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
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
    )
  },

  education: async () => {
    const data = await getEducation();
    return (
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
            <h3 className="font-bold text-accent">{data?.[0]?.degree}</h3>
            <span className="text-muted-foreground text-sm">{extractYear(data?.[0]?.join_date)} - {extractYear(data?.[0]?.end_date) || "Present"}</span>
          </div>
          <div className="flex justify-between items-start mt-1">
            <p className="text-primary-foreground">{data?.[0]?.university}</p>
            <p className="text-muted-foreground text-sm">{data?.[0]?.college}</p>
          </div>
          <p className="text-muted-foreground mt-1">
            {data?.[0]?.course_details.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
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
    )
  },
}

