export interface Program {
    id: string;
    name: string;
    category: string;
    duration: string;
    mode: 'Online' | 'Offline' | 'Hybrid';
    fees: string;
    description: string;
    highlights: string[];
    curriculum: {
        title: string;
        topics: string[];
    }[];
    eligibility: string[];
    careerOutcomes: string[];
    image: string;
    featured: boolean;
}

export const healthcarePrograms: Program[] = [
    {
        id: "medical-laboratory-technology",
        name: "Medical Laboratory Technology",
        category: "Laboratory Sciences",
        duration: "12 Months",
        mode: "Hybrid",
        fees: "₹45,000",
        description: "Master the art of clinical laboratory tests which help in the diagnosis, treatment, and prevention of diseases.",
        highlights: ["Hands-on lab training", "Industry-certified curriculum", "Hospital internships"],
        curriculum: [
            { title: "Core Modules", topics: ["Hematology", "Clinical pathology", "Biochemistry", "Cytology", "Bio technology", "Microbiology"] }
        ],
        eligibility: ["12th Pass with Science", "Basic understanding of Biology"],
        careerOutcomes: ["Lab Technician", "Research Assistant", "Quality Control Analyst"],
        image: "https://images.unsplash.com/photo-1579152276532-535c21af3bb5?auto=format&fit=crop&q=80&w=800",
        featured: true
    },
    {
        id: "patient-care-management",
        name: "Patient Care Management",
        category: "Nursing & Care",
        duration: "6 Months",
        mode: "Offline",
        fees: "₹35,000",
        description: "Gain comprehensive skills in managing patient care, from fundamental nursing to emergency response.",
        highlights: ["Clinical exposure", "First Aid certification", "Soft skills training"],
        curriculum: [
            {
                title: "Medical Foundations",
                topics: ["Anatomy physiology", "Nursing fundamentals", "Pharmacology", "Microbiology"]
            },
            {
                title: "Management & IT",
                topics: ["Biomedical waste management", "Health informatics and IT", "Medical terminology and records", "Frist aid and emergency response"]
            }
        ],
        eligibility: ["10th or 12th Pass", "Compassionate mindset"],
        careerOutcomes: ["Patient Care Executive", "Nursing Assistant", "Home Care Coordinator"],
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800",
        featured: true
    },
    {
        id: "health-care-inspectors",
        name: "Health Care Inspectors",
        category: "Public Health",
        duration: "12 Months",
        mode: "Hybrid",
        fees: "₹40,000",
        description: "Become a professional responsible for maintaining public health standards and hygiene in various environments.",
        highlights: ["Public health law expertise", "On-field inspection training", "Government job preparation"],
        curriculum: [
            {
                title: "Health Sciences",
                topics: ["Anatomy and physiology", "Microbiology", "Nutrition and health", "Epidemiology"]
            },
            {
                title: "Public Health & Law",
                topics: ["Bio waste management", "Environmental health", "public health and hygiene", "public health act law", "health education and communication"]
            }
        ],
        eligibility: ["12th Pass", "Social responsibility interest"],
        careerOutcomes: ["Sanitary Inspector", "Health Officer", "Environmental Consultant"],
        image: "https://images.unsplash.com/photo-1576091160550-21735999181c?auto=format&fit=crop&q=80&w=800",
        featured: true
    },
    {
        id: "hospital-administration-management",
        name: "Hospital Administration Management",
        category: "Management",
        duration: "18 Months",
        mode: "Online",
        fees: "₹65,000",
        description: "Learn to manage hospital operations efficiently, focusing on HR, finance, and quality control.",
        highlights: ["Hospital operation simulations", "Financial management tools", "Medical tourism focus"],
        curriculum: [
            {
                title: "Management Core",
                topics: ["Management fundamental", "Human resources management", "Quality control management", "Information technology"]
            },
            {
                title: "Operations & Finance",
                topics: ["Hospital operations", "Principles of management and organizational behavior", "Marketing and medical tourism", "Financial management"]
            }
        ],
        eligibility: ["Graduate in any discipline", "Interest in healthcare management"],
        careerOutcomes: ["Hospital Administrator", "Operations Manager", "Quality Head"],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
        featured: true
    },
    {
        id: "blood-bank-technician",
        name: "Blood Bank Technician Course",
        category: "Laboratory Sciences",
        duration: "6 Months",
        mode: "Offline",
        fees: "₹38,000",
        description: "Specialized training in blood collection, testing, and transfusion medicine management.",
        highlights: ["Transfusion medicine focus", "Automation training", "Safe lab practices"],
        curriculum: [
            {
                title: "Clinical Science",
                topics: ["Hematology", "Microbiology", "Transfusion medicine", "Pathology", "Immunology"]
            },
            {
                title: "Lab Management",
                topics: ["Quality control and management", "Bio waste management", "Good laboratory practice", "Laboratory automation"]
            }
        ],
        eligibility: ["12th Pass with Science", "DMLT graduates preferred"],
        careerOutcomes: ["Blood Bank Technician", "Phlebotomist", "Lab Assistant"],
        image: "https://images.unsplash.com/photo-1536856424748-5c163b1abefb?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: "biomedical-waste-management",
        name: "Diploma in Bio Medical Waste Management",
        category: "Public Health",
        duration: "6 Months",
        mode: "Hybrid",
        fees: "₹25,000",
        description: "In-depth study of waste classification, recycling, and safe disposal methods in healthcare settings.",
        highlights: ["Safety protocols", "Waste recycling focuses", "Auditing practices"],
        curriculum: [
            {
                title: "Waste Management",
                topics: ["Introductions to biomedical waste management", "Waste classification and segregation", "Waste management and disposal", "Infection control and safety practices", "Waste minimization and recycling", "Auditing and monitoring"]
            }
        ],
        eligibility: ["10th or 12th Pass", "Healthcare staff"],
        careerOutcomes: ["Waste Management Officer", "Infection Control Specialist"],
        image: "https://images.unsplash.com/photo-1618477461839-16b01479269d?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: "medical-record-documentation",
        name: "Medical Record and Documentation",
        category: "Health Informatics",
        duration: "9 Months",
        mode: "Online",
        fees: "₹32,000",
        description: "Learn the fundamentals of health information management and digital health records.",
        highlights: ["Digital health focus", "Legal & Ethics training", "Reporting skills"],
        curriculum: [
            {
                title: "Records Management",
                topics: ["Fundamentals of medical records", "Health information management", "Medical terminology", "Anatomy and physiology"]
            },
            {
                title: "Advanced Informatics",
                topics: ["Digital health records", "Legal and ethical aspects", "Hospital administration", "Data and reporting"]
            }
        ],
        eligibility: ["12th Pass", "Basic computer knowledge"],
        careerOutcomes: ["Medical Record Technician", "Health Information Manager"],
        image: "https://images.unsplash.com/photo-1576756762055-66236029806a?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: "phlebotomist-course",
        name: "Phlebotomist Course",
        category: "Laboratory Sciences",
        duration: "3 Months",
        mode: "Offline",
        fees: "₹20,000",
        description: "Training in venipuncture techniques, safety protocols, and basic laboratory practices.",
        highlights: ["Practiced venipuncture", "Infection control", "Safety-first approach"],
        curriculum: [
            {
                title: "Techniques & Safety",
                topics: ["Anatomy and physiology", "Biowaste management", "Good laboratory practice and safety", "Infection control", "equipment supplies and venipuncture techniques", "laboratory basics"]
            }
        ],
        eligibility: ["10th or 12th Pass"],
        careerOutcomes: ["Specimen Collector", "Lab Assistant", "Life Science Technician"],
        image: "https://images.unsplash.com/photo-1579684381272-359f1ebf4da3?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: "human-resource-management",
        name: "Human Resource Management",
        category: "Management",
        duration: "12 Months",
        mode: "Hybrid",
        fees: "₹42,000",
        description: "Excel in HR functions specifically tailored for healthcare systems and organizations.",
        highlights: ["Recruitment strategies", "Organizational behavior", "Business ethics"],
        curriculum: [
            {
                title: "HR Core",
                topics: ["Fundamental of HRM", "Recruitment and selections", "Training and development", "Performance management"]
            },
            {
                title: "HR Skills",
                topics: ["Fundamental of organizational behavior", "HR information techniques", "Business communication and ethics"]
            }
        ],
        eligibility: ["Graduate", "Interest in People Management"],
        careerOutcomes: ["HR Executive", "Healthcare Recruiter", "Training Coordinator"],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: "hospital-executive-management",
        name: "Hospital Executive Management Course",
        category: "Management",
        duration: "6 Months",
        mode: "Hybrid",
        fees: "₹50,000",
        description: "Advanced management training for healthcare professionals aspiring for executive roles.",
        highlights: ["Hospital planning", "Legal & Ethics focus", "Marketing strategy"],
        curriculum: [
            {
                title: "Executive Training",
                topics: ["Fundamentals of organization behavior", "Hospital administration", "Hospital planning and design", "Financial management", "Hospital legal and ethics", "Health care marketing and IT"]
            }
        ],
        eligibility: ["Experience in healthcare", "Managers"],
        careerOutcomes: ["Operations Director", "Chief Operating Officer", "Hospital Director"],
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
        featured: false
    }
];
