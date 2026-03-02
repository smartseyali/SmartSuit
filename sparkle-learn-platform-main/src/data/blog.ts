export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    image: string;
    category: string;
    readTime: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: 'future-of-allied-health-sciences',
        title: 'The Future of Allied Health Sciences in India',
        excerpt: 'Explore the growing demand for paramedics, lab technicians, and healthcare managers in the post-pandemic world.',
        content: `
      <p>The healthcare landscape in India is undergoing a massive transformation. While doctors and nurses are the face of healthcare, the backbone is formed by Allied Health Professionals.</p>
      <h2>What are Allied Health Sciences?</h2>
      <p>Allied Health Sciences (AHS) refers to a distinct group of healthcare professionals who support doctors in diagnostics, technical, therapeutic, and direct patient care. As hospitals become more specialized, the need for trained technicians and managers is skyrocketing.</p>
      <h2>Why Now?</h2>
      <p>Post-2020, there has been a significant shift towards diagnostic-led healthcare. From Medical Lab Technology to Operation Theatre Technology, every department requires certified experts who can handle advanced medical equipment and protocols.</p>
      <h2>Career Growth and Opportunities</h2>
      <p>Graduates in AHS don't just work in hospitals. Opportunities exist in diagnostic labs, research centers, public health organizations, and even corporate healthcare management. With the government's focus on healthcare infrastructure, the next decade belongs to the skilled paramedical force.</p>
      <blockquote>"Skilled healthcare technicians are just as vital as surgeons in saving lives today." - Dr. S. Kumar, Senior Researcher</blockquote>
      <h2>Conclusion</h2>
      <p>At Sparkle, we are committed to providing the clinical and management education required to meet this demand. Our affiliation with Bharathiyar University ensures that your certificate holds the weight needed to kickstart your career at top-tier institutions.</p>
    `,
        author: 'Dr. Aruna Devi',
        date: 'March 15, 2024',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?w=800&auto=format&fit=crop',
        category: 'Industry Trends',
        readTime: '6 min read',
        tags: ['Healthcare', 'Career Advice', 'Allied Health']
    },
    {
        id: 'importance-of-clinical-training',
        title: 'Why Practical Clinical Training is Better Than Theory',
        excerpt: 'Knowledge is power, but application is skill. Learn why Sparkle focuses heavily on hands-on clinical rotations.',
        content: `
      <p>In the medical field, a textbook can only take you so far. The real learning happens when you are in the lab, holding the equipment, and interacting with real scenarios.</p>
      <h2>The Gap Between Education and Industry</h2>
      <p>Many graduates find themselves lost during their first month of work because they lack "muscle memory" for the protocols. Sparkle bridges this gap by making clinical rotations a core part of the curriculum.</p>
      <h2>Benefits of Clinical Exposure</h2>
      <ul>
        <li>Real-world problem solving</li>
        <li>Confidence in handling advanced machinery</li>
        <li>Understanding patient psychology</li>
        <li>Networking with industry professionals early on</li>
      </ul>
      <p>Our students spend over 60% of their program duration in clinical or practical settings, ensuring they are job-ready from day one.</p>
    `,
        author: 'Prof. Rajesh Khanna',
        date: 'April 2, 2024',
        image: 'https://images.unsplash.com/photo-1579152276503-3112bd243a41?w=800&auto=format&fit=crop',
        category: 'Education',
        readTime: '4 min read',
        tags: ['Training', 'Skill Development', 'Clinical']
    },
    {
        id: 'career-in-hospital-management',
        title: 'Modern Careers: Moving Beyond the Stethoscope',
        excerpt: 'How Hospital Administration and Management degrees are becoming the most sought-after non-clinical roles.',
        content: `
      <p>Not everyone wants to be in a lab. The corporate side of healthcare is just as rewarding and financially lucrative. Hospital administration is the art of balancing patient care with business efficiency.</p>
      <h2>Roles in Hospital Management</h2>
      <p>From Facility Management to HR and Logistics, hospitals are complex ecosystems that need professional managers. A degree in Patient Care Management or Hospital Administration opens doors to senior executive roles.</p>
      <p>With multi-specialty chains expanding rapidly in India, the demand for MBA-like skills within the healthcare context has never been higher.</p>
    `,
        author: 'Ms. Sarah Joseph',
        date: 'April 10, 2024',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop',
        category: 'Career Path',
        readTime: '5 min read',
        tags: ['Management', 'HR', 'Hospital Admin']
    }
];
