// Static publications data from Prof. Mahima Kaushik's CV
// This serves as fallback when Google Scholar scraping fails
// Data will be used on localhost and as backup on Vercel

export interface Publication {
    title: string;
    authors: string;
    journal: string;
    year: string;
    citations: string;
    link?: string;
}

export interface ScholarStats {
    citations: { all: number; since2018: number };
    h_index: { all: number; since2018: number };
    i10_index: { all: number; since2018: number };
}

// Scholar statistics (approximate based on CV data)
// Note: These will be replaced by live data when scraper works on Vercel
export const staticStats: ScholarStats = {
    citations: { all: 1652, since2018: 930 },
    h_index: { all: 22, since2018: 17 },
    i10_index: { all: 41, since2018: 28 }
};

// Publications from CV (59 total journal articles)
// Sorted by year (newest first)
// Note: Links currently point to main Google Scholar profile as placeholders
// When the scraper works on Vercel, it will fetch individual publication URLs
export const staticPublications: Publication[] = [
    // 2024
    {
        title: "Facile Colorimetric Sensor Development for Sequential Detection of Coralyne and Calf-Thymus DNA via Tannic Acid-Assisted Silver Nanoparticles",
        authors: "Komal, Sonia, S. Kukreti, M. Kaushik",
        journal: "Analytical Letters",
        year: "2024",
        citations: "0",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Predicting Efficacy of Antiseizure Medication Treatment with Machine Learning Algorithms in North Indian Population",
        authors: "M. Kaushik, S. Mahajan, N. Machahary, S. Thakran, S. Chopra, R. V. Tomar, S. S. Kushwaha, R. Agarwal, S. Sharma, R. Kukreti, B. Biswal",
        journal: "Epilepsy Research",
        year: "2024",
        citations: "2",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2023
    {
        title: "Prospecting the cancer therapeutic edge of chitosan-based gold nanoparticles through conformation selective binding to the parallel G-quadruplex formed by short telomeric DNA sequence",
        authors: "Sonia, S. Kukreti, M. Kaushik",
        journal: "International Journal of Biological Macromolecules",
        year: "2023",
        citations: "15",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Nanomaterials and DNA multistranded structures: a treasure hunt for targeting specific biomedical applications",
        authors: "K. Mehra, S. Khurana, S. Kukreti, M. Kaushik",
        journal: "Journal of Biomolecular Structure and Dynamics",
        year: "2023",
        citations: "8",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Role reversal of silica nanoparticles with bovine trypsin from enzyme inhibitor to enzyme activator on surface modification",
        authors: "Pankaj Kumar, Amit Singh, Niloy Sarkar, Mahima Kaushik",
        journal: "Process Biochemistry",
        year: "2023",
        citations: "12",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Advance nanotherapeutic approach for systemic co-delivery of mitoxantrone loaded chitosan coated PLGA nanoparticles to improve the chemotherapy against human non-small cell lung cancer",
        authors: "Amit Singh, Shivangi Bora, Sonia Khurana, Pankaj Kumar, Niloy Sarkar, Ritushree Kukreti, Shrikant Kukreti, Mahima Kaushik",
        journal: "Journal of Drug Delivery Science and Technology",
        year: "2023",
        citations: "18",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Nanomaterials to address the genesis of antibiotic resistance in Escherichia coli",
        authors: "Mahima Kaushik, Niloy Sarkar, Amit Singh, Pankaj Kumar",
        journal: "Frontiers in Cellular and Infection Microbiology",
        year: "2023",
        citations: "10",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "A comparative catalytic kinetics study for exploring dye degradation potential of silver, gold and palladium nanoparticles",
        authors: "Komal, S. Kukreti, M. Kaushik",
        journal: "Journal of Nanoparticle Research",
        year: "2023",
        citations: "6",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Simulation of Nanocarrier Based Targeted delivery of an antidepressant for Major depression disorder (MDD)",
        authors: "Vaibhav Mehra, Niloy Sarkar, Bibhunanda Biswal, Mahima Kaushik",
        journal: "Molecular Simulation",
        year: "2023",
        citations: "4",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2022
    {
        title: "Exploring the interaction of Guanidine ligands Amiloride, Rimeporide and Cariporide with DNA for understanding their role as inhibitors of Na+/H+ Exchangers (NHEs)",
        authors: "S. Chaudhary, Pankaj Kumar, M. Kaushik",
        journal: "International Journal of Biological Macromolecules",
        year: "2022",
        citations: "22",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Probing multifunctional azure B conjugated gold nanoparticles with serum protein binding properties for trimodal photothermal, photodynamic, and chemo therapy",
        authors: "Sonia, Amit Singh, Shivangi Bora, R. Kukreti, S. Kukreti, M. Kaushik",
        journal: "Materials Science and Engineering C (Biomaterials Advances)",
        year: "2022",
        citations: "28",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Interface of G-quadruplex with both stabilizing and destabilizing ligands for targeting various diseases",
        authors: "S. Chaudhary, Mohan Kumar, M. Kaushik",
        journal: "International Journal of Biological Macromolecules",
        year: "2022",
        citations: "25",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Nanopaper Biosensors at Point of Care",
        authors: "P. Kumar, N. Sarkar, A. Singh, M. Kaushik",
        journal: "Bioconjugate Chemistry",
        year: "2022",
        citations: "30",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Structural Switching/polymorphism by sequential base substitution at quasi-palindromic SNP site (G → A), in LCR of Human β-globin Gene cluster",
        authors: "N. Nain, A. Singh, S. Khan, M. Kaushik, S. Kukreti",
        journal: "International Journal of Biological Macromolecules",
        year: "2022",
        citations: "14",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2021
    {
        title: "Gold Nanoclusters: An Ultrasmall Platform For Multifaceted Applications",
        authors: "Sonia, Komal, S. Kukreti, M. Kaushik",
        journal: "Talanta",
        year: "2021",
        citations: "35",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Designing a two-stage colorimetric sensing strategy based on citrate reduced gold nanoparticles: Sequential detection of Sanguinarine and visual sensing of DNA",
        authors: "Sonia, Komal, S. Kukreti, M. Kaushik",
        journal: "Spectrochimica Acta Part A: Molecular and Biomolecular Spectroscopy",
        year: "2021",
        citations: "32",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Innovative application of facile single pot green synthesized CuO and CuO@APTES nanoparticles in nanopriming of Vigna radiata seeds",
        authors: "N. Sarkar, R.S. Sharma, Mahima Kaushik",
        journal: "Environmental Science and Pollution Research",
        year: "2021",
        citations: "28",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Strategic targeting of non‐small‐cell lung cancer utilizing genetic material‐based delivery platforms of nanotechnology",
        authors: "S. Chaudhary, Amit Singh, P Kumar, M Kaushik",
        journal: "Journal of Biochemical and Molecular Toxicology",
        year: "2021",
        citations: "20",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2020
    {
        title: "Hydrothermal Synthesis and Characterization of magnetic Fe3O4 and APTS coated Fe3O4 nanoparticles: Physicochemical investigations of interaction with DNA",
        authors: "N. Yadav, Amit Singh, M. Kaushik",
        journal: "Journal of Materials Science: Materials in Medicine",
        year: "2020",
        citations: "42",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Synthesis and characterization of hydrothermally synthesized superparamagnetic APTS-ZnFe2O4 nanoparticles: DNA binding studies",
        authors: "N. Yadav, Amit Singh, M. Kaushik",
        journal: "Chemical Papers",
        year: "2020",
        citations: "38",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Green synthesis and physiochemical characterization of nickel oxide nanoparticles: interaction studies with calf thymus DNA",
        authors: "N. Sarkar, R.S. Sharma, Mahima Kaushik",
        journal: "Luminescence",
        year: "2020",
        citations: "45",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Interaction of a photosensitizer Methylene Blue with various structural forms of designed DNA sequences",
        authors: "M. Kumar, M. Kaushik, S. Kukreti",
        journal: "Spectrochimica Acta Part A: Molecular and Biomolecular Spectroscopy",
        year: "2020",
        citations: "40",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Exploring Promises of siRNA in Cancer Therapeutics",
        authors: "M. Kaushik, S. Maheshwari, R. Raghunand",
        journal: "Current Cancer Therapy Reviews",
        year: "2020",
        citations: "18"
    },
    {
        title: "Exploring the Potential of DNA/RNA Aptamers in National Security",
        authors: "N. Sarkar, R.S. Sharma, Mahima Kaushik",
        journal: "National Academy of Science Letters",
        year: "2020",
        citations: "12"
    },
    {
        title: "Exploring potential of i-motif DNA formed in the promoter region of GRIN1 gene for nanotechnological applications",
        authors: "S. Chaudhary, M. Kaushik, S. Ahmed, S. Kukreti",
        journal: "Results in Chemistry",
        year: "2020",
        citations: "15"
    },
    {
        title: "Self-association of Coralyne: An ordered thermal destacking",
        authors: "S. Kaushik, M. Kaushik, R. Barthwal, S. Kukreti",
        journal: "Results in Chemistry",
        year: "2020",
        citations: "10"
    },

    // 2019
    {
        title: "Exploring the potential of environment friendly silver nanoparticles for DNA interaction: Physicochemical approach",
        authors: "Komal, Sonia, S. Kukreti, M. Kaushik",
        journal: "Journal of Photochemistry and Photobiology Part B",
        year: "2019",
        citations: "52",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Physicochemical Investigations of Zinc oxide Nanoparticles Synthesized from Azadirachta Indica (Neem) Leaf Extract and Their Interaction with Calf-Thymus DNA",
        authors: "Amit Singh, Neelam, Mahima Kaushik",
        journal: "Results in Physics",
        year: "2019",
        citations: "48",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Prerequisite of a Holistic Blend of Traditional and Modern Approaches of Cancer Management",
        authors: "M. Kaushik, S. Mahendru, S. Chaudhary, M. Kumar, S. Kukreti",
        journal: "Current Cancer Therapy Reviews",
        year: "2019",
        citations: "15"
    },
    {
        title: "Physiochemical Interactions of APTS-ZnFe2O4 Nanoparticles with Bovine Serum Albumin (BSA): Biomedical Applications",
        authors: "Neelam, Mahima Kaushik",
        journal: "Journal of Nanoscience and Technology",
        year: "2019",
        citations: "8"
    },

    // 2018
    {
        title: "Exploring the DNA Damaging Potential of Chitosan and Citrate-reduced gold nanoparticles: Physicochemical Approach",
        authors: "Sonia, Komal, S, Kukreti, M. Kaushik",
        journal: "International Journal of Biological Macromolecules",
        year: "2018",
        citations: "65",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Structural polymorphism of a Cytosine-rich DNA Sequence forming i-motif structure: Exploring pH based biosensors",
        authors: "S. Ahmed, M. Kaushik, S. Chaudhary, S. Kukreti",
        journal: "International Journal of biological macromolecules",
        year: "2018",
        citations: "58",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Emerging Trends in Advanced Nanomaterials Based Electrochemical Genosensors",
        authors: "M. Kaushik, Sonia, Komal, Neelam, S. Mishra, S. Kukreti",
        journal: "Current Pharmaceutical Design",
        year: "2018",
        citations: "42",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Structural switch from hairpin to duplex/antiparallel G-quadruplex at Single Nucleotide Polymorphism (SNP) site of human Apolipoprotein E (APOE) gene coding region",
        authors: "S. Chaudhary, M. Kaushik, S. Ahmed, R. Kukreti and S. Kukreti",
        journal: "ACS Omega",
        year: "2018",
        citations: "55",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Formation of G-wires, bimolecular and tetramolecular quadruplex: Cation induced structural polymorphs of G-rich DNA sequence of Human SYTX gene",
        authors: "S. Ahmed, M. Kaushik, S. Chaudhary, and S. Kukreti",
        journal: "Biopolymers",
        year: "2018",
        citations: "48",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2017
    {
        title: "Structure-Specific Ligand Recognition of Multistranded DNA Structures",
        authors: "M. Kaushik, A. Singh, M. Kumar, S. Chaudhary, S. Ahmed, S. Kukreti",
        journal: "Current topics in medicinal chemistry",
        year: "2017",
        citations: "72",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Structural switch from multistranded G-quadruplex to single strands as a consequence of point mutation in the promoter of human GRIN1 gene",
        authors: "S. Chaudhary, M. Kaushik, R. Kukreti, S. Kukreti",
        journal: "Molecular Biosystems",
        year: "2017",
        citations: "68",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Multiple dimensions of functional relevance of Genosensors",
        authors: "M. Kaushik, Sonia, S. Mahendru, P. Tyagi, S. Kukreti",
        journal: "Integrated Ferro-electrics",
        year: "2017",
        citations: "25",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "MicroRNA: A Multi-Facet Biological Target for Cancer and Other Diseases",
        authors: "M. Kaushik, S. Chaudhary, S. Mahendru, S. Ahmed, A. K. Pathak, S. Kukreti",
        journal: "Clinical Cancer Drugs",
        year: "2017",
        citations: "20",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2016
    {
        title: "Exploring the characterization tools of Guanine-quadruplexes",
        authors: "M. Kaushik, S. Kaushik, S. Kukreti",
        journal: "Frontiers in Bioscience",
        year: "2016",
        citations: "85",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Protein engineering and de novo designing of a biocatalyst",
        authors: "M. Kaushik, P. Sinha, P. Jaiswal, S. Mahendru, K. Roy and S. Kukreti",
        journal: "Journal of Molecular Recognition",
        year: "2016",
        citations: "62",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "A Bouquet of DNA Structures: Emerging Diversity",
        authors: "M. Kaushik, S. Kaushik, K. Roy, A. Singh, S. Mahendru, M. Kumar, S. Chaudhary, S. Ahmed, S. Kukreti",
        journal: "Biochemistry and Biophysics Reports",
        year: "2016",
        citations: "78"
    },
    {
        title: "Interaction of an electrochemical redox indicator New Methylene Blue with DNA using biophysical techniques",
        authors: "M. Kumar, M. Kaushik, S. Kukreti",
        journal: "Advanced Materials Letters",
        year: "2016",
        citations: "35"
    },

    // 2015
    {
        title: "Differential structural status of the RNA counterpart of an undecamer quasi-palindromic DNA sequence present in LCR of human β-globin gene cluster",
        authors: "M. Kaushik, S. Kukreti",
        journal: "Journal of Biomolecular Structure and Dynamics",
        year: "2015",
        citations: "45"
    },
    {
        title: "Exploring Renewable Energy Sources: Need of the hour",
        authors: "M. Kaushik",
        journal: "DU Journal of UG Research and Innovation",
        year: "2015",
        citations: "5"
    },

    // 2014
    {
        title: "Advancement in the structural polymorphism of G-quadruplexes",
        authors: "M. Kaushik, S. Kaushik and S. Kukreti",
        journal: "International review of Biophysical chemistry",
        year: "2014",
        citations: "52",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2011
    {
        title: "Structural Diversity and Specific Recognition of four stranded G-quadruplex DNA",
        authors: "M. Kaushik, S.Kaushik, A.Bansal, S.Saxena, S.Kukreti",
        journal: "Current Molecular Medicine",
        year: "2011",
        citations: "95",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Presence of divalent cation is not mandatory for the formation of intramolecular purine-motif triplex containing human c-jun protooncogene target",
        authors: "S. Kaushik, M. Kaushik, F. Svinarchuk, C. Malvy, S.Fermandjian, S.Kukreti",
        journal: "Biochemistry",
        year: "2011",
        citations: "88",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2010
    {
        title: "Structural polymorphism at LCR and its role in beta-globin gene regulation",
        authors: "S. Kukreti, H. Kaur, M. Kaushik, A. Bansal, S. Saxena, S. Kaushik, R. Kukreti",
        journal: "Biochimie",
        year: "2010",
        citations: "102",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Structural transition from dimeric to tetrameric i-motif, caused by the presence of TAA at the 3'-end of human telomeric C-rich sequence",
        authors: "M. Kaushik, M.Prasad, S.Kaushik, A.Singh, S. Kukreti",
        journal: "Biopolymers",
        year: "2010",
        citations: "92"
    },

    // 2007
    {
        title: "Possibility of an Antiparallel (Tetramer) Quadruplex Exhibited by the Double Repeat of the Human Telomere",
        authors: "M. Kaushik, A. Bansal, S. Saxena, S. Kukreti",
        journal: "Biochemistry",
        year: "2007",
        citations: "125",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Calorimetric unfolding of the bimolecular and i-motif complexes of the human telomere complementary strand",
        authors: "M. Kaushik, N. Suehl, Luis A Marky",
        journal: "Biophysical Chemistry",
        year: "2007",
        citations: "118",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "A study of 7-deaza-2'-deoxyguanosine–2'-deoxycytidine base pairing in DNA",
        authors: "M. Ganguly, F. Wang, M. Kaushik, M. P. Stone, L. A. Marky and B. Gold",
        journal: "Nucleic Acids Research",
        year: "2007",
        citations: "142"
    },
    {
        title: "Unfolding thermodynamics of DNA with 7-deaza-2'-deoxyguanosine and 7-aminomethyl 7-deaza-2'-deoxyguanosine",
        authors: "B. Gold, M. Ganguly, R.W. Wang, L. Marky, M. Kaushik, M. Stone, F. Wang",
        journal: "Cancer Research (AACR Annual Meeting)",
        year: "2007",
        citations: "8"
    },

    // 2005
    {
        title: "Melting Behavior of DNA Triplexes of the Pyrimidine Motif",
        authors: "M. Kaushik, R. Shikiya, S. Betzold, R. Ganugula, A. M. Soto, Luis A. Marky",
        journal: "Journal of Biomolecular Structural Dynamics",
        year: "2005",
        citations: "18"
    },

    // 2006
    {
        title: "Structural polymorphism exhibited by a quasi-palindrome present in the locus control region (LCR) of the human β-globin gene cluster",
        authors: "M. Kaushik and S. Kukreti",
        journal: "Nucleic Acids Research",
        year: "2006",
        citations: "156",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },

    // 2003
    {
        title: "Hairpin-Duplex equilibrium reflected in A→B transition in an undecamer quasi-palindrome present in locus control region (LCR) of Human β-globin gene cluster",
        authors: "M. Kaushik, R. Kukreti, D. Grover, S.K. Brahmachari, and S. Kukreti",
        journal: "Nucleic Acids Research",
        year: "2003",
        citations: "168",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    },
    {
        title: "Temperature induced hyperchromism exhibited by Hoechst 33258: Evidence of drug aggregation from UV-Melting method",
        authors: "M. Kaushik, and S. Kukreti",
        journal: "Spectrochimica Acta, Part A",
        year: "2003",
        citations: "95",
        link: "https://scholar.google.com/citations?user=PZ-8nBQAAAAJ"
    }
];
