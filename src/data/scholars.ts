export interface Scholar {
    id: string;
    name: string;
    photo: string;
    currentDesignation: string;
    institution?: string;
    email?: string;
    phone?: string;
    thesisTitle: string;
    supervisors?: string[];
    thesisSubmissionDate?: string;
    vivaDate?: string;
    publications?: number;
    bookChapters?: number;
    awards?: string[];
    status: 'current' | 'past';
    linkedinUrl?: string;
    googleScholarUrl?: string;
}

export const scholars: Scholar[] = [
    // Current Scholars
    {
        id: 'nikita',
        name: 'Nikita',
        photo: '/images/people/Nikita.png',
        currentDesignation: 'Ph.D. Scholar',
        institution: 'Cluster Innovation Centre, University of Delhi',
        email: 'nicksrao03@gmail.com',
        thesisTitle: 'Engineering Quantum Dot-Based Dual-Mode Fluorescence and Electrochemical Biosensing Platforms for Biomedical and Environmental Applications',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        status: 'current',
    },
    {
        id: 'aishwarya-arvind',
        name: 'Aishwarya Arvind',
        photo: '/images/people/Aishwarya.png',
        currentDesignation: 'Ph.D. Scholar',
        institution: 'Cluster Innovation Centre, University of Delhi',
        email: 'aarvind.phd@cic.du.ac.in',
        thesisTitle: 'Development of MOF-Based biosensor for the targeted sensing of biomarkers',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        status: 'current',
    },
    {
        id: 'sakshi-pandey',
        name: 'Sakshi Pandey',
        photo: '/images/people/Sakshi.png',
        currentDesignation: 'Ph.D. Scholar',
        institution: 'Cluster Innovation Centre, University of Delhi',
        email: 'pandey19sakshi@gmail.com',
        thesisTitle: 'To design, functionalize, characterize, and study the properties of nanomaterials for biological applications',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        status: 'current',
    },
    {
        id: 'hanish',
        name: 'Hanish',
        photo: '/images/people/Hanish.png',
        currentDesignation: 'Ph.D. Scholar',
        institution: 'Cluster Innovation Centre, University of Delhi',
        email: 'hanishkanojia636@gmail.com',
        thesisTitle: 'Nanotechnology applications in environmental remediation',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        status: 'current',
    },
    {
        id: 'payal-biswas',
        name: 'Payal Biswas',
        photo: '/images/people/Payal.png',
        currentDesignation: 'Ph.D. Scholar',
        institution: 'Cluster Innovation Centre, University of Delhi',
        email: 'payaal1661@gmail.com',
        thesisTitle: 'Development and Optimization of a Low-Cost Photo Molecular Evaporator Using Nanoparticles for Sustainable Off-Grid Water Purification',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        status: 'current',
    },

    // Past Scholars
    {
        id: 'dr-amit-singh',
        name: 'Dr. Amit Singh',
        photo: '/images/people/Amit.png',
        currentDesignation: 'Assistant Professor (Guest)',
        institution: 'Department of Chemistry, Ramjas College, University of Delhi',
        email: 'asingh3@chemistry.du.ac.in',
        phone: '8447355355',
        thesisTitle: 'Synthesis of nanoformulations for Gene and Drug delivery',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        thesisSubmissionDate: '07/10/2023',
        vivaDate: '27/12/2023',
        publications: 21,
        bookChapters: 1,
        awards: [
            'Qualified CSIR (UGC) NET for Lectureship held in Dec. 2017',
            'Second Prize Winner in Poster presentation at BIOTIKOS 2017 TRENDS IN NANOBIOTECHNOLOGY organized by TERI University NEW DELHI',
            'Participated and Gold Medalist of National Science Olympiads',
            'National science Olympiad gold medalist'
        ],
        status: 'past',
    },
    {
        id: 'dr-neelam',
        name: 'Dr. Neelam',
        photo: '/images/people/Neelam.png',
        currentDesignation: 'Technical Officer-D',
        institution: 'Atomic Minerals Directorate for Exploration and Research, Department of Atomic Energy Government of India',
        email: 'neelamchemdu@gmail.com',
        thesisTitle: 'Iron oxide based multifunctional nanoparticles for biomedical/ environmental applications',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        thesisSubmissionDate: '08.05.2019',
        vivaDate: '25.11.2020',
        publications: 5,
        bookChapters: 0,
        status: 'past',
    },
    {
        id: 'dr-sonia',
        name: 'Dr. Sonia',
        photo: '/images/people/Sonia.png',
        currentDesignation: 'Associate Scientific Editor',
        institution: 'BBA journals portfolio, Elsevier',
        email: 'sonia.khurana35@gmail.com',
        thesisTitle: 'Chitosan and Citrate based Gold Nanoparticles for Biomedical Applications',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        thesisSubmissionDate: 'Sep 27, 2021',
        vivaDate: 'Feb 22, 2022',
        publications: 11,
        bookChapters: 2,
        status: 'past',
    },
    {
        id: 'dr-komal-mehra',
        name: 'Dr. Komal Mehra',
        photo: '/images/people/Komal.png',
        currentDesignation: 'Assistant Professor',
        institution: 'Bhagwan Parshuram Institute of Technology, GGSIPU, Delhi',
        email: 'mehrakomal201993@gmail.com',
        thesisTitle: 'Environmentally benign synthesis and physicochemical characterization of silver nanoparticles: Biomedical & Catalytic applications',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        thesisSubmissionDate: '23.05.2022',
        vivaDate: '17.02.2023',
        publications: 12,
        bookChapters: 0,
        status: 'past',
    },
    {
        id: 'dr-pankaj-kumar',
        name: 'Dr. Pankaj Kumar',
        photo: '/images/people/Pankaj.png',
        currentDesignation: 'Assistant Professor (Guest)',
        institution: 'Department of Chemistry, Gargi College, University of Delhi',
        email: 'pankajkumar2806chem@gmail.com',
        phone: '9718384769',
        thesisTitle: 'Synthesis & Characterization of Silica Nanoparticles for Enzyme Activity Regulation, Drug Delivery and Phototherapeutic Applications',
        supervisors: ['Prof. Shrikant Kukreti (Chemistry)', 'Prof. Mahima Kaushik (CIC)'],
        thesisSubmissionDate: '23/10/2024',
        vivaDate: '08/01/2025',
        publications: 14,
        bookChapters: 1,
        status: 'past',
    },
    {
        id: 'dr-niloy-sarkar',
        name: 'Dr. Niloy Sarkar',
        photo: '/images/people/Niloy.png',
        currentDesignation: 'Assistant Professor (Guest)',
        institution: 'Keshav Mahavidyalaya, University of Delhi',
        email: 'niloy@live.in',
        thesisTitle: 'Development of a nanobiosensor for environmental management of lead (Pb)',
        supervisors: ['Prof. R.S. Sharma (Dept. of EVS)', 'Prof. Mahima Kaushik (CIC)'],
        thesisSubmissionDate: 'Feb., 2023',
        vivaDate: 'July, 2023',
        publications: 16,
        bookChapters: 5,
        status: 'past',
    },
];

export const currentScholars: Scholar[] = scholars.filter(s => s.status === 'current');
export const pastScholars: Scholar[] = scholars.filter(s => s.status === 'past');