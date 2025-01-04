export interface AlumniType {
  name: string;
  batch: string;
  company: string;
  position: string;
  image: string;
  email: string;
  linkedin?: string;
  github?: string;
}

// Initial empty alumni data structure
export const alumniData: AlumniType[] = [
  // 2025 Batch
  {
    name: "Srishant Kumar",
    batch: "2025",
    company: "Microsoft",
    position: "Software Engineer",
    image: "https://i.imgur.com/m03jDZ0.jpeg",
    email: "srishant054@gmail.com",
    linkedin: "https://linkedin.com/in/iamsrishant",
    github: "https://github.com/SrishantKumar"
  },
  {
    "name": "Aryan Reddy",
    "batch": "2025",
    "company": "Oracle",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AryanReddy",
    "email": "aryan.reddy@yahoo.com",
    "linkedin": "https://linkedin.com/in/aryanreddy",
    "github": "https://github.com/AryanReddy"
  },
  {
    "name": "Ananya Verma",
    "batch": "2025",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AnanyaVerma",
    "email": "ananya.verma@gmail.com",
    "linkedin": "https://linkedin.com/in/ananyaverma",
    "github": "https://github.com/AnanyaVerma"
  },
  {
    "name": "Rohan Das",
    "batch": "2025",
    "company": "Microsoft",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=RohanDas",
    "email": "rohan.das@gmail.com",
    "linkedin": "https://linkedin.com/in/rohandas",
    "github": "https://github.com/RohanDas"
  },
  {
    "name": "Vivaan Verma",
    "batch": "2024",
    "company": "Amazon",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=VivaanVerma",
    "email": "vivaan.verma@gmail.com",
    "linkedin": "https://linkedin.com/in/vivaanverma",
    "github": "https://github.com/VivaanVerma"
  },
  {
    "name": "Aditya Mehta",
    "batch": "2024",
    "company": "Facebook",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AdityaMehta",
    "email": "aditya.mehta@yahoo.com",
    "linkedin": "https://linkedin.com/in/adityamehta",
    "github": "https://github.com/AdityaMehta"
  },
  {
    "name": "Meera Nair",
    "batch": "2024",
    "company": "Adobe",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=MeeraNair",
    "email": "meera.nair@yahoo.com",
    "linkedin": "https://linkedin.com/in/meeranair",
    "github": "https://github.com/MeeraNair"
  },
  {
    "name": "Aarav Das",
    "batch": "2023",
    "company": "Adobe",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AaravDas",
    "email": "aarav.das@yahoo.com",
    "linkedin": "https://linkedin.com/in/aaravdas",
    "github": "https://github.com/AaravDas"
  },
  {
    "name": "Aryan Nair",
    "batch": "2023",
    "company": "Google",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AryanNair",
    "email": "aryan.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/aryannair",
    "github": "https://github.com/AryanNair"
  },
  {
    "name": "Kiara Singh",
    "batch": "2023",
    "company": "IBM",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=KiaraSingh",
    "email": "kiara.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/kiarasingh",
    "github": "https://github.com/KiaraSingh"
  },
  {
    "name": "Vihaan Singh",
    "batch": "2022",
    "company": "Facebook",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=VihaanSingh",
    "email": "vihaan.singh@yahoo.com",
    "linkedin": "https://linkedin.com/in/vihaansingh",
    "github": "https://github.com/VihaanSingh"
  },
  {
    "name": "Vihaan Singh",
    "batch": "2022",
    "company": "Oracle",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=VihaanSingh",
    "email": "vihaan.singh@yahoo.com",
    "linkedin": "https://linkedin.com/in/vihaansingh",
    "github": "https://github.com/VihaanSingh"
  },
  {
    "name": "Rohan Gupta",
    "batch": "2022",
    "company": "Google",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=RohanGupta",
    "email": "rohan.gupta@gmail.com",
    "linkedin": "https://linkedin.com/in/rohangupta",
    "github": "https://github.com/RohanGupta"
  },
  {
    "name": "Aarav Sharma",
    "batch": "2021",
    "company": "IBM",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AaravSharma",
    "email": "aarav.sharma@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravsharma",
    "github": "https://github.com/AaravSharma"
  },
  {
    "name": "Aarav Das",
    "batch": "2021",
    "company": "Google",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AaravDas",
    "email": "aarav.das@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravdas",
    "github": "https://github.com/AaravDas"
  },
  {
    "name": "Aryan Gupta",
    "batch": "2021",
    "company": "Microsoft",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AryanGupta",
    "email": "aryan.gupta@gmail.com",
    "linkedin": "https://linkedin.com/in/aryangupta",
    "github": "https://github.com/AryanGupta"
  },
  {
    "name": "Aarav Gupta",
    "batch": "2020",
    "company": "Google",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AaravGupta",
    "email": "aarav.gupta@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravgupta",
    "github": "https://github.com/AaravGupta"
  },
  {
    "name": "Kiara Das",
    "batch": "2020",
    "company": "Microsoft",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=KiaraDas",
    "email": "kiara.das@gmail.com",
    "linkedin": "https://linkedin.com/in/kiaradas",
    "github": "https://github.com/KiaraDas"
  },
  {
    "name": "Kiara Nair",
    "batch": "2020",
    "company": "Microsoft",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=KiaraNair",
    "email": "kiara.nair@yahoo.com",
    "linkedin": "https://linkedin.com/in/kiaranair",
    "github": "https://github.com/KiaraNair"
  },
  {
    "name": "Vivaan Gupta",
    "batch": "2019",
    "company": "Google",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=VivaanGupta",
    "email": "vivaan.gupta@outlook.com",
    "linkedin": "https://linkedin.com/in/vivaangupta",
    "github": "https://github.com/VivaanGupta"
  },
  {
    "name": "Vihaan Reddy",
    "batch": "2019",
    "company": "IBM",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=VihaanReddy",
    "email": "vihaan.reddy@outlook.com",
    "linkedin": "https://linkedin.com/in/vihaanreddy",
    "github": "https://github.com/VihaanReddy"
  },
  {
    "name": "Aarav Sharma",
    "batch": "2019",
    "company": "Oracle",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AaravSharma",
    "email": "aarav.sharma@gmail.com",
    "linkedin": "https://linkedin.com/in/aaravsharma",
    "github": "https://github.com/AaravSharma"
  },
  {
    "name": "Diya Bose",
    "batch": "2018",
    "company": "Microsoft",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=DiyaBose",
    "email": "diya.bose@outlook.com",
    "linkedin": "https://linkedin.com/in/diyabose",
    "github": "https://github.com/DiyaBose"
  },
  {
    "name": "Vivaan Bose",
    "batch": "2018",
    "company": "Oracle",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=VivaanBose",
    "email": "vivaan.bose@gmail.com",
    "linkedin": "https://linkedin.com/in/vivaanbose",
    "github": "https://github.com/VivaanBose"
  },
  {
    "name": "Vihaan Kumar",
    "batch": "2018",
    "company": "Apple",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=VihaanKumar",
    "email": "vihaan.kumar@gmail.com",
    "linkedin": "https://linkedin.com/in/vihaankumar",
    "github": "https://github.com/VihaanKumar"
  },
  {
    "name": "Aditya Singh",
    "batch": "2017",
    "company": "Facebook",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AdityaSingh",
    "email": "aditya.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/adityasingh",
    "github": "https://github.com/AdityaSingh"
  },
  {
    "name": "Vihaan Nair",
    "batch": "2017",
    "company": "Microsoft",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=VihaanNair",
    "email": "vihaan.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/vihaannair",
    "github": "https://github.com/VihaanNair"
  },
  {
    "name": "Aryan Nair",
    "batch": "2017",
    "company": "Apple",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AryanNair",
    "email": "aryan.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/aryannair",
    "github": "https://github.com/AryanNair"
  },
  {
    "name": "Aarav Gupta",
    "batch": "2016",
    "company": "Tesla",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AaravGupta",
    "email": "aarav.gupta@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravgupta",
    "github": "https://github.com/AaravGupta"
  },
  {
    "name": "Aryan Kumar",
    "batch": "2016",
    "company": "Google",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AryanKumar",
    "email": "aryan.kumar@yahoo.com",
    "linkedin": "https://linkedin.com/in/aryankumar",
    "github": "https://github.com/AryanKumar"
  },
  {
    "name": "Aditya Gupta",
    "batch": "2016",
    "company": "IBM",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AdityaGupta",
    "email": "aditya.gupta@yahoo.com",
    "linkedin": "https://linkedin.com/in/adityagupta",
    "github": "https://github.com/AdityaGupta"
  },
  {
    "name": "Ananya Verma",
    "batch": "2015",
    "company": "Salesforce",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AnanyaVerma",
    "email": "ananya.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/ananyaverma",
    "github": "https://github.com/AnanyaVerma"
  },
  {
    "name": "Ananya Singh",
    "batch": "2015",
    "company": "Google",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AnanyaSingh",
    "email": "ananya.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/ananyasingh",
    "github": "https://github.com/AnanyaSingh"
  },
  {
    "name": "Ananya Reddy",
    "batch": "2015",
    "company": "Tesla",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AnanyaReddy",
    "email": "ananya.reddy@outlook.com",
    "linkedin": "https://linkedin.com/in/ananyareddy",
    "github": "https://github.com/AnanyaReddy"
  },
  {
    "name": "Kiara Sharma",
    "batch": "2014",
    "company": "Adobe",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=KiaraSharma",
    "email": "kiara.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/kiarasharma",
    "github": "https://github.com/KiaraSharma"
  },
  {
    "name": "Vivaan Mehta",
    "batch": "2014",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=VivaanMehta",
    "email": "vivaan.mehta@yahoo.com",
    "linkedin": "https://linkedin.com/in/vivaanmehta",
    "github": "https://github.com/VivaanMehta"
  },
  {
    "name": "Ananya Nair",
    "batch": "2014",
    "company": "Salesforce",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AnanyaNair",
    "email": "ananya.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/ananyanair",
    "github": "https://github.com/AnanyaNair"
  },
  {
    "name": "Vivaan Sharma",
    "batch": "2013",
    "company": "Adobe",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=VivaanSharma",
    "email": "vivaan.sharma@outlook.com",
    "linkedin": "https://linkedin.com/in/vivaansharma",
    "github": "https://github.com/VivaanSharma"
  },
  {
    "name": "Aarav Mehta",
    "batch": "2013",
    "company": "Oracle",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AaravMehta",
    "email": "aarav.mehta@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravmehta",
    "github": "https://github.com/AaravMehta"
  },
  {
    "name": "Aryan Gupta",
    "batch": "2013",
    "company": "Apple",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AryanGupta",
    "email": "aryan.gupta@gmail.com",
    "linkedin": "https://linkedin.com/in/aryangupta",
    "github": "https://github.com/AryanGupta"
  },
  {
    "name": "Aryan Gupta",
    "batch": "2012",
    "company": "Tesla",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AryanGupta",
    "email": "aryan.gupta@gmail.com",
    "linkedin": "https://linkedin.com/in/aryangupta",
    "github": "https://github.com/AryanGupta"
  },
  {
    "name": "Ananya Kumar",
    "batch": "2012",
    "company": "Tesla",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AnanyaKumar",
    "email": "ananya.kumar@gmail.com",
    "linkedin": "https://linkedin.com/in/ananyakumar",
    "github": "https://github.com/AnanyaKumar"
  },
  {
    "name": "Aryan Sharma",
    "batch": "2012",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AryanSharma",
    "email": "aryan.sharma@outlook.com",
    "linkedin": "https://linkedin.com/in/aryansharma",
    "github": "https://github.com/AryanSharma"
  },
  {
    "name": "Aryan Reddy",
    "batch": "2011",
    "company": "Amazon",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AryanReddy",
    "email": "aryan.reddy@outlook.com",
    "linkedin": "https://linkedin.com/in/aryanreddy",
    "github": "https://github.com/AryanReddy"
  },
  {
    "name": "Vivaan Singh",
    "batch": "2011",
    "company": "Salesforce",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=VivaanSingh",
    "email": "vivaan.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/vivaansingh",
    "github": "https://github.com/VivaanSingh"
  },
  {
    "name": "Ananya Singh",
    "batch": "2011",
    "company": "Tesla",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AnanyaSingh",
    "email": "ananya.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/ananyasingh",
    "github": "https://github.com/AnanyaSingh"
  },
  {
    "name": "Aditya Sharma",
    "batch": "2010",
    "company": "Microsoft",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AdityaSharma",
    "email": "aditya.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/adityasharma",
    "github": "https://github.com/AdityaSharma"
  },
  {
    "name": "Kiara Mehta",
    "batch": "2010",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=KiaraMehta",
    "email": "kiara.mehta@gmail.com",
    "linkedin": "https://linkedin.com/in/kiaramehta",
    "github": "https://github.com/KiaraMehta"
  },
  {
    "name": "Rohan Kumar",
    "batch": "2010",
    "company": "Amazon",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=RohanKumar",
    "email": "rohan.kumar@gmail.com",
    "linkedin": "https://linkedin.com/in/rohankumar",
    "github": "https://github.com/RohanKumar"
  },
  {
    "name": "Aarav Singh",
    "batch": "2009",
    "company": "Adobe",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AaravSingh",
    "email": "aarav.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravsingh",
    "github": "https://github.com/AaravSingh"
  },
  {
    "name": "Vihaan Verma",
    "batch": "2009",
    "company": "Google",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=VihaanVerma",
    "email": "vihaan.verma@gmail.com",
    "linkedin": "https://linkedin.com/in/vihaanverma",
    "github": "https://github.com/VihaanVerma"
  },
  {
    "name": "Aryan Gupta",
    "batch": "2009",
    "company": "IBM",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AryanGupta",
    "email": "aryan.gupta@yahoo.com",
    "linkedin": "https://linkedin.com/in/aryangupta",
    "github": "https://github.com/AryanGupta"
  },
  {
    "name": "Vivaan Singh",
    "batch": "2008",
    "company": "Microsoft",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=VivaanSingh",
    "email": "vivaan.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/vivaansingh",
    "github": "https://github.com/VivaanSingh"
  },
  {
    "name": "Diya Bose",
    "batch": "2008",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=DiyaBose",
    "email": "diya.bose@outlook.com",
    "linkedin": "https://linkedin.com/in/diyabose",
    "github": "https://github.com/DiyaBose"
  },
  {
    "name": "Vihaan Verma",
    "batch": "2008",
    "company": "Adobe",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=VihaanVerma",
    "email": "vihaan.verma@yahoo.com",
    "linkedin": "https://linkedin.com/in/vihaanverma",
    "github": "https://github.com/VihaanVerma"
  },
  {
    "name": "Vivaan Mehta",
    "batch": "2007",
    "company": "Microsoft",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=VivaanMehta",
    "email": "vivaan.mehta@gmail.com",
    "linkedin": "https://linkedin.com/in/vivaanmehta",
    "github": "https://github.com/VivaanMehta"
  },
  {
    "name": "Vihaan Verma",
    "batch": "2007",
    "company": "Facebook",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=VihaanVerma",
    "email": "vihaan.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/vihaanverma",
    "github": "https://github.com/VihaanVerma"
  },
  {
    "name": "Meera Bose",
    "batch": "2007",
    "company": "Amazon",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=MeeraBose",
    "email": "meera.bose@yahoo.com",
    "linkedin": "https://linkedin.com/in/meerabose",
    "github": "https://github.com/MeeraBose"
  },
  {
    "name": "Aryan Nair",
    "batch": "2006",
    "company": "Amazon",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AryanNair",
    "email": "aryan.nair@yahoo.com",
    "linkedin": "https://linkedin.com/in/aryannair",
    "github": "https://github.com/AryanNair"
  },
  {
    "name": "Rohan Nair",
    "batch": "2006",
    "company": "Microsoft",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=RohanNair",
    "email": "rohan.nair@gmail.com",
    "linkedin": "https://linkedin.com/in/rohannair",
    "github": "https://github.com/RohanNair"
  },
  {
    "name": "Meera Sharma",
    "batch": "2006",
    "company": "Apple",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=MeeraSharma",
    "email": "meera.sharma@outlook.com",
    "linkedin": "https://linkedin.com/in/meerasharma",
    "github": "https://github.com/MeeraSharma"
  },
  {
    "name": "Kiara Singh",
    "batch": "2005",
    "company": "Salesforce",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=KiaraSingh",
    "email": "kiara.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/kiarasingh",
    "github": "https://github.com/KiaraSingh"
  },
  {
    "name": "Meera Verma",
    "batch": "2005",
    "company": "Apple",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=MeeraVerma",
    "email": "meera.verma@yahoo.com",
    "linkedin": "https://linkedin.com/in/meeraverma",
    "github": "https://github.com/MeeraVerma"
  },
  {
    "name": "Meera Kumar",
    "batch": "2005",
    "company": "Microsoft",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=MeeraKumar",
    "email": "meera.kumar@yahoo.com",
    "linkedin": "https://linkedin.com/in/meerakumar",
    "github": "https://github.com/MeeraKumar"
  },
  {
    "name": "Aarav Nair",
    "batch": "2004",
    "company": "Google",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AaravNair",
    "email": "aarav.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravnair",
    "github": "https://github.com/AaravNair"
  },
  {
    "name": "Vivaan Kumar",
    "batch": "2004",
    "company": "Google",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=VivaanKumar",
    "email": "vivaan.kumar@yahoo.com",
    "linkedin": "https://linkedin.com/in/vivaankumar",
    "github": "https://github.com/VivaanKumar"
  },
  {
    "name": "Diya Singh",
    "batch": "2004",
    "company": "Microsoft",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=DiyaSingh",
    "email": "diya.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/diyasingh",
    "github": "https://github.com/DiyaSingh"
  },
  {
    "name": "Rohan Gupta",
    "batch": "2003",
    "company": "Facebook",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=RohanGupta",
    "email": "rohan.gupta@outlook.com",
    "linkedin": "https://linkedin.com/in/rohangupta",
    "github": "https://github.com/RohanGupta"
  },
  {
    "name": "Aarav Nair",
    "batch": "2003",
    "company": "Microsoft",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AaravNair",
    "email": "aarav.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravnair",
    "github": "https://github.com/AaravNair"
  },
  {
    "name": "Rohan Gupta",
    "batch": "2003",
    "company": "Oracle",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=RohanGupta",
    "email": "rohan.gupta@outlook.com",
    "linkedin": "https://linkedin.com/in/rohangupta",
    "github": "https://github.com/RohanGupta"
  },
  {
    "name": "Diya Verma",
    "batch": "2002",
    "company": "Amazon",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=DiyaVerma",
    "email": "diya.verma@yahoo.com",
    "linkedin": "https://linkedin.com/in/diyaverma",
    "github": "https://github.com/DiyaVerma"
  },
  {
    "name": "Aditya Verma",
    "batch": "2002",
    "company": "Microsoft",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AdityaVerma",
    "email": "aditya.verma@gmail.com",
    "linkedin": "https://linkedin.com/in/adityaverma",
    "github": "https://github.com/AdityaVerma"
  },
  {
    "name": "Meera Nair",
    "batch": "2002",
    "company": "Apple",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=MeeraNair",
    "email": "meera.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/meeranair",
    "github": "https://github.com/MeeraNair"
  },
  {
    "name": "Aarav Mehta",
    "batch": "2001",
    "company": "IBM",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AaravMehta",
    "email": "aarav.mehta@yahoo.com",
    "linkedin": "https://linkedin.com/in/aaravmehta",
    "github": "https://github.com/AaravMehta"
  },
  {
    "name": "Vivaan Das",
    "batch": "2001",
    "company": "Google",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=VivaanDas",
    "email": "vivaan.das@outlook.com",
    "linkedin": "https://linkedin.com/in/vivaandas",
    "github": "https://github.com/VivaanDas"
  },
  {
    "name": "Aditya Sharma",
    "batch": "2001",
    "company": "Apple",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AdityaSharma",
    "email": "aditya.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/adityasharma",
    "github": "https://github.com/AdityaSharma"
  },
  {
    "name": "Ananya Sharma",
    "batch": "2000",
    "company": "Oracle",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AnanyaSharma",
    "email": "ananya.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/ananyasharma",
    "github": "https://github.com/AnanyaSharma"
  },
  {
    "name": "Meera Nair",
    "batch": "2000",
    "company": "Facebook",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=MeeraNair",
    "email": "meera.nair@gmail.com",
    "linkedin": "https://linkedin.com/in/meeranair",
    "github": "https://github.com/MeeraNair"
  },
  {
    "name": "Ananya Sharma",
    "batch": "2000",
    "company": "Oracle",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AnanyaSharma",
    "email": "ananya.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/ananyasharma",
    "github": "https://github.com/AnanyaSharma"
  },
  {
    "name": "Rohan Das",
    "batch": "1999",
    "company": "Facebook",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=RohanDas",
    "email": "rohan.das@outlook.com",
    "linkedin": "https://linkedin.com/in/rohandas",
    "github": "https://github.com/RohanDas"
  },
  {
    "name": "Meera Singh",
    "batch": "1999",
    "company": "Microsoft",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=MeeraSingh",
    "email": "meera.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/meerasingh",
    "github": "https://github.com/MeeraSingh"
  },
  {
    "name": "Aarav Sharma",
    "batch": "1999",
    "company": "Amazon",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AaravSharma",
    "email": "aarav.sharma@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravsharma",
    "github": "https://github.com/AaravSharma"
  },
  {
    "name": "Aditya Bose",
    "batch": "1998",
    "company": "IBM",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AdityaBose",
    "email": "aditya.bose@gmail.com",
    "linkedin": "https://linkedin.com/in/adityabose",
    "github": "https://github.com/AdityaBose"
  },
  {
    "name": "Diya Mehta",
    "batch": "1998",
    "company": "Adobe",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=DiyaMehta",
    "email": "diya.mehta@yahoo.com",
    "linkedin": "https://linkedin.com/in/diyamehta",
    "github": "https://github.com/DiyaMehta"
  },
  {
    "name": "Aryan Reddy",
    "batch": "1998",
    "company": "Salesforce",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AryanReddy",
    "email": "aryan.reddy@yahoo.com",
    "linkedin": "https://linkedin.com/in/aryanreddy",
    "github": "https://github.com/AryanReddy"
  },
  {
    "name": "Aditya Nair",
    "batch": "1997",
    "company": "Facebook",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AdityaNair",
    "email": "aditya.nair@gmail.com",
    "linkedin": "https://linkedin.com/in/adityanair",
    "github": "https://github.com/AdityaNair"
  },
  {
    "name": "Meera Das",
    "batch": "1997",
    "company": "Adobe",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=MeeraDas",
    "email": "meera.das@yahoo.com",
    "linkedin": "https://linkedin.com/in/meeradas",
    "github": "https://github.com/MeeraDas"
  },
  {
    "name": "Meera Verma",
    "batch": "1997",
    "company": "IBM",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=MeeraVerma",
    "email": "meera.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/meeraverma",
    "github": "https://github.com/MeeraVerma"
  },
  {
    "name": "Kiara Kumar",
    "batch": "1996",
    "company": "Salesforce",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=KiaraKumar",
    "email": "kiara.kumar@outlook.com",
    "linkedin": "https://linkedin.com/in/kiarakumar",
    "github": "https://github.com/KiaraKumar"
  },
  {
    "name": "Vivaan Gupta",
    "batch": "1996",
    "company": "Amazon",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=VivaanGupta",
    "email": "vivaan.gupta@yahoo.com",
    "linkedin": "https://linkedin.com/in/vivaangupta",
    "github": "https://github.com/VivaanGupta"
  },
  {
    "name": "Diya Sharma",
    "batch": "1996",
    "company": "Microsoft",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=DiyaSharma",
    "email": "diya.sharma@gmail.com",
    "linkedin": "https://linkedin.com/in/diyasharma",
    "github": "https://github.com/DiyaSharma"
  },
  {
    "name": "Meera Reddy",
    "batch": "1995",
    "company": "Oracle",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=MeeraReddy",
    "email": "meera.reddy@yahoo.com",
    "linkedin": "https://linkedin.com/in/meerareddy",
    "github": "https://github.com/MeeraReddy"
  },
  {
    "name": "Aryan Das",
    "batch": "1995",
    "company": "Facebook",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AryanDas",
    "email": "aryan.das@gmail.com",
    "linkedin": "https://linkedin.com/in/aryandas",
    "github": "https://github.com/AryanDas"
  },
  {
    "name": "Kiara Mehta",
    "batch": "1995",
    "company": "Amazon",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=KiaraMehta",
    "email": "kiara.mehta@gmail.com",
    "linkedin": "https://linkedin.com/in/kiaramehta",
    "github": "https://github.com/KiaraMehta"
  },
  {
    "name": "Kiara Verma",
    "batch": "1994",
    "company": "Oracle",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=KiaraVerma",
    "email": "kiara.verma@gmail.com",
    "linkedin": "https://linkedin.com/in/kiaraverma",
    "github": "https://github.com/KiaraVerma"
  },
  {
    "name": "Kiara Gupta",
    "batch": "1994",
    "company": "Microsoft",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=KiaraGupta",
    "email": "kiara.gupta@yahoo.com",
    "linkedin": "https://linkedin.com/in/kiaragupta",
    "github": "https://github.com/KiaraGupta"
  },
  {
    "name": "Diya Das",
    "batch": "1994",
    "company": "Microsoft",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=DiyaDas",
    "email": "diya.das@gmail.com",
    "linkedin": "https://linkedin.com/in/diyadas",
    "github": "https://github.com/DiyaDas"
  },
  {
    "name": "Meera Das",
    "batch": "1993",
    "company": "Amazon",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=MeeraDas",
    "email": "meera.das@yahoo.com",
    "linkedin": "https://linkedin.com/in/meeradas",
    "github": "https://github.com/MeeraDas"
  },
  {
    "name": "Vivaan Singh",
    "batch": "1993",
    "company": "Facebook",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=VivaanSingh",
    "email": "vivaan.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/vivaansingh",
    "github": "https://github.com/VivaanSingh"
  },
  {
    "name": "Aditya Verma",
    "batch": "1993",
    "company": "Apple",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AdityaVerma",
    "email": "aditya.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/adityaverma",
    "github": "https://github.com/AdityaVerma"
  },
  {
    "name": "Aditya Nair",
    "batch": "1992",
    "company": "Adobe",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AdityaNair",
    "email": "aditya.nair@gmail.com",
    "linkedin": "https://linkedin.com/in/adityanair",
    "github": "https://github.com/AdityaNair"
  },
  {
    "name": "Rohan Sharma",
    "batch": "1992",
    "company": "Tesla",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=RohanSharma",
    "email": "rohan.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/rohansharma",
    "github": "https://github.com/RohanSharma"
  },
  {
    "name": "Aarav Verma",
    "batch": "1992",
    "company": "Oracle",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AaravVerma",
    "email": "aarav.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravverma",
    "github": "https://github.com/AaravVerma"
  },
  {
    "name": "Aditya Singh",
    "batch": "1991",
    "company": "Adobe",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AdityaSingh",
    "email": "aditya.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/adityasingh",
    "github": "https://github.com/AdityaSingh"
  },
  {
    "name": "Vivaan Nair",
    "batch": "1991",
    "company": "Microsoft",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=VivaanNair",
    "email": "vivaan.nair@gmail.com",
    "linkedin": "https://linkedin.com/in/vivaannair",
    "github": "https://github.com/VivaanNair"
  },
  {
    "name": "Aditya Verma",
    "batch": "1991",
    "company": "IBM",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AdityaVerma",
    "email": "aditya.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/adityaverma",
    "github": "https://github.com/AdityaVerma"
  },
  {
    "name": "Aarav Sharma",
    "batch": "1990",
    "company": "Tesla",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AaravSharma",
    "email": "aarav.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/aaravsharma",
    "github": "https://github.com/AaravSharma"
  },
  {
    "name": "Aditya Singh",
    "batch": "1990",
    "company": "Apple",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AdityaSingh",
    "email": "aditya.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/adityasingh",
    "github": "https://github.com/AdityaSingh"
  },
  {
    "name": "Vivaan Das",
    "batch": "1990",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=VivaanDas",
    "email": "vivaan.das@yahoo.com",
    "linkedin": "https://linkedin.com/in/vivaandas",
    "github": "https://github.com/VivaanDas"
  },
  {
    "name": "Aditya Mehta",
    "batch": "1989",
    "company": "IBM",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AdityaMehta",
    "email": "aditya.mehta@yahoo.com",
    "linkedin": "https://linkedin.com/in/adityamehta",
    "github": "https://github.com/AdityaMehta"
  },
  {
    "name": "Aryan Reddy",
    "batch": "1989",
    "company": "Apple",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AryanReddy",
    "email": "aryan.reddy@gmail.com",
    "linkedin": "https://linkedin.com/in/aryanreddy",
    "github": "https://github.com/AryanReddy"
  },
  {
    "name": "Meera Nair",
    "batch": "1989",
    "company": "IBM",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=MeeraNair",
    "email": "meera.nair@gmail.com",
    "linkedin": "https://linkedin.com/in/meeranair",
    "github": "https://github.com/MeeraNair"
  },
  {
    "name": "Rohan Bose",
    "batch": "1988",
    "company": "Salesforce",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=RohanBose",
    "email": "rohan.bose@gmail.com",
    "linkedin": "https://linkedin.com/in/rohanbose",
    "github": "https://github.com/RohanBose"
  },
  {
    "name": "Kiara Sharma",
    "batch": "1988",
    "company": "Tesla",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=KiaraSharma",
    "email": "kiara.sharma@outlook.com",
    "linkedin": "https://linkedin.com/in/kiarasharma",
    "github": "https://github.com/KiaraSharma"
  },
  {
    "name": "Vihaan Reddy",
    "batch": "1988",
    "company": "Amazon",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=VihaanReddy",
    "email": "vihaan.reddy@gmail.com",
    "linkedin": "https://linkedin.com/in/vihaanreddy",
    "github": "https://github.com/VihaanReddy"
  },
  {
    "name": "Aryan Reddy",
    "batch": "1987",
    "company": "Facebook",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AryanReddy",
    "email": "aryan.reddy@gmail.com",
    "linkedin": "https://linkedin.com/in/aryanreddy",
    "github": "https://github.com/AryanReddy"
  },
  {
    "name": "Aarav Singh",
    "batch": "1987",
    "company": "Apple",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AaravSingh",
    "email": "aarav.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravsingh",
    "github": "https://github.com/AaravSingh"
  },
  {
    "name": "Ananya Bose",
    "batch": "1987",
    "company": "Tesla",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AnanyaBose",
    "email": "ananya.bose@yahoo.com",
    "linkedin": "https://linkedin.com/in/ananyabose",
    "github": "https://github.com/AnanyaBose"
  },
  {
    "name": "Aarav Verma",
    "batch": "1986",
    "company": "Microsoft",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AaravVerma",
    "email": "aarav.verma@yahoo.com",
    "linkedin": "https://linkedin.com/in/aaravverma",
    "github": "https://github.com/AaravVerma"
  },
  {
    "name": "Rohan Singh",
    "batch": "1986",
    "company": "Oracle",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=RohanSingh",
    "email": "rohan.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/rohansingh",
    "github": "https://github.com/RohanSingh"
  },
  {
    "name": "Aditya Reddy",
    "batch": "1986",
    "company": "Microsoft",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AdityaReddy",
    "email": "aditya.reddy@gmail.com",
    "linkedin": "https://linkedin.com/in/adityareddy",
    "github": "https://github.com/AdityaReddy"
  },
  {
    "name": "Ananya Reddy",
    "batch": "1985",
    "company": "Amazon",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AnanyaReddy",
    "email": "ananya.reddy@outlook.com",
    "linkedin": "https://linkedin.com/in/ananyareddy",
    "github": "https://github.com/AnanyaReddy"
  },
  {
    "name": "Kiara Singh",
    "batch": "1985",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=KiaraSingh",
    "email": "kiara.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/kiarasingh",
    "github": "https://github.com/KiaraSingh"
  },
  {
    "name": "Rohan Das",
    "batch": "1985",
    "company": "Google",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=RohanDas",
    "email": "rohan.das@gmail.com",
    "linkedin": "https://linkedin.com/in/rohandas",
    "github": "https://github.com/RohanDas"
  },
  {
    "name": "Aryan Das",
    "batch": "1984",
    "company": "Apple",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AryanDas",
    "email": "aryan.das@outlook.com",
    "linkedin": "https://linkedin.com/in/aryandas",
    "github": "https://github.com/AryanDas"
  },
  {
    "name": "Rohan Reddy",
    "batch": "1984",
    "company": "Apple",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=RohanReddy",
    "email": "rohan.reddy@outlook.com",
    "linkedin": "https://linkedin.com/in/rohanreddy",
    "github": "https://github.com/RohanReddy"
  },
  {
    "name": "Rohan Mehta",
    "batch": "1984",
    "company": "Tesla",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=RohanMehta",
    "email": "rohan.mehta@yahoo.com",
    "linkedin": "https://linkedin.com/in/rohanmehta",
    "github": "https://github.com/RohanMehta"
  },
  {
    "name": "Aditya Kumar",
    "batch": "1983",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AdityaKumar",
    "email": "aditya.kumar@yahoo.com",
    "linkedin": "https://linkedin.com/in/adityakumar",
    "github": "https://github.com/AdityaKumar"
  },
  {
    "name": "Ananya Das",
    "batch": "1983",
    "company": "Facebook",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AnanyaDas",
    "email": "ananya.das@yahoo.com",
    "linkedin": "https://linkedin.com/in/ananyadas",
    "github": "https://github.com/AnanyaDas"
  },
  {
    "name": "Aryan Singh",
    "batch": "1983",
    "company": "Apple",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AryanSingh",
    "email": "aryan.singh@yahoo.com",
    "linkedin": "https://linkedin.com/in/aryansingh",
    "github": "https://github.com/AryanSingh"
  },
  {
    "name": "Aryan Kumar",
    "batch": "1982",
    "company": "Google",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=AryanKumar",
    "email": "aryan.kumar@outlook.com",
    "linkedin": "https://linkedin.com/in/aryankumar",
    "github": "https://github.com/AryanKumar"
  },
  {
    "name": "Kiara Kumar",
    "batch": "1982",
    "company": "Adobe",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=KiaraKumar",
    "email": "kiara.kumar@outlook.com",
    "linkedin": "https://linkedin.com/in/kiarakumar",
    "github": "https://github.com/KiaraKumar"
  },
  {
    "name": "Aditya Gupta",
    "batch": "1982",
    "company": "IBM",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AdityaGupta",
    "email": "aditya.gupta@outlook.com",
    "linkedin": "https://linkedin.com/in/adityagupta",
    "github": "https://github.com/AdityaGupta"
  },
  {
    "name": "Aditya Singh",
    "batch": "1981",
    "company": "Adobe",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AdityaSingh",
    "email": "aditya.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/adityasingh",
    "github": "https://github.com/AdityaSingh"
  },
  {
    "name": "Aditya Reddy",
    "batch": "1981",
    "company": "IBM",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AdityaReddy",
    "email": "aditya.reddy@gmail.com",
    "linkedin": "https://linkedin.com/in/adityareddy",
    "github": "https://github.com/AdityaReddy"
  },
  {
    "name": "Diya Singh",
    "batch": "1981",
    "company": "IBM",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=DiyaSingh",
    "email": "diya.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/diyasingh",
    "github": "https://github.com/DiyaSingh"
  },
  {
    "name": "Ananya Sharma",
    "batch": "1980",
    "company": "IBM",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AnanyaSharma",
    "email": "ananya.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/ananyasharma",
    "github": "https://github.com/AnanyaSharma"
  },
  {
    "name": "Diya Mehta",
    "batch": "1980",
    "company": "Google",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=DiyaMehta",
    "email": "diya.mehta@yahoo.com",
    "linkedin": "https://linkedin.com/in/diyamehta",
    "github": "https://github.com/DiyaMehta"
  },
  {
    "name": "Vihaan Bose",
    "batch": "1980",
    "company": "Google",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=VihaanBose",
    "email": "vihaan.bose@yahoo.com",
    "linkedin": "https://linkedin.com/in/vihaanbose",
    "github": "https://github.com/VihaanBose"
  },
  {
    "name": "Aarav Nair",
    "batch": "1979",
    "company": "Salesforce",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AaravNair",
    "email": "aarav.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravnair",
    "github": "https://github.com/AaravNair"
  },
  {
    "name": "Rohan Nair",
    "batch": "1979",
    "company": "Salesforce",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=RohanNair",
    "email": "rohan.nair@gmail.com",
    "linkedin": "https://linkedin.com/in/rohannair",
    "github": "https://github.com/RohanNair"
  },
  {
    "name": "Rohan Gupta",
    "batch": "1979",
    "company": "Apple",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=RohanGupta",
    "email": "rohan.gupta@gmail.com",
    "linkedin": "https://linkedin.com/in/rohangupta",
    "github": "https://github.com/RohanGupta"
  },
  {
    "name": "Kiara Mehta",
    "batch": "1978",
    "company": "Google",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=KiaraMehta",
    "email": "kiara.mehta@gmail.com",
    "linkedin": "https://linkedin.com/in/kiaramehta",
    "github": "https://github.com/KiaraMehta"
  },
  {
    "name": "Rohan Singh",
    "batch": "1978",
    "company": "Facebook",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=RohanSingh",
    "email": "rohan.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/rohansingh",
    "github": "https://github.com/RohanSingh"
  },
  {
    "name": "Aarav Nair",
    "batch": "1978",
    "company": "Apple",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AaravNair",
    "email": "aarav.nair@gmail.com",
    "linkedin": "https://linkedin.com/in/aaravnair",
    "github": "https://github.com/AaravNair"
  },
  {
    "name": "Ananya Nair",
    "batch": "1977",
    "company": "Facebook",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AnanyaNair",
    "email": "ananya.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/ananyanair",
    "github": "https://github.com/AnanyaNair"
  },
  {
    "name": "Aryan Mehta",
    "batch": "1977",
    "company": "Facebook",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AryanMehta",
    "email": "aryan.mehta@yahoo.com",
    "linkedin": "https://linkedin.com/in/aryanmehta",
    "github": "https://github.com/AryanMehta"
  },
  {
    "name": "Rohan Mehta",
    "batch": "1977",
    "company": "IBM",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=RohanMehta",
    "email": "rohan.mehta@gmail.com",
    "linkedin": "https://linkedin.com/in/rohanmehta",
    "github": "https://github.com/RohanMehta"
  },
  {
    "name": "Vivaan Verma",
    "batch": "1976",
    "company": "Microsoft",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=VivaanVerma",
    "email": "vivaan.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/vivaanverma",
    "github": "https://github.com/VivaanVerma"
  },
  {
    "name": "Kiara Singh",
    "batch": "1976",
    "company": "Google",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=KiaraSingh",
    "email": "kiara.singh@gmail.com",
    "linkedin": "https://linkedin.com/in/kiarasingh",
    "github": "https://github.com/KiaraSingh"
  },
  {
    "name": "Aarav Sharma",
    "batch": "1976",
    "company": "Adobe",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AaravSharma",
    "email": "aarav.sharma@yahoo.com",
    "linkedin": "https://linkedin.com/in/aaravsharma",
    "github": "https://github.com/AaravSharma"
  },
  {
    "name": "Vivaan Singh",
    "batch": "1975",
    "company": "Tesla",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=VivaanSingh",
    "email": "vivaan.singh@yahoo.com",
    "linkedin": "https://linkedin.com/in/vivaansingh",
    "github": "https://github.com/VivaanSingh"
  },
  {
    "name": "Meera Nair",
    "batch": "1975",
    "company": "Tesla",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=MeeraNair",
    "email": "meera.nair@yahoo.com",
    "linkedin": "https://linkedin.com/in/meeranair",
    "github": "https://github.com/MeeraNair"
  },
  {
    "name": "Kiara Verma",
    "batch": "1975",
    "company": "Facebook",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=KiaraVerma",
    "email": "kiara.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/kiaraverma",
    "github": "https://github.com/KiaraVerma"
  },
  {
    "name": "Vihaan Bose",
    "batch": "1974",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=VihaanBose",
    "email": "vihaan.bose@yahoo.com",
    "linkedin": "https://linkedin.com/in/vihaanbose",
    "github": "https://github.com/VihaanBose"
  },
  {
    "name": "Aarav Verma",
    "batch": "1974",
    "company": "Tesla",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=AaravVerma",
    "email": "aarav.verma@outlook.com",
    "linkedin": "https://linkedin.com/in/aaravverma",
    "github": "https://github.com/AaravVerma"
  },
  {
    "name": "Kiara Nair",
    "batch": "1974",
    "company": "Amazon",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=KiaraNair",
    "email": "kiara.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/kiaranair",
    "github": "https://github.com/KiaraNair"
  },
  {
    "name": "Diya Reddy",
    "batch": "1973",
    "company": "Tesla",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=DiyaReddy",
    "email": "diya.reddy@outlook.com",
    "linkedin": "https://linkedin.com/in/diyareddy",
    "github": "https://github.com/DiyaReddy"
  },
  {
    "name": "Diya Reddy",
    "batch": "1973",
    "company": "Facebook",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=DiyaReddy",
    "email": "diya.reddy@yahoo.com",
    "linkedin": "https://linkedin.com/in/diyareddy",
    "github": "https://github.com/DiyaReddy"
  },
  {
    "name": "Vivaan Bose",
    "batch": "1973",
    "company": "Apple",
    "position": "Data Scientist",
    "image": "https://i.pravatar.cc/300?u=VivaanBose",
    "email": "vivaan.bose@yahoo.com",
    "linkedin": "https://linkedin.com/in/vivaanbose",
    "github": "https://github.com/VivaanBose"
  },
  {
    "name": "Aditya Mehta",
    "batch": "1972",
    "company": "Amazon",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AdityaMehta",
    "email": "aditya.mehta@outlook.com",
    "linkedin": "https://linkedin.com/in/adityamehta",
    "github": "https://github.com/AdityaMehta"
  },
  {
    "name": "Aditya Sharma",
    "batch": "1972",
    "company": "Apple",
    "position": "Product Manager",
    "image": "https://i.pravatar.cc/300?u=AdityaSharma",
    "email": "aditya.sharma@gmail.com",
    "linkedin": "https://linkedin.com/in/adityasharma",
    "github": "https://github.com/AdityaSharma"
  },
  {
    "name": "Aarav Mehta",
    "batch": "1972",
    "company": "Amazon",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AaravMehta",
    "email": "aarav.mehta@gmail.com",
    "linkedin": "https://linkedin.com/in/aaravmehta",
    "github": "https://github.com/AaravMehta"
  },
  {
    "name": "Kiara Singh",
    "batch": "1971",
    "company": "Oracle",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=KiaraSingh",
    "email": "kiara.singh@outlook.com",
    "linkedin": "https://linkedin.com/in/kiarasingh",
    "github": "https://github.com/KiaraSingh"
  },
  {
    "name": "Vihaan Sharma",
    "batch": "1971",
    "company": "Oracle",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=VihaanSharma",
    "email": "vihaan.sharma@outlook.com",
    "linkedin": "https://linkedin.com/in/vihaansharma",
    "github": "https://github.com/VihaanSharma"
  },
  {
    "name": "Vivaan Bose",
    "batch": "1971",
    "company": "Amazon",
    "position": "Software Engineer",
    "image": "https://i.pravatar.cc/300?u=VivaanBose",
    "email": "vivaan.bose@outlook.com",
    "linkedin": "https://linkedin.com/in/vivaanbose",
    "github": "https://github.com/VivaanBose"
  },
  {
    "name": "Aditya Bose",
    "batch": "1970",
    "company": "Oracle",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=AdityaBose",
    "email": "aditya.bose@gmail.com",
    "linkedin": "https://linkedin.com/in/adityabose",
    "github": "https://github.com/AdityaBose"
  },
  {
    "name": "Ananya Bose",
    "batch": "1970",
    "company": "Salesforce",
    "position": "Project Lead",
    "image": "https://i.pravatar.cc/300?u=AnanyaBose",
    "email": "ananya.bose@outlook.com",
    "linkedin": "https://linkedin.com/in/ananyabose",
    "github": "https://github.com/AnanyaBose"
  },
  {
    "name": "Vivaan Nair",
    "batch": "1970",
    "company": "Amazon",
    "position": "UX Designer",
    "image": "https://i.pravatar.cc/300?u=VivaanNair",
    "email": "vivaan.nair@outlook.com",
    "linkedin": "https://linkedin.com/in/vivaannair",
    "github": "https://github.com/VivaanNair"
  }
    
  
  // Add more alumni entries here
];
